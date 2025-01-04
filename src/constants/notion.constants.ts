/**
 * Constants for Notion database schema
 */
export const NOTION_SCHEMA = {
  PROPERTIES: {
    TITLE: 'Idea',
    STATUS: 'Status',
    THREAD: 'Thread',
    SCHEDULED_TIME: 'Scheduled Time'
  },
  STATUS_VALUES: {
    DRAFT: 'Draft',
    PROCESSED: 'Processed',
    SCHEDULED: 'Scheduled',
    POSTED: 'Posted',
    FAILED: 'Failed to Post'
  }
} as const; 