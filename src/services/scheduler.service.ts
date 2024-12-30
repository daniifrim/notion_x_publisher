import { NotionService } from './notion.service';
import { TwitterService } from './twitter.service';
import { NotionTweet } from '../types/notion.types';

export class SchedulerService {
  private notionService: NotionService;
  private twitterService: TwitterService;

  constructor(notionService: NotionService, twitterService: TwitterService) {
    this.notionService = notionService;
    this.twitterService = twitterService;
  }

  private shouldPublishTweet(tweet: NotionTweet): boolean {
    const now = new Date();
    const tweetTime = tweet.scheduledTime;
    
    // Check if the tweet is scheduled within the next 5 minutes
    const fiveMinutesFromNow = new Date(now.getTime() + 5 * 60 * 1000);
    
    return tweetTime >= now && tweetTime <= fiveMinutesFromNow;
  }

  async processScheduledTweets(): Promise<void> {
    try {
      const readyTweets = await this.notionService.getReadyTweets();
      
      // Sort tweets by scheduled time
      const sortedTweets = readyTweets.sort((a, b) => 
        a.scheduledTime.getTime() - b.scheduledTime.getTime()
      );

      for (const tweet of sortedTweets) {
        if (this.shouldPublishTweet(tweet)) {
          try {
            const publishedTweet = await this.twitterService.postTweet(tweet.content);
            await this.notionService.updateTweetStatus(tweet.id, 'Published', publishedTweet.url);
          } catch (error) {
            console.error(`Failed to publish scheduled tweet ${tweet.id}:`, error);
            await this.notionService.updateTweetStatus(tweet.id, 'Failed to Post');
          }
        }
      }
    } catch (error) {
      console.error('Failed to process scheduled tweets:', error);
      throw error;
    }
  }
} 