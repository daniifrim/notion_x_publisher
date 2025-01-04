/**
 * Tweet Scraper Testing Script
 * 
 * This script is used to test the tweet scraping and analysis functionality locally.
 * It helps verify that Apify scraping and OpenAI analysis are working correctly.
 * 
 * Features:
 * 1. Tests Apify tweet scraping
 * 2. Tests OpenAI tweet analysis
 * 3. Tests Notion integration for storing results
 * 
 * Usage:
 * - Run with: npm run test:scraper
 * - Requires .env file with APIFY_API_TOKEN, OPENAI_API_KEY, and NOTION credentials
 * 
 * Related Files:
 * - functions/scraper/index.ts: The actual Lambda function this tests
 * - services/scraper.service.ts: Tweet scraping logic
 * - services/ai.service.ts: OpenAI analysis logic
 * 
 * Note: This is a testing script, not used in production
 */

import { config } from 'dotenv';
import { ScraperService } from '../services/scraper.service';
import { NotionService } from '../services/notion.service';
import { AIService } from '../services/ai.service';

// Load environment variables
config();

async function main() {
  try {
    console.log('🚀 Starting scraper test...');

    // Debug environment variables
    console.log('\n🔑 Checking environment variables...');
    console.log('APIFY_API_TOKEN:', process.env.APIFY_API_TOKEN ? '✅ Present' : '❌ Missing');
    console.log('APIFY_TASK_ID:', process.env.APIFY_TASK_ID ? '✅ Present' : '❌ Missing');

    // Initialize services
    const scraperService = new ScraperService({
      apifyToken: process.env.APIFY_API_TOKEN || '',
      taskId: process.env.APIFY_TASK_ID || ''
    });

    const notionService = new NotionService({
      apiKey: process.env.NOTION_API_KEY || '',
      databaseId: process.env.NOTION_DATABASE_ID || ''
    });

    const aiService = AIService.getInstance();

    // Get configuration from Notion
    console.log('\n📋 Getting configuration from Notion...');
    const inputConfig = await notionService.getInputConfig();
    console.log('✅ Configuration loaded:', JSON.stringify(inputConfig, null, 2));

    // Test input generation with sample data
    const searchTerms = inputConfig.interests;
    console.log(`\n📋 Search terms to process: ${searchTerms.length}`);
    console.log(searchTerms);

    // Run the scraper (only with search terms)
    console.log('\n🔄 Running scraper...');
    const result = await scraperService.scrapeTweets(searchTerms);
    
    console.log('\n📊 Scraping Results:');
    console.log(`Total tweets: ${result.totalTweets}`);
    console.log(`Timestamp: ${result.timestamp}`);
    
    // Process some tweets with AI
    if (result.tweets.length > 0) {
      console.log('\n🤖 Testing AI analysis on first tweet...');
      const sampleTweet = result.tweets[0];
      
      const analysis = await aiService.analyzeTweets({
        profile: inputConfig.profile,
        interests: inputConfig.interests,
        tweets: [
          {
            text: sampleTweet.text,
            url: sampleTweet.url,
            username: sampleTweet.username,
            likeCount: sampleTweet.likeCount,
            retweetCount: sampleTweet.retweetCount
          }
        ]
      });
      
      console.log('\n📝 AI Analysis Result:');
      console.log(JSON.stringify(analysis, null, 2));
    }

    console.log('\n✅ Test completed successfully');
  } catch (error) {
    console.error('❌ Error in test script:', error);
    process.exit(1);
  }
}

// Run the test
main(); 