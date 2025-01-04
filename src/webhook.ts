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

const notionConfig: NotionConfig = {
  apiKey: process.env.NOTION_API_KEY!,
  databaseId: process.env.NOTION_DATABASE_ID!
};

const notionService = new NotionService(notionConfig);
const webhookService = new WebhookService(notionService, process.env.WEBHOOK_SECRET!);

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    console.log('Webhook received:', {
      headers: event.headers,
      body: event.body,
      requestContext: event.requestContext
    });

    // Verify webhook secret
    const webhookSecret = event.headers['x-webhook-secret'];
    console.log('Webhook secret check:', {
      received: webhookSecret,
      expected: process.env.WEBHOOK_SECRET
    });

    if (webhookSecret !== process.env.WEBHOOK_SECRET) {
      console.log('Webhook secret mismatch');
      return {
        statusCode: 401,
        body: JSON.stringify({ message: 'Unauthorized' })
      };
    }

    // Parse and validate payload
    let payload: WebhookPayload;
    try {
      payload = JSON.parse(event.body || '{}') as WebhookPayload;
    } catch (error) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'Invalid JSON payload'
        })
      };
    }

    const payloadValidation = webhookService.validatePayload(payload);
    if (!payloadValidation.isValid) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: payloadValidation.error || 'Invalid payload'
        })
      };
    }

    // Process the webhook
    const result = await webhookService.processWebhook(payload);

    return {
      statusCode: result.success ? 200 : 500,
      body: JSON.stringify(result)
    };
  } catch (error) {
    console.error('Webhook handler error:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    };
  }
}; 