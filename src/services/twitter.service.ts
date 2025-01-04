/**
 * Twitter Service
 * 
 * This service is responsible for interacting with the Twitter API to post tweets and threads.
 * It provides methods for uploading media, posting tweets, and handling rate limits.
 * 
 * Key Responsibilities:
 * 1. Upload media to Twitter.
 * 2. Post tweets and threads.
 * 3. Handle rate limits and errors.
 * 
 * Configuration:
 * - TwitterConfig: Configuration settings for the Twitter API.
 * 
 * Methods:
 * - postTweet: Posts a single tweet.
 * - postThread: Posts a thread of tweets.
 * - scheduleTweet: Schedules a tweet to be posted at a future date.
 */

import { TwitterApi } from 'twitter-api-v2';
import { TwitterConfig, Tweet, TweetContent, MediaType, MediaUpload } from '../types/twitter.types';

export class TwitterService {
  private client: TwitterApi;
  private config: TwitterConfig;
  private username: string = '';

  // Media upload constraints
  private readonly MAX_IMAGE_SIZE = 15 * 1024 * 1024; // 15MB
  private readonly MAX_GIF_SIZE = 15 * 1024 * 1024;   // 15MB
  private readonly MAX_VIDEO_SIZE = 512 * 1024 * 1024; // 512MB
  private readonly MAX_VIDEO_DURATION = 140; // 140 seconds (2min 20s)
  private readonly SUPPORTED_IMAGE_FORMATS = ['image/jpeg', 'image/png', 'image/webp'];
  private readonly SUPPORTED_GIF_FORMAT = 'image/gif';
  private readonly SUPPORTED_VIDEO_FORMATS = ['video/mp4', 'video/quicktime'];

  constructor(config: TwitterConfig) {
    this.config = config;
    this.client = new TwitterApi({
      appKey: config.apiKey,
      appSecret: config.apiKeySecret,
      accessToken: config.accessToken,
      accessSecret: config.accessTokenSecret,
    });
  }

