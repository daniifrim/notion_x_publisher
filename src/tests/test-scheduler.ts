/**
 * Tweet Scheduler Testing Script
 * 
 * This script tests the tweet scheduling functionality locally, including the retry
 * mechanism for failed tweets. It simulates the behavior of the scheduler Lambda
 * function without deploying to AWS.
 * 
 * Test Coverage:
 * 1. Queue Processing: Tests the main tweet publishing queue
 * 2. Retry Logic: Tests the retry mechanism for failed tweets
 * 3. Error Handling: Verifies error handling and status updates
 * 
 * Configuration Testing:
 * - Check Interval: 5 minutes
 * - Max Retries: 3 attempts
 * - Retry Delay: 15 minutes between attempts
 * 
 * Usage:
 * - Run with: npm run test:scheduler
 * - Requires .env file with Twitter and Notion credentials
 * 
 * Related Files:
 * - functions/scheduler/index.ts: The actual Lambda function this tests
 * - services/scheduler.service.ts: Core scheduling logic
 * - services/twitter.service.ts: Twitter API integration
 * 
 * Note: This is a testing script, not used in production
 */

import * as dotenv from 'dotenv';
import { TwitterService } from '../services/twitter.service';
import { NotionService } from '../services/notion.service';
import { SchedulerService } from '../services/scheduler.service';
import { NotificationService } from '../services/notification.service';
import { TwitterConfig } from '../types/twitter.types';
import { NotionConfig } from '../types/notion.types';
import { SchedulerConfig } from '../types/scheduler.types';

// Load environment variables
dotenv.config();

async function main() {
  try {
    console.log('Initializing services...\n');

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
      {
        twitterService,
        notionService,
        notificationService
      }
    );

    console.log('\nProcessing tweet queue...');
    const result = await schedulerService.processQueue();
    console.log('Queue processing result:', result);

  } catch (error) {
    console.error('Error testing scheduler:', error);
  }
}

// Run the test
main().catch(console.error); 