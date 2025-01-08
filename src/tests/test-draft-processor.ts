/**
 * Draft Processor Test Script
 * 
 * This script tests the workflow of:
 * 1. Finding draft tweets that aren't threads
 * 2. Processing them with variations
 * 3. Updating their status to "Processed"
 * 
 * Usage:
 * - Run with: npm run test:draft-processor
 * - Requires .env file with NOTION_API_KEY and NOTION_DATABASE_ID
 */

import { config } from 'dotenv';
import { NotionService } from '../services/notion.service';
import { DraftProcessorService } from '../services/draft-processor.service';
import { NotificationService } from '../services/notification.service';
import { DraftProcessorConfig } from '../types/draft-processor.types';
import { AI_CONFIG } from '../config/ai.config';

// Load environment variables
config();

async function main() {
  try {
    console.log('🚀 Starting draft processor test...');

    // Initialize services
    const notionService = new NotionService({
      apiKey: process.env.NOTION_API_KEY || '',
      databaseId: process.env.NOTION_DATABASE_ID || ''
    });

    const notificationService = new NotificationService({
      slackWebhookUrl: process.env.SLACK_WEBHOOK_URL
    });

    const draftProcessorConfig: DraftProcessorConfig = {
      model: AI_CONFIG.model,
      maxTokens: AI_CONFIG.defaultMaxTokens,
      temperature: AI_CONFIG.defaultTemperature
    };

    const draftProcessor = new DraftProcessorService(
      draftProcessorConfig, 
      notionService,
      notificationService
    );

    // Get draft tweets that aren't threads
    console.log('\n📋 Fetching draft tweets not in thread...');
    const drafts = await notionService.getDraftTweetsNotInThread();
    console.log(`Found ${drafts.length} draft tweets to process`);

    // Process each draft
    for (const draft of drafts) {
      console.log(`\n📝 Processing draft: "${draft.title}"`);
      const result = await draftProcessor.processDraft({
        id: draft.id,
        title: draft.content,
        status: 'Draft'
      });
      
      if (result.success) {
        console.log('✅ Successfully processed draft');
        if (result.variations) {
          console.log('Generated variations:');
          result.variations.forEach((v, i) => console.log(`${i + 1}. ${v}`));
        }
      } else {
        console.error('❌ Failed to process draft:', result.error);
      }
    }

    console.log('\n✨ Test completed successfully');
  } catch (error) {
    console.error('❌ Error in test script:', error);
    process.exit(1);
  }
}

// Run the test
main(); 