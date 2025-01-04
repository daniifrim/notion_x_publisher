/**
 * Webhook Handler Test Script
 * 
 * This script tests the webhook functionality locally, simulating
 * button clicks from Notion and verifying the processing logic.
 * 
 * Usage:
 * - Run with: npm run test:webhook
 * - Requires .env file with Notion credentials
 */

import { WebhookPayload } from '../types/webhook.types';
import { NotionService } from '../services/notion.service';
import { DraftProcessorService } from '../services/draft-processor.service';
import { AI_CONFIG } from '../config/ai.config';
import { handler } from '../webhook';

async function testWebhookHandler() {
  try {
    console.log('🧪 Starting webhook handler test');
    
    // Load environment variables
    const notionApiKey = process.env.NOTION_API_KEY;
    const notionDatabaseId = process.env.NOTION_DATABASE_ID;
    const webhookSecret = process.env.WEBHOOK_SECRET;
    
    console.log('🔑 Environment check:', {
      NOTION_API_KEY: notionApiKey ? '✓ Present' : '✗ Missing',
      NOTION_DATABASE_ID: notionDatabaseId ? '✓ Present' : '✗ Missing',
      WEBHOOK_SECRET: webhookSecret ? '✓ Present' : '✗ Missing'
    });
    
    if (!notionApiKey || !notionDatabaseId || !webhookSecret) {
      throw new Error('Missing required environment variables');
    }
    
    // Initialize services
    console.log('🔧 Initializing services');
    const notionService = new NotionService({
      apiKey: notionApiKey,
      databaseId: notionDatabaseId
    });
    
    // Create test payload
    console.log('📦 Creating test payload');
    const testPayload: WebhookPayload = {
      source: {
        type: 'automation',
        automation_id: 'test-automation',
        action_id: 'test-action',
        event_id: 'test-event',
        attempt: 1
      },
      data: {
        object: 'page',
        id: process.env.TEST_PAGE_ID || 'test-page-id',
        created_time: new Date().toISOString(),
        last_edited_time: new Date().toISOString(),
        created_by: {
          object: 'user',
          id: 'test-user'
        },
        last_edited_by: {
          object: 'user',
          id: 'test-user'
        },
        parent: {
          type: 'database_id',
          database_id: notionDatabaseId
        },
        properties: {},
        url: 'https://notion.so/test-page',
        public_url: null,
        request_id: 'test-request'
      }
    };
    
    // Create test event
    const event = {
      body: JSON.stringify(testPayload),
      headers: {
        'x-webhook-secret': webhookSecret
      },
      httpMethod: 'POST',
      path: '/webhook',
      requestContext: {},
      resource: '/webhook'
    };
    
    console.log('🚀 Calling webhook handler');
    const response = await handler(event as any);
    
    console.log('📝 Response:', response);
    
    if (response.statusCode === 200) {
      console.log('✅ Test passed');
    } else {
      console.log('❌ Test failed');
    }
    
    return response;
  } catch (error) {
    console.error('❌ Test failed with error:', error);
    throw error;
  }
}

testWebhookHandler().catch(console.error); 