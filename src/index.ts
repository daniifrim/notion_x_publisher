import { NotionService } from './services/notion.service';
import { TwitterService } from './services/twitter.service';
import { NotionConfig } from './types/notion.types';
import { TwitterConfig } from './types/twitter.types';

class NotionXPublisher {
  private notionService: NotionService;
  private twitterService: TwitterService;

  constructor(notionConfig: NotionConfig, twitterConfig: TwitterConfig) {
    this.notionService = new NotionService(notionConfig);
    this.twitterService = new TwitterService(twitterConfig);
  }

  async initialize(): Promise<void> {
    // Validate Notion database schema before proceeding
    await this.notionService.validateDatabaseSchema();
    // Initialize Twitter service
    await this.twitterService.initialize();
  }

  async processReadyTweets(): Promise<void> {
    try {
      const readyTweets = await this.notionService.getReadyTweets();
      
      for (const tweet of readyTweets) {
        try {
          console.log('Attempting to post tweet:', tweet.content);
          const publishedTweet = await this.twitterService.postTweet(tweet.content);
          console.log('Successfully posted tweet:', publishedTweet.text);
          await this.notionService.updateTweetStatus(tweet.id, 'Published', publishedTweet.url);
        } catch (error) {
          console.error(`Failed to process tweet ${tweet.id}:`, error);
          await this.notionService.updateTweetStatus(tweet.id, 'Failed to Post', error instanceof Error ? error.message : 'Unknown error');
        }
      }
    } catch (error) {
      console.error('Failed to process tweets:', error);
      throw error;
    }
  }
}

// AWS Lambda handler
export const handler = async (event: any): Promise<any> => {
  try {
    const notionConfig: NotionConfig = {
      databaseId: process.env.NOTION_DATABASE_ID!,
      apiKey: process.env.NOTION_API_KEY!
    };

    const twitterConfig: TwitterConfig = {
      apiKey: process.env.TWITTER_API_KEY!,
      apiKeySecret: process.env.TWITTER_API_SECRET!,
      accessToken: process.env.TWITTER_ACCESS_TOKEN!,
      accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET!
    };

    const publisher = new NotionXPublisher(notionConfig, twitterConfig);
    
    // Initialize and validate database schema
    await publisher.initialize();
    
    // Process tweets
    await publisher.processReadyTweets();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Successfully processed tweets' })
    };
  } catch (error) {
    console.error('Lambda execution failed:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        message: 'Failed to process tweets',
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    };
  }
}; 