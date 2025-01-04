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
  private apiToken: string;
  private taskId: string;
  private readonly MAX_SEARCH_TERMS = 5;
  private readonly ITEMS_PER_QUERY = 50;
  private readonly BATCH_DELAY = 120000;

  constructor(config: ScraperConfig) {
    if (!config.apifyToken) {
      throw new Error('APIFY_API_TOKEN is required');
    }
    if (!config.taskId) {
      throw new Error('APIFY_TASK_ID is required');
    }
    this.apiToken = config.apifyToken;
    this.taskId = config.taskId;
  }

  private getTestInput(searchTerms: string[]): ScraperInput {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7);

    const minItemsRequired = this.ITEMS_PER_QUERY * Math.min(searchTerms.length, this.MAX_SEARCH_TERMS);

    return {
      customMapFunction: "(object) => { return {...object} }",
      start: startDate.toISOString().split('T')[0],
      end: endDate.toISOString().split('T')[0],
      includeSearchTerms: false,
      maxItems: 250,
      minimumFavorites: 5,
      minimumReplies: 2,
      minimumRetweets: 5,
      onlyImage: false,
      onlyQuote: false,
      onlyTwitterBlue: false,
      onlyVerifiedUsers: false,
      onlyVideo: false,
      searchTerms: searchTerms.slice(0, this.MAX_SEARCH_TERMS),
      sort: "Top",
      startUrls: [],
      tweetLanguage: "en"
    };
  }

  private async sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private async processBatch(searchTerms: string[]): Promise<ScrapedTweet[]> {
    try {
      console.log(`\n🔄 Processing batch with ${searchTerms.length} search terms...`);
      
      const client = new ApifyClient({
        token: this.apiToken,
      });

      const input = this.getTestInput(searchTerms);
      console.log('📤 Apify task input:', JSON.stringify(input, null, 2));
      
      console.log('🚀 Running Apify task...');
      const run = await client.task(this.taskId).call({ task_input: input });
      
      console.log('⏳ Waiting for task to finish...');
      const dataset = await client.dataset(run.defaultDatasetId);
      const { items } = await dataset.listItems();
      
      console.log('📥 Raw Apify response:', JSON.stringify(items, null, 2));
      console.log(`✅ Batch completed with ${items.length} items`);

      const filteredItems = items.filter((item: Record<string, any>) => !item.noResults);
      console.log(`📊 After filtering noResults: ${filteredItems.length} items`);

      const mappedTweets = filteredItems
        .map((item: Record<string, any>): ScrapedTweet => ({
          text: String(item.text || ''),
          url: String(item.url || ''),
          username: String(item.username || ''),
          likeCount: Number(item.likeCount || 0),
          retweetCount: Number(item.retweetCount || 0),
          createdAt: String(item.createdAt || new Date().toISOString()),
          isVerified: Boolean(item.isVerified || false),
          isRetweet: Boolean(item.isRetweet || false),
          hasMedia: Boolean(item.hasMedia || false)
        }));

      console.log(`📊 After mapping: ${mappedTweets.length} tweets`);
      console.log('📝 Sample tweet:', mappedTweets.length > 0 ? JSON.stringify(mappedTweets[0], null, 2) : 'No tweets');

      return mappedTweets;
    } catch (error) {
      console.error('❌ Failed to process batch:', error);
      return [];
    }
  }

  async scrapeTweets(searchTerms: string[]): Promise<ScraperResult> {
    try {
      console.log('🎯 Starting Twitter scraping...');
      const startTime = new Date();

      // Limit search terms to maximum allowed
      const limitedSearchTerms = searchTerms.slice(0, this.MAX_SEARCH_TERMS);
      console.log(`📚 Processing ${limitedSearchTerms.length} search terms`);

      const tweets = await this.processBatch(limitedSearchTerms);

      const uniqueTweets = Array.from(
        new Map(tweets.map(tweet => [tweet.url, tweet])).values()
      ).sort((a, b) => b.likeCount - a.likeCount);

      const endTime = new Date();
      console.log(`\n✨ Scraping completed in ${endTime.getTime() - startTime.getTime()}ms`);
      console.log(`📊 Total unique tweets: ${uniqueTweets.length}`);

      return {
        tweets: uniqueTweets,
        totalTweets: uniqueTweets.length,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('❌ Failed to scrape tweets:', error);
      throw error;
    }
  }
} 