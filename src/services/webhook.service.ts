import { WebhookPayload, WebhookValidationResult, WebhookProcessingResult } from '../types/webhook.types';
import { NotionService } from './notion.service';
import { DraftProcessorService } from './draft-processor.service';
import { AI_CONFIG } from '../config/ai.config';

export class WebhookService {
  constructor(
    private readonly notionService: NotionService,
    private readonly draftProcessor: DraftProcessorService
  ) {}

  /**
   * Validates the webhook payload and secret
   * @param payload The webhook payload
   * @param secret The webhook secret
   * @returns Validation result
   */
  validateWebhook(payload: WebhookPayload, secret: string): WebhookValidationResult {
    try {
      // Validate webhook secret
      if (!process.env.WEBHOOK_SECRET) {
        return {
          isValid: false,
          error: 'Webhook secret not configured'
        };
      }

      if (secret !== process.env.WEBHOOK_SECRET) {
        return {
          isValid: false,
          error: 'Invalid webhook secret'
        };
      }

      // Validate payload structure
      if (!payload.data?.id) {
        return {
          isValid: false,
          error: 'Missing page ID in payload'
        };
      }

      return { isValid: true };
    } catch (error) {
      console.error('Error validating webhook:', error);
      return {
        isValid: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Processes a webhook request
   * @param payload The webhook payload
   * @returns Processing result
   */
  async processWebhook(payload: WebhookPayload): Promise<WebhookProcessingResult> {
    try {
      // Get the page from Notion
      const page = await this.notionService.getPage(payload.data.id);
      if (!page) {
        return {
          success: false,
          message: 'Page not found',
          pageId: payload.data.id,
          error: 'Page not found in Notion'
        };
      }

      // Process the draft
      const result = await this.draftProcessor.processDraft(page);

      return {
        success: result.success,
        message: result.message,
        pageId: payload.data.id,
        error: result.error
      };
    } catch (error) {
      console.error('Error processing webhook:', error);
      return {
        success: false,
        message: 'Failed to process webhook',
        pageId: payload.data.id,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
} 