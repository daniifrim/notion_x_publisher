import { TwitterService } from './twitter.service';
import { NotionService } from './notion.service';
import { NotificationService } from './notification.service';
import { SchedulerConfig, SchedulerDependencies, ScheduledTweet, SchedulerResult } from '../types/scheduler.types';
import { NotionTweet, NotionStatus } from '../types/notion.types';
import { MediaUpload } from '../types/twitter.types';

export class SchedulerService {
  private config: SchedulerConfig;
  private twitterService: TwitterService;
  private notionService: NotionService;
  private notificationService: NotificationService;

  constructor(
    config: SchedulerConfig,
    dependencies: SchedulerDependencies
  ) {
    this.config = config;
    this.twitterService = dependencies.twitterService;
    this.notionService = dependencies.notionService;
    this.notificationService = dependencies.notificationService;
  }

  private async processSingleTweet(tweet: ScheduledTweet): Promise<boolean> {
    try {
      // Check if it's time to publish
      if (tweet.scheduledTime > new Date()) {
        return false; // Not time yet
      }

      // Handle thread vs single tweet
      let result;
      if (tweet.threadId) {
        // Get all tweets in the thread
        const notionTweets = await this.notionService.getReadyTweets();
        const threadTweets = notionTweets
          .filter(t => t.isThread && t.title === tweet.threadId)
          .sort((a, b) => (a.content > b.content ? 1 : -1));

        // Map tweets to include content and images while preserving other properties
        const mappedThreadTweets = threadTweets.map(t => ({
          content: t.content,
          images: t.images
        }));

        // Post thread
        result = await this.twitterService.postThread(mappedThreadTweets);

        // Update all thread tweets and send notification
        for (const threadTweet of threadTweets) {
          await this.notionService.updateTweetStatus(
            threadTweet.id,
            'Published',
            result.threadUrl
          );
        }

        // Convert to NotionTweet for notification
        const notificationTweet = {
          ...threadTweets[0],
          status: 'Published' as const,
          url: result.threadUrl
        };

        await this.notificationService.notifyTweetPublished(notificationTweet);
      } else {
        // Post single tweet
        const media = tweet.images?.map(url => ({ url, type: 'image' as const }));
        result = await this.twitterService.postTweet(tweet.content, media);
        await this.notionService.updateTweetStatus(
          tweet.id,
          'Published',
          result.url
        );

        // Convert to NotionTweet for notification
        const notificationTweet = {
          id: tweet.id,
          content: tweet.content,
          status: 'Published' as const,
          url: result.url,
          scheduledTime: tweet.scheduledTime,
          isThread: false,
          images: tweet.images
        };

        await this.notificationService.notifyTweetPublished(notificationTweet);
      }

      return true;
    } catch (error) {
      console.error(`Failed to process tweet ${tweet.id}:`, error);
      
      // Update retry count and status
      tweet.retryCount++;
      tweet.lastAttempt = new Date();
      tweet.error = error instanceof Error ? error.message : 'Unknown error';

      if (tweet.retryCount >= this.config.maxRetries) {
        await this.notionService.updateTweetStatus(
          tweet.id,
          'Failed to Post',
          undefined,
          tweet.error
        );

        // Convert to NotionTweet for error notification
        const notificationTweet = {
          id: tweet.id,
          content: tweet.content,
          status: 'Failed to Post' as const,
          scheduledTime: tweet.scheduledTime,
          isThread: !!tweet.threadId,
          error: tweet.error,
          images: tweet.images
        };

        await this.notificationService.notifyTweetError(notificationTweet, tweet.error);
      }

      return false;
    }
  }

  async processQueue(): Promise<SchedulerResult> {
    const result: SchedulerResult = {
      success: true,
      message: 'Tweet processing completed',
      tweetsProcessed: 0,
      errors: []
    };

    try {
      // Get all ready tweets from Notion
      const tweets = await this.notionService.getReadyTweets();
      
      // Convert to ScheduledTweet format
      const scheduledTweets: ScheduledTweet[] = tweets.map(tweet => ({
        id: tweet.id,
        content: tweet.content,
        scheduledTime: tweet.scheduledTime,
        retryCount: 0,
        threadId: tweet.isThread ? tweet.title : undefined,
        images: tweet.images
      }));

      // Process each tweet
      for (const tweet of scheduledTweets) {
        try {
          const processed = await this.processSingleTweet(tweet);
          if (processed) {
            result.tweetsProcessed++;
          }
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          result.errors.push(`Failed to process tweet ${tweet.id}: ${errorMessage}`);
        }
      }

      // Update result based on processing
      if (result.errors.length > 0) {
        result.success = false;
        result.message = `Completed with ${result.errors.length} errors`;
      }

      return result;
    } catch (error) {
      console.error('Failed to process tweet queue:', error);
      return {
        success: false,
        message: 'Failed to process tweet queue',
        tweetsProcessed: result.tweetsProcessed,
        errors: [...result.errors, error instanceof Error ? error.message : 'Unknown error']
      };
    }
  }

  async retryFailedTweets(): Promise<SchedulerResult> {
    const result: SchedulerResult = {
      success: true,
      message: 'Retry processing completed',
      tweetsProcessed: 0,
      errors: []
    };

    try {
      // Get failed tweets that haven't exceeded retry limit
      const tweets = await this.notionService.getReadyTweets();
      const failedTweets = tweets.filter(
        tweet => tweet.status === 'Failed to Post'
      );

      // Process each failed tweet
      for (const tweet of failedTweets) {
        const scheduledTweet: ScheduledTweet = {
          id: tweet.id,
          content: tweet.content,
          scheduledTime: tweet.scheduledTime,
          retryCount: 0,
          threadId: tweet.isThread ? tweet.title : undefined,
          images: tweet.images
        };

        try {
          const processed = await this.processSingleTweet(scheduledTweet);
          if (processed) {
            result.tweetsProcessed++;
          }
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          result.errors.push(`Failed to retry tweet ${tweet.id}: ${errorMessage}`);
        }
      }

      // Update result based on processing
      if (result.errors.length > 0) {
        result.success = false;
        result.message = `Retry completed with ${result.errors.length} errors`;
      }

      return result;
    } catch (error) {
      console.error('Failed to retry failed tweets:', error);
      return {
        success: false,
        message: 'Failed to process retry queue',
        tweetsProcessed: result.tweetsProcessed,
        errors: [...result.errors, error instanceof Error ? error.message : 'Unknown error']
      };
    }
  }
} 