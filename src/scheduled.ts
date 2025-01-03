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
import { NotionConfig } from './types/notion.types';
import { TwitterConfig } from './types/twitter.types';

// Load environment variables
dotenv.config();

export const handler = async (event: any): Promise<any> => {
  try {
    console.log('🕒 Starting scheduled Lambda execution...');
    console.log('⏰ Current time:', new Date().toISOString());

    // Validate environment variables
    const requiredEnvVars = [
      'NOTION_API_KEY',
      'NOTION_DATABASE_ID',
      'TWITTER_API_KEY',
      'TWITTER_API_SECRET',
      'TWITTER_ACCESS_TOKEN',
      'TWITTER_ACCESS_TOKEN_SECRET'
    ];

    const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);
    if (missingEnvVars.length > 0) {
      throw new Error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
    }

    // Initialize services
    console.log('📦 Initializing services...');
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

    // Initialize Twitter service
    console.log('🐦 Initializing Twitter service...');
    await twitterService.initialize();
    console.log('✅ Twitter service initialized');

    // Get ready tweets
    console.log('\n📝 Checking for ready tweets...');
    const readyTweets = await notionService.getReadyTweets();
    console.log(`Found ${readyTweets.length} tweets ready to publish`);

    // Process each tweet
    const results = [];
    for (const tweet of readyTweets) {
      try {
        if (tweet.isThread) {
          console.log(`\n🧵 Processing thread: "${tweet.title}"`);
          
          // Split content into individual tweets
          const tweets = tweet.content.split('\n').filter(t => t.trim().length > 0);
          
          console.log(`Thread contains ${tweets.length} tweets:`);
          tweets.forEach((content, index) => {
            console.log(`\n[${index + 1}/${tweets.length}] ${content}`);
          });

          const threadResult = await twitterService.postThread(tweets);
          console.log('✅ Thread published successfully');
          console.log(`🔗 Thread URL: ${threadResult.threadUrl}`);

          await notionService.updateTweetStatus(tweet.id, 'Published', threadResult.threadUrl);
          console.log('✅ Notion status updated');
          
          results.push({
            id: tweet.id,
            success: true,
            url: threadResult.threadUrl
          });
        } else {
          console.log(`\n🔄 Processing single tweet: "${tweet.content}"`);
          console.log(`Scheduled for: ${tweet.scheduledTime.toLocaleString()}`);

          const publishedTweet = await twitterService.postTweet(tweet.content);
          console.log('✅ Tweet published successfully');
          console.log(`🔗 Tweet URL: ${publishedTweet.url}`);

          await notionService.updateTweetStatus(tweet.id, 'Published', publishedTweet.url);
          console.log('✅ Notion status updated');
          
          results.push({
            id: tweet.id,
            success: true,
            url: publishedTweet.url
          });
        }
      } catch (error) {
        console.error(`❌ Failed to process tweet ${tweet.id}:`, error);
        await notionService.updateTweetStatus(
          tweet.id,
          'Failed to Post',
          undefined,
          error instanceof Error ? error.message : 'Unknown error'
        );
        results.push({
          id: tweet.id,
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Successfully processed scheduled tweets',
        processed: readyTweets.length,
        results
      })
    };
  } catch (error) {
    console.error('❌ Lambda execution failed:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Failed to process scheduled tweets',
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    };
  }
}; 