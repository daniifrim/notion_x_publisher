import { NotionStatus } from './notion.types';

export interface WebhookPayload {
  source: {
    type: string;
    automation_id: string;
    action_id: string;
    event_id: string;
    attempt: number;
  };
  data: {
    object: string;
    id: string;
    created_time: string;
    last_edited_time: string;
    created_by: {
      object: string;
      id: string;
    };
    last_edited_by: {
      object: string;
      id: string;
    };
    parent: {
      type: string;
      database_id: string;
    };
    properties: {
      [key: string]: any;
    };
    url: string;
    public_url: string | null;
    request_id: string;
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