  async initialize(): Promise<void> {
    const me = await this.client.v2.me();
    this.username = me.data.username;
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

  private async validateMediaType(url: string, type: MediaType): Promise<{ valid: boolean; error?: string }> {
    try {
      const response = await fetch(url);
      const contentType = response.headers.get('content-type');
      const contentLength = Number(response.headers.get('content-length'));

      switch (type) {
        case 'image':
          if (!this.SUPPORTED_IMAGE_FORMATS.includes(contentType || '')) {
            return { valid: false, error: `Unsupported image format: ${contentType}. Supported formats: JPEG, PNG, WEBP` };
          }
          if (contentLength > this.MAX_IMAGE_SIZE) {
            return { valid: false, error: `Image too large: ${Math.round(contentLength / 1024 / 1024)}MB. Maximum size: 15MB` };
          }
          break;

        case 'gif':
          if (contentType !== this.SUPPORTED_GIF_FORMAT) {
            return { valid: false, error: 'Only GIF format is supported for animated GIFs' };
          }
          if (contentLength > this.MAX_GIF_SIZE) {
            return { valid: false, error: `GIF too large: ${Math.round(contentLength / 1024 / 1024)}MB. Maximum size: 15MB` };
          }
          break;

        case 'video':
          if (!this.SUPPORTED_VIDEO_FORMATS.includes(contentType || '')) {
            return { valid: false, error: `Unsupported video format: ${contentType}. Supported formats: MP4, MOV` };
          }
          if (contentLength > this.MAX_VIDEO_SIZE) {
            return { valid: false, error: `Video too large: ${Math.round(contentLength / 1024 / 1024)}MB. Maximum size: 512MB` };
          }
          break;
      }

      return { valid: true };
    } catch (error) {
      if (error instanceof Error) {
        return { valid: false, error: `Failed to validate media: ${error.message}` };
      }
      return { valid: false, error: 'Failed to validate media: Unknown error' };
    }
  }

  private async uploadMedia(mediaUpload: MediaUpload): Promise<string> {
    try {
      console.log(`📤 Uploading ${mediaUpload.type}: ${mediaUpload.url}`);
      
      // Validate media
      const validation = await this.validateMediaType(mediaUpload.url, mediaUpload.type);
      if (!validation.valid) {
        throw new Error(validation.error);
      }

      // Fetch media
      const response = await fetch(mediaUpload.url);
      const buffer = await response.arrayBuffer();
      const mimeType = response.headers.get('content-type') || '';

      // Handle different media types
      let mediaId: string;
      if (mediaUpload.type === 'video') {
        // Use regular upload for videos (Twitter API v2 doesn't support chunked upload)
        mediaId = await this.client.v1.uploadMedia(Buffer.from(buffer), {
          mimeType,
          type: 'video/mp4'
        });
      } else {
        // Use regular upload for images and GIFs
        mediaId = await this.client.v1.uploadMedia(Buffer.from(buffer), {
          mimeType,
          type: mediaUpload.type === 'gif' ? 'animated_gif' : 'image'
        });
      }

      console.log(`✅ Successfully uploaded ${mediaUpload.type}`);
      return mediaId;
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Failed to upload ${mediaUpload.type}:`, error);
        throw error;
      }
      throw new Error(`Failed to upload ${mediaUpload.type}: Unknown error`);
    }
  }

  private validateMediaCombination(media: MediaUpload[]): { valid: boolean; error?: string } {
    // Check for mixing of media types
    const types = new Set(media.map(m => m.type));
    
    if (types.has('video') && types.size > 1) {
      return { valid: false, error: 'Videos cannot be combined with other media types' };
    }
    
    if (types.has('gif') && types.size > 1) {
      return { valid: false, error: 'GIFs cannot be combined with other media types' };
    }

    // Check media count constraints
    if (types.has('image') && media.filter(m => m.type === 'image').length > 4) {
      return { valid: false, error: 'Maximum of 4 images allowed per tweet' };
    }
    
    if (types.has('gif') && media.filter(m => m.type === 'gif').length > 1) {
      return { valid: false, error: 'Only 1 GIF allowed per tweet' };
    }
    
    if (types.has('video') && media.filter(m => m.type === 'video').length > 1) {
      return { valid: false, error: 'Only 1 video allowed per tweet' };
    }

    return { valid: true };
  }

  private async uploadMediaArray(media: MediaUpload[]): Promise<string[]> {
    // Validate media combination
    const validation = this.validateMediaCombination(media);
    if (!validation.valid) {
      throw new Error(validation.error);
    }

    // Upload each media item
    const mediaIds: string[] = [];
    for (const item of media) {
      const mediaId = await this.uploadMedia(item);
      mediaIds.push(mediaId);
    }

    return mediaIds;
  }

  private convertToMediaIdsTuple(mediaIds: string[]): [string] | [string, string] | [string, string, string] | [string, string, string, string] | undefined {
    if (mediaIds.length === 0) return undefined;
    if (mediaIds.length === 1) return [mediaIds[0]];
    if (mediaIds.length === 2) return [mediaIds[0], mediaIds[1]];
    if (mediaIds.length === 3) return [mediaIds[0], mediaIds[1], mediaIds[2]];
    if (mediaIds.length === 4) return [mediaIds[0], mediaIds[1], mediaIds[2], mediaIds[3]];
    return undefined;
  }

  async postTweet(content: string, media?: MediaUpload[]): Promise<{ id: string; text: string; url: string }> {
    try {
      if (!this.username) {
        await this.initialize();
      }

      let mediaIds: string[] = [];
      if (media && media.length > 0) {
        mediaIds = await this.uploadMediaArray(media);
      }

      const mediaIdsTuple = this.convertToMediaIdsTuple(mediaIds);

      const tweet = await this.client.v2.tweet(content, {
        media: mediaIdsTuple ? { media_ids: mediaIdsTuple } : undefined
      });

      return {
        id: tweet.data.id,
        text: tweet.data.text,
        url: `https://x.com/${this.username}/status/${tweet.data.id}`
      };
    } catch (error) {
      console.error('Twitter API Error:', error);
      if (error instanceof Error) {
        throw new Error(`Twitter API Error: ${error.message}`);
      }
      throw new Error('Twitter API Error: Unknown error');
    }
  }

  async postThread(tweets: TweetContent[]): Promise<{ threadUrl: string; tweetIds: string[] }> {
    try {
      if (!this.username) {
        await this.initialize();
      }

      if (!tweets.length) {
        throw new Error('Thread must contain at least one tweet');
      }

      const tweetIds: string[] = [];
      let replyToId: string | undefined;

      // Post each tweet in the thread
      for (const tweet of tweets) {
        let mediaIds: string[] = [];
        if (tweet.media && tweet.media.length > 0) {
          mediaIds = await this.uploadMediaArray(tweet.media);
        }

        const mediaIdsTuple = this.convertToMediaIdsTuple(mediaIds);

        const tweetData = replyToId
          ? await this.client.v2.tweet(tweet.content, { 
              reply: { in_reply_to_tweet_id: replyToId },
              media: mediaIdsTuple ? { media_ids: mediaIdsTuple } : undefined
            })
          : await this.client.v2.tweet(tweet.content, {
              media: mediaIdsTuple ? { media_ids: mediaIdsTuple } : undefined
            });

        tweetIds.push(tweetData.data.id);
        replyToId = tweetData.data.id;
      }

      return {
        threadUrl: `https://x.com/${this.username}/status/${tweetIds[0]}`,
        tweetIds
      };
    } catch (error) {
      console.error('Twitter Thread Error:', error);
      if (error instanceof Error) {
        throw new Error(`Twitter Thread Error: ${error.message}`);
      }
      throw new Error('Twitter Thread Error: Unknown error');
    }
  }

  async scheduleTweet(content: string, publishDate: Date): Promise<void> {
    // Note: Twitter API v2 doesn't support scheduling tweets directly
    // We'll need to implement this using a queue system or AWS EventBridge
    throw new Error('Tweet scheduling not implemented - requires additional infrastructure');
  }
} 