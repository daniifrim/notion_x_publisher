/**
 * AWS Lambda Handler: Tweet Scraper and Analyzer
 * 
 * This Lambda function runs hourly to scrape tweets based on configured interests
 * and analyze them using AI. It helps in understanding engagement patterns and content themes.
 * 
 * Process Flow:
 * 1. Gets configuration (interests, accounts to follow) from Notion
 * 2. Uses Apify to scrape relevant tweets
 * 3. Analyzes tweets using OpenAI
 * 4. Stores analysis results in Notion
 * 
 * Related Files:
 * - services/scraper.service.ts: Handles tweet scraping via Apify
 * - services/ai.service.ts: Manages OpenAI interactions
 * - services/notion.service.ts: Handles Notion database operations
 * 
 * Trigger: Separate EventBridge rule (recommended: every hour)
 */

import { ScraperService } from '../../services/scraper.service';
import { AIService } from '../../services/ai.service';
import { NotionService } from '../../services/notion.service';
import { ScraperConfig } from '../../types/scraper.types';
import { AIConfig } from '../../types/ai.types';
import { NotionConfig } from '../../types/notion.types';

// Load environment variables
const scraperConfig: ScraperConfig = {
  apifyToken: process.env.APIFY_API_TOKEN || '',
  taskId: process.env.APIFY_TASK_ID || ''
};

const aiConfig: AIConfig = {
  apiKey: process.env.OPENAI_API_KEY || '',
  model: 'gpt-4',
  maxTokens: 5000,
  temperature: 0.5
};

const notionConfig: NotionConfig = {
  apiKey: process.env.NOTION_API_KEY || '',
  databaseId: process.env.NOTION_DATABASE_ID || ''
};

// Initialize services
const scraperService = new ScraperService(scraperConfig);
const aiService = AIService.getInstance();
const notionService = new NotionService(notionConfig);

export const handler = async (event: any): Promise<any> => {
  try {
    console.log('Starting scraper function...');
    
    // Get configuration from Notion
    const notionData = await notionService.getReadyTweets();
    if (!notionData.length) {
      console.log('No tweets ready for processing');
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'No tweets ready for processing' })
      };
    }

    // Get the first ready tweet's configuration
    const tweet = notionData[0];
    
    // Extract interests and profile from the tweet
    const interests = tweet.content.split(',').map(i => i.trim());
    const profile = tweet.title || 'Twitter user';

    // Scrape tweets based on configuration
    const scrapedData = await scraperService.scrapeTweets(interests, []);

    // Analyze the scraped tweets
    const analysis = await aiService.analyzeTweets({
      profile,
      interests,
      tweets: scrapedData.tweets.map(t => ({
        text: t.text,
        url: t.url,
        username: t.username,
        likeCount: t.likeCount,
        retweetCount: t.retweetCount
      }))
    });

    // Update Notion with the results
    await notionService.updateTweetStatus(
      tweet.id,
      'Published',
      'Analysis completed'
    );

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Successfully processed tweets',
        analysis: analysis.markdown
      })
    };
  } catch (error) {
    console.error('Error in scraper function:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Error processing tweets',
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    };
  }
}; 