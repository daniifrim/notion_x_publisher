import { config } from 'dotenv';
import { NotionService } from '../services/notion.service';
import { DraftProcessorService } from '../services/draft-processor.service';
import { NotificationService } from '../services/notification.service';
import { AI_CONFIG } from '../config/ai.config';

// Load environment variables
config();

async function testWebhookLocally() {
  try {
    console.log('🔧 Initializing services');
    console.log('🔑 Environment check:', {
      NOTION_API_KEY: process.env.NOTION_API_KEY ? '✓ Present' : '✗ Missing',
      NOTION_DATABASE_ID: process.env.NOTION_DATABASE_ID ? '✓ Present' : '✗ Missing',
      WEBHOOK_SECRET: process.env.WEBHOOK_SECRET ? '✓ Present' : '✗ Missing',
      SLACK_WEBHOOK_URL: process.env.SLACK_WEBHOOK_URL ? '✓ Present' : '✗ Missing'
    });

    const notionService = new NotionService({
      apiKey: process.env.NOTION_API_KEY!,
      databaseId: process.env.NOTION_DATABASE_ID!
    });

    const notificationService = new NotificationService({
      slackWebhookUrl: process.env.SLACK_WEBHOOK_URL
    });

    const draftProcessor = new DraftProcessorService({
      maxTokens: AI_CONFIG.defaultMaxTokens,
      temperature: AI_CONFIG.defaultTemperature,
      model: AI_CONFIG.model
    }, notionService, notificationService);

    console.log('🔍 Fetching drafts from Notion');
    const drafts = await notionService.getDrafts();
    console.log(`📝 Found ${drafts.length} drafts:`, drafts);

    console.log('⚡ Processing draft variations');
    const results = await draftProcessor.processAllDrafts();
    
    console.log('✅ Draft processing completed:', JSON.stringify(results, null, 2));
  } catch (error) {
    console.error('❌ Error in local test:', {
      error: error instanceof Error ? {
        message: error.message,
        stack: error.stack,
        name: error.name
      } : error
    });
  }
}

// Run the test
testWebhookLocally(); 