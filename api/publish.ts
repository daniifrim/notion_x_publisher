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

import { VercelRequest, VercelResponse } from '@vercel/node';
import { NotionService } from '../src/services/notion.service';
import { TwitterService } from '../src/services/twitter.service';
import { DraftProcessorService } from '../src/services/draft-processor.service';
import { ScraperService } from '../src/services/scraper.service';
import { NotificationService } from '../src/services/notification.service';
import { AI_CONFIG } from '../src/config/ai.config';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    // Initialize common services
    const notionService = new NotionService({
      apiKey: process.env.NOTION_API_KEY!,
      databaseId: process.env.NOTION_DATABASE_ID!
    });

    const notificationService = new NotificationService({
      slackWebhookUrl: process.env.SLACK_WEBHOOK_URL
    });

    // Get the task type from query parameters
    const taskType = req.query.task as string || 'tweet-publisher';

    switch (taskType) {
      case 'tweet-publisher':
        const twitterService = new TwitterService({
          apiKey: process.env.TWITTER_API_KEY!,
          apiKeySecret: process.env.TWITTER_API_SECRET!,
          accessToken: process.env.TWITTER_ACCESS_TOKEN!,
          accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET!
        });

        // Get ready tweets
        const readyTweets = await notionService.getReadyTweets();
        console.log(`Found ${readyTweets.length} tweets ready to publish`);

        // Process each tweet
        const results = await Promise.allSettled(
          readyTweets.map(async (tweet) => {
            try {
              // Post to Twitter
              const result = await twitterService.postTweet(tweet.content);
              
              // Update Notion status
              await notionService.updateTweetStatus(tweet.id, 'Published', result.url);
              
              return { status: 'success', tweetId: result.id };
            } catch (error) {
              await notionService.updateTweetStatus(
                tweet.id, 
                'Failed to Post', 
                undefined, 
                error instanceof Error ? error.message : 'Unknown error'
              );
              throw error;
            }
          })
        );

        return res.status(200).json({
          status: 'success',
          details: {
            total: readyTweets.length,
            successful: results.filter(r => r.status === 'fulfilled').length,
            failed: results.filter(r => r.status === 'rejected').length
          }
        });

      case 'draft-processor':
        const draftProcessor = new DraftProcessorService({
          maxTokens: AI_CONFIG.defaultMaxTokens,
          temperature: AI_CONFIG.defaultTemperature,
          model: AI_CONFIG.model
        }, notionService, notificationService);

        const draftResults = await draftProcessor.processAllDrafts();
        return res.status(200).json({
          status: 'success',
          details: draftResults
        });

      case 'content-scraper':
        const scraperService = new ScraperService({
          apifyToken: process.env.APIFY_API_TOKEN!,
          taskId: process.env.APIFY_TASK_ID!
        });

        const config = await notionService.getInputConfig();
        const scrapedData = await scraperService.scrapeTweets(config.interests);
        return res.status(200).json({
          status: 'success',
          details: scrapedData
        });

      default:
        return res.status(400).json({
          status: 'error',
          message: `Unknown task type: ${taskType}`
        });
    }
  } catch (error) {
    console.error('Task execution failed:', error);
    return res.status(500).json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Internal server error'
    });
  }
}