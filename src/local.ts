/**
 * Local Development Runner
 * 
 * This script is used for local testing and development. It simulates the behavior
 * of the Lambda functions without needing to deploy to AWS.
 * 
 * Features:
 * 1. Environment validation
 * 2. Notion database schema validation
 * 3. Twitter credentials verification
 * 4. Manual tweet processing
 * 
 * Usage:
 * - Run with: npm run test:local
 * - Requires .env file with all necessary credentials
 * 
 * Related Files:
 * - scheduled.ts: The actual Lambda function this simulates
 * - services/*.ts: All service files used in production
 * 
 * Note: This is NOT deployed to AWS - it's only for local development
 */

import * as dotenv from 'dotenv';
import { NotionService } from './services/notion.service';
import { TwitterService } from './services/twitter.service';
import { NotionConfig } from './types/notion.types';
import { TwitterConfig, TweetContent, MediaUpload } from './types/twitter.types';

// Load environment variables
dotenv.config();

async function main() {
  try {
    console.log('🚀 Starting NotionXPublisher locally...');

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

    // Initialize configurations
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

    // Initialize services
    console.log('📦 Initializing services...');
    const notionService = new NotionService(notionConfig);
    const twitterService = new TwitterService(twitterConfig);

    // Validate Notion database schema
    console.log('🔍 Validating Notion database schema...');
    await notionService.validateDatabaseSchema();
    console.log('✅ Notion database schema is valid');

    // Initialize Twitter service
    console.log('🐦 Initializing Twitter service...');
    await twitterService.initialize();
    console.log('✅ Twitter service initialized');

    // Get ready tweets
    console.log('\n📝 Checking for ready tweets...');
    const readyTweets = await notionService.getReadyTweets();
    console.log(`Found ${readyTweets.length} tweets ready to publish`);

    // Process each tweet
    for (const tweet of readyTweets) {
      if (tweet.isThread) {
        console.log(`\n🧵 Processing thread: "${tweet.title}"`);
        
        // Split content into individual tweets and convert images to media
        const threadTweets: TweetContent[] = tweet.content.split('\n')
          .filter(t => t.trim().length > 0)
          .map(content => ({
            content,
            media: tweet.images?.map(url => ({ url, type: 'image' as const }))
          }));
        
        console.log(`Thread contains ${threadTweets.length} tweets:`);
        threadTweets.forEach((t, index) => {
          console.log(`\n[${index + 1}/${threadTweets.length}] ${t.content}`);
          if (t.media?.length) {
            console.log(`🖼️ Media: ${t.media.length}`);
          }
        });

        try {
          const threadResult = await twitterService.postThread(threadTweets);
          console.log('✅ Thread published successfully');
          console.log(`🔗 Thread URL: ${threadResult.threadUrl}`);

          await notionService.updateTweetStatus(tweet.id, 'Published', threadResult.threadUrl);
          console.log('✅ Notion status updated');
        } catch (error) {
          console.error('❌ Failed to publish thread:', error);
          await notionService.updateTweetStatus(
            tweet.id,
            'Failed to Post',
            error instanceof Error ? error.message : 'Unknown error'
          );
          console.log('⚠️ Tweet status updated to Failed to Post');
        }
      } else {
        console.log(`\n🔄 Processing single tweet: "${tweet.content}"`);
        console.log(`Scheduled for: ${tweet.scheduledTime.toLocaleString()}`);
        
        // Convert images to media
        const media = tweet.images?.map(url => ({ url, type: 'image' as const }));
        if (media?.length) {
          console.log(`🖼️ Media: ${media.length}`);
        }

        try {
          const publishedTweet = await twitterService.postTweet(tweet.content, media);
          console.log('✅ Tweet published successfully');
          console.log(`🔗 Tweet URL: ${publishedTweet.url}`);

          await notionService.updateTweetStatus(tweet.id, 'Published', publishedTweet.url);
          console.log('✅ Notion status updated');
        } catch (error) {
          console.error('❌ Failed to publish tweet:', error);
          await notionService.updateTweetStatus(
            tweet.id,
            'Failed to Post',
            error instanceof Error ? error.message : 'Unknown error'
          );
          console.log('⚠️ Tweet status updated to Failed to Post');
        }
      }
    }

    console.log('\n✨ Local execution completed');
  } catch (error) {
    console.error('❌ Error during local execution:', error);
    process.exit(1);
  }
}

// Run the local execution
main(); 