export interface NotionTweet {
  id: string;
  content: string;
  scheduledTime: Date;
  status: 'Draft' | 'Ready To Publish' | 'Published' | 'Failed to Post';
  url?: string;
  publishedDate?: Date;
  effort?: string;
  engagement?: string;
  isThread?: boolean;
  title?: string;
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