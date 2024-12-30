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
      model: 'gpt-4o',
      maxTokens: 1000,
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
    
    // Use actual configuration from Notion
    const scrapedData = await scraperService.scrapeTweets(
      inputConfig.interests,
      inputConfig.accountsToFollow
    );

    // Display the exact JSON used for Apify (before making the request)
    console.log('\nApify Input JSON for manual testing:');
    const apifyInput = scraperService.getTestInput(inputConfig.interests, inputConfig.accountsToFollow);
    console.log(JSON.stringify(apifyInput, null, 2));

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

    // Create analysis entry in Notion
    console.log('\nCreating analysis entry in Notion...');
    try {
      await notionService.createAnalysisEntry('', analysis.markdown, []);
      console.log('✅ Analysis entry created in Notion');
    } catch (error) {
      console.error('Failed to create analysis entry:', error);
      if (error instanceof Error) {
        console.error('Error details:', {
          message: error.message,
          stack: error.stack
        });
      }
    }

  } catch (error) {
    console.error('Error in test script:', error);
  }
}

main().catch(console.error); 