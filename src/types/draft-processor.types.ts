import { AIModel } from '../config/ai.config';

export type TweetStatus = 'Draft' | 'AI Processed' | 'Ready To Publish' | 'Published' | 'Failed to Post';

export interface DraftProcessorConfig {
  model: AIModel;
  maxTokens: number;
  temperature: number;
}

export interface DraftTweet {
  id: string;
  title: string;
  status: TweetStatus;
}

export interface ProcessingResult {
  success: boolean;
  message: string;
  variations?: string[];
  error?: string;
} 