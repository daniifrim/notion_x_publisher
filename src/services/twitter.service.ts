import { TwitterApi } from 'twitter-api-v2';
import { TwitterConfig, Tweet } from '../types/twitter.types';

export class TwitterService {
  private client: TwitterApi;

  constructor(config: TwitterConfig) {
    this.client = new TwitterApi({
      appKey: config.apiKey,
      appSecret: config.apiKeySecret,
      accessToken: config.accessToken,
      accessSecret: config.accessTokenSecret,
    });
  }

  private formatRateLimitError(error: any): string {
    if (error.code === 429) {
      const resetDate = new Date(Number(error.headers['x-user-limit-24hour-reset']) * 1000);
      const remainingTweets = error.headers['x-user-limit-24hour-remaining'];
      const limit = error.headers['x-user-limit-24hour-limit'];
      
      return `Twitter rate limit reached: ${remainingTweets}/${limit} tweets remaining. Resets at ${resetDate.toLocaleString()}`;
    }
    return error.message;
  }

  async debugApiAccess(): Promise<void> {
    try {
      console.log('🔍 Testing Twitter API access...');
      
      // Test 1: Get user info
      console.log('Test 1: Getting user info...');
      const user = await this.client.v2.me();
      console.log('✅ Successfully got user info:', user.data);

      // Test 2: Check app settings
      console.log('\nTest 2: Checking app settings...');
      const appSettings = await this.client.v2.get('users/me');
      console.log('✅ Successfully got app settings:', appSettings);

      // Test 3: Check write permissions
      console.log('\nTest 3: Checking write permissions...');
      const writePermissions = await this.client.v2.get('users/me', {
        'tweet.fields': 'created_at'
      });
      console.log('✅ Successfully checked write permissions:', writePermissions);

      // Test 4: Check rate limits
      console.log('\nTest 4: Checking rate limits...');
      const rateLimits = await this.getRateLimits();
      console.log('ℹ️ Current rate limits:', rateLimits);

      // Test 5: Attempt to post a test tweet
      console.log('\nTest 5: Attempting to post a test tweet...');
      if (rateLimits.remaining > 0) {
        const testTweet = await this.client.v2.tweet('Test tweet from NotionXPublisher [' + new Date().toISOString() + ']');
        console.log('✅ Successfully posted test tweet:', testTweet);
      } else {
        console.log('⚠️ Skipping test tweet - rate limit reached');
      }

      console.log('\n✅ All debug tests passed!');
    } catch (error: any) {
      console.error('❌ Debug test failed:', {
        error: this.formatRateLimitError(error),
        code: error.code,
        data: error.data,
        stack: error.stack
      });
      throw error;
    }
  }

  async getRateLimits(): Promise<{ limit: number; remaining: number; resetAt: Date }> {
    try {
      const response = await this.client.v2.get('users/me');
      const headers = response._headers;
      
      return {
        limit: Number(headers['x-user-limit-24hour-limit'] || 25),
        remaining: Number(headers['x-user-limit-24hour-remaining'] || 0),
        resetAt: new Date(Number(headers['x-user-limit-24hour-reset'] || 0) * 1000)
      };
    } catch (error) {
      console.error('Failed to get rate limits:', error);
      throw error;
    }
  }

  async validateCredentials(): Promise<void> {
    try {
      // First run debug tests
      await this.debugApiAccess();
      
      // Verify credentials and app permissions
      const currentUser = await this.client.v2.me();
      
      // Check if we have write permissions by attempting to get app settings
      const appPermissions = await this.client.v2.get('users/me');
      if (!appPermissions || appPermissions.errors) {
        throw new Error('Twitter API credentials do not have write permissions. Please check your app settings in the Twitter Developer Portal.');
      }
    } catch (error: any) {
      if (error.code === 403) {
        throw new Error(
          'Twitter API authentication failed. Please ensure your app has OAuth 1.0a enabled and "Read and Write" permissions.'
        );
      }
      throw error;
    }
  }

  async postTweet(content: string): Promise<Tweet> {
    try {
      // Check rate limits before posting
      const rateLimits = await this.getRateLimits();
      if (rateLimits.remaining <= 0) {
        throw new Error(
          `Twitter rate limit reached. Cannot post more tweets until ${rateLimits.resetAt.toLocaleString()}`
        );
      }

      // Attempt to post the tweet
      const tweet = await this.client.v2.tweet(content);
      
      if (!tweet.data) {
        throw new Error('Failed to post tweet: No response data received');
      }

      return {
        id: tweet.data.id,
        text: tweet.data.text,
        createdAt: new Date()
      };
    } catch (error: any) {
      console.error('Failed to post tweet:', {
        error: this.formatRateLimitError(error),
        code: error.code,
        details: error.data?.detail || 'No additional details',
        headers: error.headers,
        rateLimit: error.rateLimit
      });
      throw error;
    }
  }

  async scheduleTweet(content: string, publishDate: Date): Promise<void> {
    // Note: Twitter API v2 doesn't support scheduling tweets directly
    // We'll need to implement this using a queue system or AWS EventBridge
    throw new Error('Tweet scheduling not implemented - requires additional infrastructure');
  }
} 