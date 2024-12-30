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
const aiService = new AIService(aiConfig);
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