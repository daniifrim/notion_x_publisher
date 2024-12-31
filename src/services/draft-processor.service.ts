import { NotionService } from './notion.service';
import { AIService } from './ai.service';
import { DraftProcessorConfig, DraftTweet, ProcessingResult } from '../types/draft-processor.types';

export class DraftProcessorService {
  private aiService: AIService;
  private config: DraftProcessorConfig;
  private notionService: NotionService;

  constructor(config: DraftProcessorConfig, notionService: NotionService) {
    this.config = config;
    this.notionService = notionService;
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
0. Original Draft:
[The corrected original tweet text here]

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

Example from draft to variations:

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
      const content = await this.aiService.createPromptCompletion(
        'You are a professional social media writer that creates engaging tweets.',
        this.createPrompt(draftTitle),
        {
          maxTokens: this.config.maxTokens,
          temperature: this.config.temperature
        }
      );
      
      // Split the content into variations and clean them up
      const variations = content
        .split('\n')
        .reduce((acc: string[], line: string) => {
          const trimmedLine = line.trim();
          
          // Skip empty lines, headers, and example format lines
          if (!trimmedLine || 
              /^\d+\./.test(trimmedLine) || // Numbered lines
              trimmedLine.includes(':') || // Style headers
              trimmedLine.includes('[') || // Example format
              trimmedLine.includes(']') || // Example format
              trimmedLine.includes('(and so on...)')) {
            return acc;
          }
          
          // Remove any remaining numbers at the start and clean up
          const cleanedLine = trimmedLine
            .replace(/^\d+\.\s*/, '') // Remove leading numbers
            .replace(/^\s*\d+\s*/, '') // Remove standalone numbers
            .trim();
            
          if (cleanedLine) {
            acc.push(cleanedLine);
          }
          
          return acc;
        }, []);

      return variations;
    } catch (error) {
      console.error('Failed to generate variations:', error);
      throw error;
    }
  }

  async processDraft(draft: DraftTweet): Promise<ProcessingResult> {
    try {
      console.log(`Processing draft: ${draft.title}`);

      // Generate variations
      const variations = await this.generateVariations(draft.title);
      
      if (!variations.length) {
        throw new Error('No variations were generated');
      }

      // Update Notion page with variations
      await this.notionService.updateDraftWithVariations(draft.id, variations);

      return {
        success: true,
        message: 'Successfully generated variations',
        variations
      };
    } catch (error) {
      console.error(`Failed to process draft ${draft.id}:`, error);
      return {
        success: false,
        message: 'Failed to process draft',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async processAllDrafts(): Promise<ProcessingResult[]> {
    try {
      // Get all drafts from Notion
      const drafts = await this.notionService.getDrafts();
      console.log(`Found ${drafts.length} drafts to process`);

      // Process each draft
      const results = await Promise.all(
        drafts.map((draft: DraftTweet) => this.processDraft(draft))
      );

      return results;
    } catch (error) {
      console.error('Failed to process drafts:', error);
      throw error;
    }
  }
} 