export interface NotionTweet {
  id: string;
  content: string;
  scheduledTime: Date;
  status: 'Draft' | 'Ready To Publish' | 'Processing' | 'Published' | 'Failed to Post';
  url?: string;
  publishedDate?: Date;
  effort?: string;
  engagement?: string;
  isThread?: boolean;
  title?: string;
  error?: string;
}

export interface NotionConfig {
  databaseId: string;
  apiKey: string;
}

export interface NotionBlock {
  type: string;
  paragraph?: {
    rich_text: Array<{
      type: string;
      text: {
        content: string;
      };
      plain_text: string;
    }>;
  };
}

export interface NotionInputConfig {
  profile: string;
  interests: string[];
  accountsToFollow: string[];
}

export interface NotionInputBlock {
  type: string;
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