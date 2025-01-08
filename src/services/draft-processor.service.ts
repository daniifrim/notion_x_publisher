/**
 * Draft Processor Service
 * 
 * This service is responsible for processing draft tweets and generating variations.
 * It uses the AI service to generate variations and the Notion service to update the draft.
 * 
 * Key Responsibilities:
 * 1. Generate variations for a draft tweet.
 * 2. Update the draft in Notion with the generated variations.
 * 3. Handle errors and update the draft status accordingly.
 * 
 * Configuration:
 * - DraftProcessorConfig: Configuration settings for the draft processor.
 * - DraftTweet: Type for a draft tweet.
 * - ProcessingResult: Type for the result of processing a draft.
 */ 

import { NotionService } from './notion.service';
import { AIService } from './ai.service';
import { NotificationService } from './notification.service';
import { DraftProcessorConfig, DraftTweet, ProcessingResult } from '../types/draft-processor.types';
import { NotionTweet } from '../types/notion.types';
import { NOTION_SCHEMA } from '../constants/notion.constants';


export class DraftProcessorService {
  private aiService: AIService;
  private config: DraftProcessorConfig;
  private notionService: NotionService;
 private notificationService: NotificationService;

  constructor(
    config: DraftProcessorConfig, 
    notionService: NotionService,
    notificationService: NotificationService
  ) {
    this.config = config;
    this.notionService = notionService;
    this.notificationService = notificationService;
    this.aiService = AIService.getInstance();
  }

  private createPrompt(draftTitle: string): string {
    return `You are a professional social media writer tasked with creating engaging tweet variations.
Given this draft tweet idea: "${draftTitle}"

Create 5 different tweet variations, one for each of these specific styles:

1. Straightforward: Clear and direct, focusing on the main message
2. Casual and conversational: Using a friendly, approachable tone
3. Engaging with a question: Starting or ending with a thought-provoking question
4. Humorous or witty: Including wordplay, puns, or light humor
5. Thought-provoking: Inspiring deeper reflection or discussion

For each variation:
- First you must correct the original tweet. Do not change the format drastically but make sure it is grammatically correct and makes sense.
- Must be EXACTLY in tweet format (no explanations, just the tweet text)
- Maximum 280 characters
- Include relevant emojis where they enhance the message. But do not overdue it.
- Maintain the core message while adapting the tone
- Do not include hashtags or other social media specific formatting
- Make it engaging and authentic to each style
- Format with the number and style name, then the tweet text

Example format:

1. Straightforward:
[The actual tweet text here]

2. Casual and conversational:
[The actual tweet text here]

3. Engaging with a question:
[The actual tweet text here]

4. Humorous or witty:
[The actual tweet text here]

5. Thought-provoking:
[The actual tweet text here]

Example format of the variations:

- Original Draft: I think that in the future, only one type of business will remain: those who adopt AI
- Variations:
    1. In a few years, only one type of business will survive: those embracing AI. The rest? History.
    2. Prediction: Companies that don't adapt to AI will be like Blockbuster in the Netflix era. Agree or disagree?
    3. Hot take: The future business landscape will be binary - AI adopters vs the extinct 🦕.
    4. Remember when websites were "optional" for businesses? That's AI today. Adapt or fade away
    5. The business world is splitting into two camps: AI innovators and... well, soon-to-be memories 🤔 Where do you stand?

`;
  }

  private async generateVariations(draftTitle: string): Promise<string[]> {
    try {
      console.log(`\n🎯 Generating variations for draft: "${draftTitle}"`);
      const content = await this.aiService.createPromptCompletion(
        'You are a professional social media writer that creates engaging tweets.',
        this.createPrompt(draftTitle),
        {
          maxTokens: this.config.maxTokens,
          temperature: this.config.temperature
        }
      );
      
      console.log('📝 Raw AI response:', content);
      
      // Split the content into lines and clean them up
      const lines = content.split('\n').map(line => line.trim());
      const variations: string[] = [];
      
      // Process each line
      for (const line of lines) {
        // Skip empty lines and headers
        if (!line || 
            line.startsWith('Example') || 
            line.startsWith('For each') ||
            line.includes('[') ||
            line.includes(']')) {
          continue;
        }
        
        // Remove style labels and numbers
        const cleanedLine = line
          .replace(/^\d+\.\s*(Straightforward|Casual and conversational|Engaging with a question|Humorous or witty|Thought-provoking):\s*/i, '')
          .trim();
          
        if (cleanedLine && !cleanedLine.startsWith('-') && !cleanedLine.startsWith('Original Draft:')) {
          variations.push(cleanedLine);
        }
      }
      
      console.log(`✅ Generated ${variations.length} variations:`);
      variations.forEach((v, i) => console.log(`${i + 1}. ${v}`));
      
      if (variations.length === 0) {
        throw new Error(`No valid variations were generated for draft: ${draftTitle}`);
      }
      
      return variations;
    } catch (error) {
      console.error('Failed to generate variations:', error);
      throw error;
    }
  }

