import * as dotenv from 'dotenv';
import { NotionService } from './services/notion.service';
import { TwitterService } from './services/twitter.service';
import { SchedulerService } from './services/scheduler.service';
import { NotionConfig } from './types/notion.types';
import { TwitterConfig } from './types/twitter.types';
import { SchedulerConfig } from './types/scheduler.types';

// Load environment variables
dotenv.config();

export const handler = async (event: any): Promise<any> => {
  try {
    console.log('🕒 Starting scheduled tweet processing...');

    const notionConfig: NotionConfig = {
      databaseId: process.env.NOTION_DATABASE_ID!,
      apiKey: process.env.NOTION_API_KEY!
    };

    const twitterConfig: TwitterConfig = {
      apiKey: process.env.TWITTER_API_KEY!,
      apiKeySecret: process.env.TWITTER_API_SECRET!,
      accessToken: process.env.TWITTER_ACCESS_TOKEN!,
      accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET!
    };

    const schedulerConfig: SchedulerConfig = {
      checkInterval: 5,  // Check every 5 minutes
      maxRetries: 3,     // Maximum 3 retries
      retryDelay: 15     // Wait 15 minutes between retries
    };

    const notionService = new NotionService(notionConfig);
    const twitterService = new TwitterService(twitterConfig);
    const schedulerService = new SchedulerService(
      schedulerConfig,
      twitterService,
      notionService
    );

    // Process any tweets that are ready and due
    const result = await schedulerService.processQueue();
    console.log('Queue processing result:', result);

    // Process retries if there were errors
    if (result.errors.length > 0) {
      console.log('Processing retry queue...');
      const retryResult = await schedulerService.retryFailedTweets();
      console.log('Retry processing result:', retryResult);

      return {
        statusCode: 200,
        body: JSON.stringify({
          message: 'Completed processing with retries',
          queueResult: result,
          retryResult
        })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Successfully processed scheduled tweets',
        result
      })
    };
  } catch (error) {
    console.error('❌ Scheduler execution failed:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Failed to process scheduled tweets',
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    };
  }
}; 