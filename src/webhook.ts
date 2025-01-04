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
import { DraftProcessorService } from './services/draft-processor.service';
import { AI_CONFIG } from './config/ai.config';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log('Webhook handler started');
  console.log('Event:', JSON.stringify(event, null, 2));
  
  try {
    console.log('Initializing services');
    const notionService = new NotionService({
      apiKey: process.env.NOTION_API_KEY!,
      databaseId: process.env.NOTION_DATABASE_ID!
    });
    
    const draftProcessor = new DraftProcessorService({
      maxTokens: AI_CONFIG.defaultMaxTokens,
      temperature: AI_CONFIG.defaultTemperature,
      model: AI_CONFIG.model
    }, notionService);
    
    const webhookService = new WebhookService(notionService, process.env.WEBHOOK_SECRET!);
    
    console.log('Parsing webhook payload');
    const payload = JSON.parse(event.body || '{}') as WebhookPayload;
    
    console.log('Validating webhook secret');
    const webhookSecret = event.headers['x-webhook-secret'];
    if (webhookSecret !== process.env.WEBHOOK_SECRET) {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: 'Unauthorized' })
      };
    }
    
    console.log('Processing draft variations');
    const results = await draftProcessor.processAllDrafts();
    
    console.log('Draft processing completed:', results);
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        message: 'Successfully processed drafts',
        results 
      })
    };
  } catch (error) {
    console.error('Error in webhook handler:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error', error: error instanceof Error ? error.message : 'Unknown error' })
    };
  }
}; 