/**
 * This file contains the AWS Lambda handler for processing webhook requests from Notion.
 * 
 * The handler performs the following tasks:
 * 1. Validates the webhook secret to ensure the request is authorized.
 * 2. Parses and validates the JSON payload received from Notion.
 * 3. Uses the NotionService to interact with the Notion API.
 * 4. Uses the WebhookService to handle the business logic for processing the webhook payload.
 * 
 * The handler responds with appropriate HTTP status codes and messages based on the success or failure of the operations.
 * 
 * Key Components:
 * - NotionService: A service for interacting with the Notion API.
 * - WebhookService: A service for handling webhook-specific logic, including validation and processing.
 * - NotionConfig: Configuration for the Notion API, including API key and database ID.
 * - WebhookPayload: Type definition for the expected structure of the webhook payload.
 */



import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { NotionService } from './services/notion.service';
import { WebhookService } from './services/webhook.service';
import { WebhookPayload } from './types/webhook.types';
import { NotionConfig } from './types/notion.types';

// Initialize only the services needed for webhook handling
const notionConfig: NotionConfig = {
  apiKey: process.env.NOTION_API_KEY!,
  databaseId: process.env.NOTION_DATABASE_ID!
};

// Only initialize services when they're needed
let notionService: NotionService | null = null;
let webhookService: WebhookService | null = null;

const initializeServices = () => {
  if (!notionService) {
    notionService = new NotionService(notionConfig);
  }
  if (!webhookService) {
    webhookService = new WebhookService(notionService, process.env.WEBHOOK_SECRET!);
  }
  return { notionService, webhookService };
};

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    console.log('🔍 Webhook received:', {
      headers: event.headers,
      body: event.body,
      path: event.path,
      httpMethod: event.httpMethod
    });

    // Initialize services
    const { webhookService } = initializeServices();

    // Verify webhook secret
    const webhookSecret = event.headers['x-webhook-secret'];
    console.log('🔑 Webhook secret check:', {
      received: webhookSecret,
      expected: process.env.WEBHOOK_SECRET,
      envVars: {
        NOTION_API_KEY: process.env.NOTION_API_KEY ? '✓ Present' : '✗ Missing',
        NOTION_DATABASE_ID: process.env.NOTION_DATABASE_ID ? '✓ Present' : '✗ Missing',
        WEBHOOK_SECRET: process.env.WEBHOOK_SECRET ? '✓ Present' : '✗ Missing'
      }
    });

    if (webhookSecret !== process.env.WEBHOOK_SECRET) {
      console.log('❌ Webhook secret mismatch');
      return {
        statusCode: 401,
        body: JSON.stringify({ 
          message: 'Unauthorized',
          error: 'Invalid webhook secret'
        })
      };
    }

    // Parse and validate payload
    let payload: WebhookPayload;
    try {
      payload = JSON.parse(event.body || '{}') as WebhookPayload;
      console.log('📦 Parsed payload:', payload);
    } catch (error) {
      console.error('❌ JSON parsing error:', error);
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'Invalid JSON payload',
          error: error instanceof Error ? error.message : 'Unknown parsing error'
        })
      };
    }

    const payloadValidation = webhookService.validatePayload(payload);
    console.log('🔍 Payload validation result:', payloadValidation);
    
    if (!payloadValidation.isValid) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'Invalid payload',
          error: payloadValidation.error
        })
      };
    }

    // Process the webhook
    console.log('⚡ Processing webhook for page:', payload.data.pageId);
    const result = await webhookService.processWebhook(payload);
    console.log('✅ Processing result:', result);

    return {
      statusCode: result.success ? 200 : 500,
      body: JSON.stringify(result)
    };
  } catch (error) {
    console.error('❌ Webhook handler error:', {
      error: error instanceof Error ? {
        message: error.message,
        stack: error.stack,
        name: error.name
      } : error,
      event: {
        path: event.path,
        httpMethod: event.httpMethod,
        headers: event.headers
      }
    });
    
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    };
  }
}; 