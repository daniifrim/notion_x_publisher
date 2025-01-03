import { AIModel } from '../config/ai.config';
import { NotionStatus } from './notion.types';

export interface DraftProcessorConfig {
  model: AIModel;
  maxTokens: number;
  temperature: number;
}

export interface DraftTweet {
  id: string;
  title: string;
  status: NotionStatus;
}

export interface ProcessingResult {
  success: boolean;
  message: string;
  variations?: string[];
  error?: string;
} 