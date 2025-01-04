import { NotionStatus } from './notion.types';

export interface WebhookPayload {
  event_type: 'databaseButtonClick';
  data: {
    pageId: string;
    buttonId?: string;
  };
}

export interface WebhookValidationResult {
  isValid: boolean;
  error?: string;
}

export interface WebhookProcessingResult {
  success: boolean;
  message: string;
  pageId: string;
  error?: string;
} 