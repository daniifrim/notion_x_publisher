import dotenv from 'dotenv';
import { TwitterService } from './services/twitter.service';
import { NotionService } from './services/notion.service';
import { SchedulerService } from './services/scheduler.service';
import { TwitterConfig } from './types/twitter.types';
import { NotionConfig } from './types/notion.types';
import { SchedulerConfig } from './types/scheduler.types';

// Load environment variables
dotenv.config();

async function main() {
  try {
    // Initialize configurations
    const twitterConfig: TwitterConfig = {
      apiKey: process.env.TWITTER_API_KEY || '',
      apiKeySecret: process.env.TWITTER_API_SECRET || '',
      accessToken: process.env.TWITTER_ACCESS_TOKEN || '',
      accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET || ''
    };

    const notionConfig: NotionConfig = {
      apiKey: process.env.NOTION_API_KEY || '',
      databaseId: process.env.NOTION_DATABASE_ID || ''
    };

    const schedulerConfig: SchedulerConfig = {
      checkInterval: 5,  // Check every 5 minutes
      maxRetries: 3,     // Maximum 3 retries
      retryDelay: 15     // Wait 15 minutes between retries
    };

    // Initialize services
    console.log('Initializing services...');
    const twitterService = new TwitterService(twitterConfig);
    const notionService = new NotionService(notionConfig);
    const schedulerService = new SchedulerService(
      schedulerConfig,
      twitterService,
      notionService
    );

    // Process queue
    console.log('\nProcessing tweet queue...');
    const queueResult = await schedulerService.processQueue();
    console.log('Queue processing result:', JSON.stringify(queueResult, null, 2));

    // Process retries if there were errors
    if (queueResult.errors.length > 0) {
      console.log('\nProcessing retry queue...');
      const retryResult = await schedulerService.retryFailedTweets();
      console.log('Retry processing result:', JSON.stringify(retryResult, null, 2));
    }

  } catch (error) {
    console.error('Error in test script:', error);
  }
}

main().catch(console.error); 