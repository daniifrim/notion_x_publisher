export interface SchedulerConfig {
  checkInterval: number;  // in minutes
  maxRetries: number;
  retryDelay: number;    // in minutes
}

export interface ScheduledTweet {
  id: string;
  content: string;
  scheduledTime: Date;
  status: 'Pending' | 'Processing' | 'Published' | 'Failed';
  retryCount: number;
  lastAttempt?: Date;
  error?: string;
  threadId?: string;    // If part of a thread
  threadPosition?: number; // Position in thread if applicable
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