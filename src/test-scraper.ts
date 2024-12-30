import dotenv from 'dotenv';
import { ScraperService } from './services/scraper.service';
import { AIService } from './services/ai.service';
import { NotionService } from './services/notion.service';
import { ScraperConfig } from './types/scraper.types';
import { AIConfig } from './types/ai.types';
import { NotionConfig } from './types/notion.types';

// Load environment variables
dotenv.config();

async function main() {
  try {
    // Initialize configurations
    const notionConfig: NotionConfig = {
      apiKey: process.env.NOTION_API_KEY || '',
      databaseId: process.env.NOTION_DATABASE_ID || ''
    };

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

    // Initialize services
    console.log('Initializing services...');
    const notionService = new NotionService(notionConfig);
    const scraperService = new ScraperService(scraperConfig);
    const aiService = new AIService(aiConfig);

    // Get configuration from Notion
    console.log('Fetching configuration from Notion...');
    const inputConfig = await notionService.getInputConfig();
    console.log('Configuration loaded:', {
      profileLength: inputConfig.profile.length,
      interestsCount: inputConfig.interests.length,
      accountsCount: inputConfig.accountsToFollow.length
    });

    // Process tweets
    console.log('\nStarting tweet scraping...');
    const scrapedData = await scraperService.scrapeTweets(
      inputConfig.interests,
      inputConfig.accountsToFollow
    );
    console.log(`Scraped ${scrapedData.totalTweets} tweets`);

    console.log('\nAnalyzing tweets...');
    const analysis = await aiService.analyzeTweets({
      profile: inputConfig.profile,
      interests: inputConfig.interests,
      tweets: scrapedData.tweets.map(t => ({
        text: t.text,
        url: t.url,
        username: t.username,
        likeCount: t.likeCount,
        retweetCount: t.retweetCount
      }))
    });

    console.log('\nAnalysis Results:');
    console.log(analysis.markdown);

  } catch (error) {
    console.error('Error in test script:', error);
  }
}

main().catch(console.error); 