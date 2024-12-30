export interface NotionTweet {
  id: string;
  content: string;
  scheduledTime: Date;
  status: 'Draft' | 'Ready To Publish' | 'Published' | 'Failed to Post';
  url?: string;
  publishedDate?: Date;
  type?: string;
  effort?: string;
  engagement?: string;
}

export interface NotionConfig {
  databaseId: string;
  apiKey: string;
} 