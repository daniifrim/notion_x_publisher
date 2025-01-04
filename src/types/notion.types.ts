import { Client } from '@notionhq/client';

export type NotionStatus = 'Draft' | 'AI Generated' | 'Processed' | 'Ready To Publish' | 'Published' | 'Failed to Post';

export interface NotionConfig {
  apiKey: string;
  databaseId: string;
}

export interface NotionTweet {
  id: string;
  title?: string;
  content: string;
  status: NotionStatus;
  url?: string;
  scheduledTime: Date;
  isThread: boolean;
  error?: string;
  images?: string[];
}

export interface NotionBlock {
  id: string;
  type: string;
  [key: string]: any;
}

export interface NotionInputConfig {
  profile: string;
  interests: string[];
  accountsToFollow: string[];
}

export interface NotionInputBlock extends NotionBlock {
  heading_2?: {
    rich_text: Array<{
      plain_text: string;
    }>;
  };
  paragraph?: {
    rich_text: Array<{
      plain_text: string;
    }>;
  };
} 