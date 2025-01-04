import { APIGatewayProxyEvent } from 'aws-lambda';
import { handler } from '../webhook';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const createMockEvent = (pageId: string): APIGatewayProxyEvent => ({
  body: JSON.stringify({
    pageId,
    action: 'button_clicked',
    timestamp: new Date().toISOString()
  }),
  headers: {
    'x-webhook-secret': process.env.WEBHOOK_SECRET || 'test-secret'
  },
  // Minimal mock implementation of other required properties
  httpMethod: 'POST',
  isBase64Encoded: false,
  path: '/webhook',
  queryStringParameters: null,
  multiValueQueryStringParameters: null,
  pathParameters: null,
  stageVariables: null,
  requestContext: {} as any,
  resource: '',
  multiValueHeaders: {}
});

async function testWebhook() {
  console.log('Starting local webhook test...');
  console.log('Environment variables loaded:', {
    NOTION_API_KEY: process.env.NOTION_API_KEY ? '✓ Present' : '✗ Missing',
    NOTION_DATABASE_ID: process.env.NOTION_DATABASE_ID ? '✓ Present' : '✗ Missing',
    WEBHOOK_SECRET: process.env.WEBHOOK_SECRET ? '✓ Present' : '✗ Missing'
  });

  try {
    // Create mock event with test page ID
    const mockEvent = createMockEvent(process.env.TEST_PAGE_ID || 'test-page-id');
    console.log('\nSending test webhook with payload:', JSON.stringify(mockEvent.body, null, 2));

    // Call handler
    const response = await handler(mockEvent);
    
    console.log('\nWebhook response:', {
      statusCode: response.statusCode,
      body: JSON.parse(response.body)
    });
  } catch (error) {
    console.error('\nTest failed:', error);
  }
}

// Run the test
testWebhook(); 