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

  constructor(config: ScraperConfig) {
    this.apiToken = config.apifyToken;
    this.taskId = config.taskId;
  }

  public getTestInput(searchTerms: string[], startUrls: string[]): ScraperInput {
    // Get date range for the last 30 days to ensure we get enough tweets
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);

    // Convert usernames to proper search queries
    const queries = startUrls.map(url => {
      const username = url.split('/').pop() || '';
      return username.replace('@', '');  // Just use the username without the date range
    });

    // Add search terms
    const searchQueries = searchTerms.map(term => term.trim());

    // Combine all queries (max 5 as per docs)
    const combinedQueries = [...queries, ...searchQueries].slice(0, 5);

    return {
      customMapFunction: "(object) => { return {...object} }",
      start: startDate.toISOString().split('T')[0],
      end: endDate.toISOString().split('T')[0],
      includeSearchTerms: false,
      maxItems: 50,  // Reduced to avoid rate limiting
      minimumFavorites: 5,
      minimumReplies: 2,
      minimumRetweets: 5,
      onlyImage: false,
      onlyQuote: false,
      onlyTwitterBlue: false,
      onlyVerifiedUsers: false,
      onlyVideo: false,
      searchTerms: combinedQueries,
      sort: "Top",  // Changed to Top to get better results
      startUrls: startUrls,
      tweetLanguage: "en"
    };
  }

  async scrapeTweets(searchTerms: string[], startUrls: string[]): Promise<ScraperResult> {
    try {
      console.log('Starting Twitter scraping task...');
      const startTime = new Date();

      // Initialize Apify client
      const client = new ApifyClient({
        token: this.apiToken,
      });

      // Prepare input for the Apify task
      const input = this.getTestInput(searchTerms, startUrls);
      console.log('Apify task input:', JSON.stringify(input, null, 2));
      
      // Run the Apify task
      console.log('Running Apify task...');
      const run = await client.task(this.taskId).call({ task_input: input });
      
      // Wait for the task to finish and get dataset items
      console.log('Waiting for task to finish...');
      const dataset = await client.dataset(run.defaultDatasetId);
      const { items } = await dataset.listItems();
      
      console.log('Raw Apify results:', JSON.stringify(items, null, 2));

      // Get task logs
      console.log('\nTask Logs:');
      const logs = await client.log(run.id).get();
      console.log(logs);

      // Process and sort the results
      const tweets = items
        .filter((item: Record<string, any>) => !item.noResults)
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
        }))
        .sort((a: ScrapedTweet, b: ScrapedTweet) => b.likeCount - a.likeCount);

      const endTime = new Date();
      console.log(`Scraping completed in ${endTime.getTime() - startTime.getTime()}ms`);
      console.log('Processed tweets:', JSON.stringify(tweets, null, 2));

      return {
        tweets,
        totalTweets: tweets.length,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Failed to scrape tweets:', error);
      if (error instanceof Error) {
        console.error('Error details:', {
          message: error.message,
          stack: error.stack
        });
      }
      throw error;
    }
  }
} 