/**
 * This file contains the AWS Lambda handler for processing webhook requests from Notion.
 * 
 * The handler performs the following tasks:
 * 1. Validates the webhook secret to ensure the request is authorized.
 * 2. Parses and validates the JSON payload received from Notion.
 * 3. Uses the NotionService to interact with the Notion API.
 * 4. Uses the DraftProcessorService to process the specific page.
 */

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { WebhookPayload } from './types/webhook.types';
import { NotionService } from './services/notion.service';
import { DraftProcessorService } from './services/draft-processor.service';
import { AI_CONFIG } from './config/ai.config';
import { ProcessingResult } from './types/notion.types';
import { NotificationService } from './services/notification.service';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log('🚀 Webhook handler started');
  console.log('📥 Event:', JSON.stringify({
    headers: event.headers,
    body: event.body,
    path: event.path,
    httpMethod: event.httpMethod
  }, null, 2));
  
  try {
    console.log('🔧 Initializing services');
    const notionService = new NotionService({
      apiKey: process.env.NOTION_API_KEY!,
      databaseId: process.env.NOTION_DATABASE_ID!
    });
    
    const notificationService = new NotificationService({
      slackWebhookUrl: process.env.SLACK_WEBHOOK_URL
    });
    
    const draftProcessor = new DraftProcessorService({
      maxTokens: AI_CONFIG.defaultMaxTokens,
      temperature: AI_CONFIG.defaultTemperature,
      model: AI_CONFIG.model
    }, notionService, notificationService);
    
    console.log('🔑 Environment check:', {
      NOTION_API_KEY: process.env.NOTION_API_KEY ? '✓ Present' : '✗ Missing',
      NOTION_DATABASE_ID: process.env.NOTION_DATABASE_ID ? '✓ Present' : '✗ Missing',
      WEBHOOK_SECRET: process.env.WEBHOOK_SECRET ? '✓ Present' : '✗ Missing'
    });
    
    console.log('📦 Parsing webhook payload');
    const payload = JSON.parse(event.body || '{}') as WebhookPayload;
    console.log('📄 Parsed payload:', payload);
    
    console.log('🔒 Validating webhook secret');
    const webhookSecret = event.headers['x-webhook-secret'];
    if (webhookSecret !== process.env.WEBHOOK_SECRET) {
      console.log('❌ Webhook secret mismatch');
      return {
        statusCode: 401,
        body: JSON.stringify({ message: 'Unauthorized' })
      };
    }

    // Validate payload structure
    if (!payload.data?.id) {
      console.log('❌ Invalid payload: missing pageId');
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Invalid payload: missing pageId' })
      };
    }

    // Process only the specific page
    console.log(`⚡ Processing draft variations for page ${payload.data.id}`);
    const page = await notionService.getPage(payload.data.id);
    if (!page) {
      console.log('❌ Page not found');
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Page not found' })
      };
    }

    const results = await draftProcessor.processDraft(page);
    
    console.log('✅ Draft processing completed:', results);
    return {
      statusCode: results.success ? 200 : 500,
      body: JSON.stringify({ 
        message: results.message,
        results,
        ...(results.error && { error: results.error })
      })
    };
  } catch (error) {
    console.error('❌ Error in webhook handler:', {
      error: error instanceof Error ? {
        message: error.message,
        stack: error.stack,
        name: error.name
      } : error
    });
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error', error: error instanceof Error ? error.message : 'Unknown error' })
    };
  }
}; 