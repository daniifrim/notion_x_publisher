/**
 * AWS Lambda Handler: Main Tweet Publisher
 * 
 * This is the main Lambda function that runs every 5 minutes via EventBridge trigger.
 * It handles the core functionality of checking Notion for ready tweets and publishing them to Twitter.
 * 
 * Process Flow:
 * 1. Checks Notion database for tweets with "Ready to Publish" status
 * 2. For each ready tweet:
 *    - Validates the content
 *    - Posts to Twitter
 *    - Updates status in Notion to "Published" or "Failed to Post"
 * 
 * Related Files:
 * - services/notion.service.ts: Handles all Notion database operations
 * - services/twitter.service.ts: Manages Twitter API interactions
 * - types/notion.types.ts: Type definitions for Notion data
 * 
 * Trigger: EventBridge rule "notion-x-publisher-schedule" (every 5 minutes)
 */

import * as dotenv from 'dotenv';
import { NotionService } from './services/notion.service';
import { TwitterService } from './services/twitter.service';
import { DraftProcessorService } from './services/draft-processor.service';
import { ScraperService } from './services/scraper.service';
import { AI_CONFIG } from './config/ai.config';
import { NotionConfig } from './types/notion.types';
import { TwitterConfig, TweetContent } from './types/twitter.types';

// Load environment variables
dotenv.config();

export const handler = async (event: any): Promise<any> => {
  try {
    console.log('🕒 Starting scheduled Lambda execution...');
    console.log('📦 Event:', JSON.stringify(event, null, 2));

    // Skip if this is a webhook request (should be handled by webhook.handler)
    if (event.routeKey === 'POST /webhook') {
      console.log('⚠️ Webhook request received in scheduler handler, skipping...');
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'Webhook requests should be handled by the webhook handler'
        })
      };
    }

    // Get the schedule name from the event
    const scheduleName = event?.resources?.[0]?.split('/')?.[1] || 'unknown';
    console.log('📅 Schedule:', scheduleName);

    // Initialize services based on the task
    const notionService = new NotionService({
      databaseId: process.env.NOTION_DATABASE_ID!,
      apiKey: process.env.NOTION_API_KEY!
    });

    switch (scheduleName) {
      case 'tweet-publisher':
        console.log('🐦 Running tweet publisher...');
        const twitterService = new TwitterService({
          apiKey: process.env.TWITTER_API_KEY!,
          apiKeySecret: process.env.TWITTER_API_SECRET!,
          accessToken: process.env.TWITTER_ACCESS_TOKEN!,
          accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET!
        });

        // Get ready tweets
        const readyTweets = await notionService.getReadyTweets();
        console.log(`Found ${readyTweets.length} tweets ready to publish`);

        // Process tweets...
        break;

      case 'draft-processor':
        console.log('📝 Running draft processor...');
        const draftProcessor = new DraftProcessorService({
          maxTokens: AI_CONFIG.defaultMaxTokens,
          temperature: AI_CONFIG.defaultTemperature,
          model: AI_CONFIG.model
        }, notionService);

        const results = await draftProcessor.processAllDrafts();
        console.log('✅ Draft processing completed:', results);
        break;

      case 'content-scraper':
        console.log('🔍 Running content scraper...');
        const scraperService = new ScraperService({
          apifyToken: process.env.APIFY_API_TOKEN!,
          taskId: process.env.APIFY_TASK_ID!
        });

        const config = await notionService.getInputConfig();
        const scrapedData = await scraperService.scrapeTweets(config.interests);
        console.log('✅ Content scraping completed:', scrapedData);
        break;

      default:
        console.log(`⚠️ Unknown schedule: ${scheduleName}`);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Successfully processed scheduled task',
        schedule: scheduleName
      })
    };
  } catch (error) {
    console.error('❌ Lambda execution failed:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Failed to process scheduled task',
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    };
  }
}; 