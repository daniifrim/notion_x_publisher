/**
 * AWS Lambda Handler: Tweet Scheduler
 * 
 * This Lambda function manages the scheduling and retry logic for tweet publishing.
 * It processes both the regular queue and handles retries for failed tweets.
 * 
 * Process Flow:
 * 1. Processes regular queue of scheduled tweets
 * 2. If any tweets fail, adds them to retry queue
 * 3. Processes retry queue with exponential backoff
 * 4. Updates Notion with results
 * 
 * Features:
 * - Configurable check interval (default: 5 minutes)
 * - Maximum retry attempts (default: 3)
 * - Retry delay with exponential backoff
 * 
 * Related Files:
 * - services/scheduler.service.ts: Core scheduling logic
 * - services/twitter.service.ts: Twitter API interactions
 * - services/notion.service.ts: Notion updates
 * 
 * Trigger: Separate EventBridge rule (recommended: every 5 minutes)
 */

import { TwitterService } from '../../services/twitter.service';
import { NotionService } from '../../services/notion.service';
import { SchedulerService } from '../../services/scheduler.service';
import { NotificationService } from '../../services/notification.service';
import { TwitterConfig } from '../../types/twitter.types';
import { NotionConfig } from '../../types/notion.types';
import { SchedulerConfig } from '../../types/scheduler.types';

export const handler = async (event: any): Promise<any> => {
  try {
    // Initialize services
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
      maxRetries: 3,
      retryDelay: 5 * 60 * 1000 // 5 minutes
    };

    const notificationConfig = {
      slackWebhookUrl: process.env.SLACK_WEBHOOK_URL
    };

    const twitterService = new TwitterService(twitterConfig);
    const notionService = new NotionService(notionConfig);
    const notificationService = new NotificationService(notificationConfig);

    const schedulerService = new SchedulerService(
      schedulerConfig,
      twitterService,
      notionService,
      notificationService
    );

    // Process tweet queue
    const result = await schedulerService.processQueue();

    return {
      statusCode: 200,
      body: JSON.stringify(result)
    };
  } catch (error) {
    console.error('Error in scheduler:', error);
    throw error;
  }
}; 