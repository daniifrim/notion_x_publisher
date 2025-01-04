import { NotionService } from './notion.service';
import { DraftProcessorService } from './draft-processor.service';
import { WebhookPayload, WebhookValidationResult, WebhookProcessingResult } from '../types/webhook.types';
import { AI_CONFIG } from '../config/ai.config';

export class WebhookService {
  private notionService: NotionService;
  private draftProcessor: DraftProcessorService;
  private webhookSecret: string;

  constructor(notionService: NotionService, webhookSecret: string) {
    this.notionService = notionService;
    this.webhookSecret = webhookSecret;
    
    // Initialize draft processor with default AI config
    this.draftProcessor = new DraftProcessorService({
      model: AI_CONFIG.model,
      maxTokens: AI_CONFIG.defaultMaxTokens,
      temperature: AI_CONFIG.defaultTemperature
    }, notionService);
  }

  validateWebhookSecret(secret?: string): WebhookValidationResult {
    if (!secret) {
      return {
        isValid: false,
        error: 'Missing webhook secret'
      };
    }

    if (secret !== this.webhookSecret) {
      return {
        isValid: false,
        error: 'Invalid webhook secret'
      };
    }

    return { isValid: true };
  }

  validatePayload(payload: unknown): WebhookValidationResult {
    if (!payload || typeof payload !== 'object') {
      return {
        isValid: false,
        error: 'Invalid payload format'
      };
    }

    const webhookPayload = payload as WebhookPayload;

    if (webhookPayload.event_type !== 'databaseButtonClick') {
      return {
        isValid: false,
        error: 'Unsupported event type'
      };
    }

    if (!webhookPayload.data?.pageId) {
      return {
        isValid: false,
        error: 'Missing page ID'
      };
    }

    return { isValid: true };
  }

  async processWebhook(payload: WebhookPayload): Promise<WebhookProcessingResult> {
    try {
      const { pageId } = payload.data;
      
      // Get the page from Notion
      const page = await this.notionService.getDraftById(pageId);
      
      if (!page) {
        throw new Error('Page not found');
      }
      
      // Only process if the page is in Draft status
      if (page.status !== 'Draft') {
        return {
          success: false,
          message: `Cannot process page with status: ${page.status}`,
          pageId
        };
      }

      console.log(`\n🔄 Processing draft with title: "${page.title}"`);

      // Process the draft using the DraftProcessorService
      const result = await this.draftProcessor.processDraft({
        id: pageId,
        title: page.title,
        status: 'Draft'
      });

      if (!result.success) {
        throw new Error(result.error || 'Failed to process draft');
      }

      return {
        success: true,
        message: 'Successfully processed webhook and generated variations',
        pageId
      };
    } catch (error) {
      console.error('Failed to process webhook:', error);
      
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      // Update status to Failed
      if (payload.data.pageId) {
        await this.notionService.updateTweetStatus(
          payload.data.pageId,
          'Failed to Post',
          undefined,
          errorMessage
        );
      }

      return {
        success: false,
        message: 'Failed to process webhook',
        error: errorMessage,
        pageId: payload.data.pageId
      };
    }
  }
} 