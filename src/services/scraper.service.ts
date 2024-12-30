import { ApifyClient } from 'apify-client';
import { ScraperConfig, ScraperInput, ScraperResult, ScrapedTweet } from '../types/scraper.types';

interface ApifyTweetItem {
  text?: string;
  url?: string;
  username?: string;
  likeCount?: number;
  retweetCount?: number;
  createdAt?: string;
  isVerified?: boolean;
  isRetweet?: boolean;
  hasMedia?: boolean;
}

export class ScraperService {
  private client: ApifyClient;
  private config: ScraperConfig;

  constructor(config: ScraperConfig) {
    this.config = config;
    this.client = new ApifyClient({
      token: config.apifyToken
    });
  }

  private getDefaultInput(searchTerms: string[], startUrls: string[]): ScraperInput {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + 5);

    return {
      customMapFunction: "(object) => { return {...object} }",
      includeSearchTerms: true,
      maxItems: 20,
      minimumRetweets: 30,
      onlyImage: false,
      onlyQuote: false,
      onlyTwitterBlue: false,
      onlyVerifiedUsers: true,
      onlyVideo: false,
      searchTerms,
      sort: "Top",
      start: startDate.toISOString().split('T')[0],
      startUrls,
      tweetLanguage: "en"
    };
  }

  async scrapeTweets(searchTerms: string[], startUrls: string[]): Promise<ScraperResult> {
    try {
      console.log('Starting Twitter scraping task...');
      const startTime = new Date();

      // Prepare input for the Apify task
      const input = this.getDefaultInput(searchTerms, startUrls);
      
      // Run the Apify task
      console.log('Running Apify task...');
      const run = await this.client.task(this.config.taskId).call({ task_input: input });

      // Get the results
      console.log('Fetching results from Apify...');
      const dataset = await this.client.dataset(run.defaultDatasetId);
      const itemsResult = await dataset.listItems();
      const items = Array.isArray(itemsResult) ? itemsResult : (itemsResult as any).items || [];

      // Process and sort the results
      const tweets = items
        .map((item: Record<string, unknown>): ScrapedTweet => ({
          text: String(item.text || ''),
          url: String(item.url || ''),
          username: String(item.username || ''),
          likeCount: Number(item.likeCount || 0),
          retweetCount: Number(item.retweetCount || 0),
          createdAt: String(item.createdAt || new Date().toISOString()),
          isVerified: Boolean(item.isVerified || false),
          isRetweet: Boolean(item.isRetweet || false),
          hasMedia: Boolean(item.hasMedia || false)
        }))
        .sort((a: ScrapedTweet, b: ScrapedTweet) => b.likeCount - a.likeCount);

      const endTime = new Date();
      console.log(`Scraping completed in ${endTime.getTime() - startTime.getTime()}ms`);

      return {
        tweets,
        totalTweets: tweets.length,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Failed to scrape tweets:', error);
      throw error;
    }
  }
} 