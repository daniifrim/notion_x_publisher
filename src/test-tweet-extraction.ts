/**
 * Tweet Extraction Testing Script
 * 
 * This script tests the tweet extraction logic from Notion without publishing to Twitter.
 * It helps verify that blocks are correctly processed and paragraphs within blocks
 * are kept together as single tweets.
 */

import * as dotenv from 'dotenv';
import { NotionService } from './services/notion.service';
import { NotionConfig } from './types/notion.types';

// Load environment variables
dotenv.config();

async function main() {
  try {
    // Initialize Notion service
    const notionConfig: NotionConfig = {
      apiKey: process.env.NOTION_API_KEY || '',
      databaseId: process.env.NOTION_DATABASE_ID || ''
    };
    const notionService = new NotionService(notionConfig);

    console.log('🔍 Testing tweet extraction...\n');

    // Get ready tweets
    const readyTweets = await notionService.getReadyTweets();
    console.log(`Found ${readyTweets.length} ready tweets\n`);

    // Display each tweet's content
    for (const tweet of readyTweets) {
      console.log('📑 Tweet Details:');
      console.log('Title:', tweet.title);
      console.log('Is Thread:', tweet.isThread);
      console.log('Scheduled Time:', tweet.scheduledTime);
      console.log('\nContent:');
      console.log('-------------------');
      console.log(tweet.content);
      console.log('-------------------');
      console.log('Character count:', tweet.content.length);
      if (tweet.content.length > 280) {
        console.log('⚠️ WARNING: Tweet exceeds 280 characters!');
      }
      console.log('\n');

      // If it's a thread, show thread analysis
      if (tweet.isThread) {
        const threadTweets = tweet.content.split('\n\n---\n\n');
        console.log('🧵 Thread Analysis:');
        console.log(`Number of tweets in thread: ${threadTweets.length}`);
        threadTweets.forEach((threadTweet, index) => {
          console.log(`\nTweet ${index + 1}/${threadTweets.length}:`);
          console.log('-------------------');
          console.log(threadTweet);
          console.log('-------------------');
          console.log('Character count:', threadTweet.length);
          if (threadTweet.length > 280) {
            console.log('⚠️ WARNING: Thread tweet exceeds 280 characters!');
          }
        });
      }
    }

  } catch (error) {
    console.error('Error testing tweet extraction:', error);
  }
}

// Run the test
main().catch(console.error); 