import { TwitterService } from '../services/twitter.service';
import { NotionService } from '../services/notion.service';
import { NotificationService } from '../services/notification.service';

export interface SchedulerConfig {
  checkInterval: number;  // in minutes
  maxRetries: number;
  retryDelay: number;    // in milliseconds
}

export interface SchedulerDependencies {
  twitterService: TwitterService;
  notionService: NotionService;
  notificationService: NotificationService;
}

export interface ScheduledTweet {
  id: string;
  content: string;
  scheduledTime: Date;
  status: 'Pending' | 'Processing' | 'Published' | 'Failed';
  retryCount: number;
  lastAttempt?: Date;
  error?: string;
  threadId?: string;
  threadPosition?: number;
}

export interface TweetQueue {
  pendingTweets: ScheduledTweet[];
  failedTweets: ScheduledTweet[];
  lastCheck: Date;
}

export interface SchedulerResult {
  success: boolean;
  message: string;
  tweetsProcessed: number;
  errors: string[];
} 