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
import { WebhookService } from './services/webhook.service';
import { WebhookPayload } from './types/webhook.types';
import { NotionService } from './services/notion.service';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log('Webhook handler started');
  console.log('Event:', JSON.stringify(event, null, 2));
  
  try {
    console.log('Initializing webhook service');
    const notionService = new NotionService({
      apiKey: process.env.NOTION_API_KEY!,
      databaseId: process.env.NOTION_DATABASE_ID!
    });
    const webhookService = new WebhookService(notionService, process.env.WEBHOOK_SECRET!);
    
    console.log('Parsing webhook payload');
    const payload = JSON.parse(event.body || '{}') as WebhookPayload;
    
    console.log('Processing webhook request');
    const result = await webhookService.processWebhook(payload);
    
    console.log('Webhook processing completed:', result);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Success' })
    };
  } catch (error) {
    console.error('Error in webhook handler:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error', error: error instanceof Error ? error.message : 'Unknown error' })
    };
  }
}; 