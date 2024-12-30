export interface NotionTweet {
  id: string;
  content: string;
  publicationDate: Date;
  status: 'Draft' | 'Ready To Publish' | 'Published' | 'Failed to Post';
  url?: string;
}

export interface NotionConfig {
  databaseId: string;
  apiKey: string;
} 