  private async correctGrammar(text: string): Promise<string> {
    try {
      console.log(`\n✍️ Correcting grammar for: "${text}"`);
      const prompt = `You are a professional editor. Correct any grammar, spelling, or vocabulary issues in this text. Keep the same meaning and tone, just fix technical issues:

Original text: "${text}"

Provide ONLY the corrected text with no explanations or additional formatting.`;

      const corrected = await this.aiService.createPromptCompletion(
        'You are a professional editor that corrects grammar and vocabulary.',
        prompt,
        {
          maxTokens: this.config.maxTokens,
          temperature: 0.3 // Lower temperature for more consistent corrections
        }
      );
      
      console.log('✅ Corrected text:', corrected);
      return corrected.trim();
    } catch (error) {
      console.error('Failed to correct grammar:', error);
      throw error;
    }
  }

  /**
   * Process a single draft page to generate variations
   * @param page The Notion page to process
   * @returns The processing results
   */
  async processDraft(page: any): Promise<ProcessingResult> {
    try {
      console.log('\n🔍 Processing page:', {
        id: page.id,
        hasProperties: 'properties' in page,
        propertyKeys: page.properties ? Object.keys(page.properties) : 'No properties'
      });

      if (!page.properties) {
        console.warn('⚠️ Page has no properties, fetching fresh data');
        const freshPage = await this.notionService.getPage(page.id);
        if (!freshPage) {
          return {
            success: false,
            message: 'Failed to fetch page data',
            variations: [],
            error: 'Page not found'
          };
        }
        page = freshPage;
      }

      const titleProperty = page.properties[NOTION_SCHEMA.PROPERTIES.TITLE];
      console.log('📝 Title property:', JSON.stringify(titleProperty, null, 2));

      const originalText = titleProperty?.title?.[0]?.plain_text || '';
      console.log('📌 Original text:', originalText);

      if (!originalText) {
        console.warn('⚠️ No text found in title property');
        return {
          success: false,
          message: 'No draft text found in page title',
          variations: [],
          error: 'Missing draft text'
        };
      }

      // First, correct grammar and update the title
      const correctedText = await this.correctGrammar(originalText);
      await this.notionService.updatePageTitle(page.id, correctedText);
      console.log('✅ Updated page title with corrected text');

      // Then generate variations
      const variations = await this.generateVariations(correctedText);
      await this.notionService.updateTweetVariations(page.id, variations);
      console.log('✅ Added variations to page content');

      // Update status to Processed
      await this.notionService.updateTweetStatus(page.id, NOTION_SCHEMA.STATUS_VALUES.PROCESSED);
      console.log('✅ Updated status to Processed');

      return {
        success: true,
        message: 'Successfully corrected text and generated variations',
        variations
      };
    } catch (error) {
      console.error('Error processing draft:', error);
      return {
        success: false,
        message: 'Failed to process draft',
        variations: [],
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async processAllDrafts(): Promise<ProcessingResult[]> {
    try {
      // Get all non-thread drafts from Notion
      const drafts = await this.notionService.getDraftTweetsNotInThread();
      console.log(`Found ${drafts.length} non-thread drafts to process`);

      // Process each draft
      const results = await Promise.all(
        drafts.map((draft: NotionTweet) => this.processDraft({
          id: draft.id,
          properties: {
            [NOTION_SCHEMA.PROPERTIES.TITLE]: {
              title: [{ plain_text: draft.title || '' }]
            }
          }
        }))
      );

      // Send notification with summary of processed drafts
      const successfulDrafts = results.filter(r => r.success);
      const failedDrafts = results.filter(r => !r.success);

      const message = `🤖 Draft Processing Summary\n\n` +
        `✅ Successfully processed: ${successfulDrafts.length}\n` +
        `❌ Failed: ${failedDrafts.length}\n\n` +
        `Processed Drafts:\n${successfulDrafts.map(d => {
          const firstVariation = d.variations?.[0];
          return firstVariation ? `• ${firstVariation.substring(0, 50)}...` : '• (No variation available)';
        }).join('\n')}`;

      try {
        await this.notificationService.sendNotification(
          message,
          successfulDrafts.length > 0 ? 'success' : 'error'
        );
      } catch (error) {
        console.error('Failed to send notification:', error);
      }

      return results;
    } catch (error) {
      console.error('Failed to process drafts:', error);
      throw error;
    }
  }
} 

