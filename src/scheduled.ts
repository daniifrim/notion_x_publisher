import * as dotenv from 'dotenv';
import { NotionService } from './services/notion.service';
import { TwitterService } from './services/twitter.service';
import { SchedulerService } from './services/scheduler.service';
import { NotionConfig } from './types/notion.types';
import { TwitterConfig } from './types/twitter.types';

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

    const notionService = new NotionService(notionConfig);
    const twitterService = new TwitterService(twitterConfig);
    const schedulerService = new SchedulerService(notionService, twitterService);

    // Process any tweets that are ready and due
    await schedulerService.processScheduledTweets();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Successfully processed scheduled tweets' })
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