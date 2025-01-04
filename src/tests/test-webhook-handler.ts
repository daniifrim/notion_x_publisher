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

import { NotionService } from '../services/notion.service';
import { WebhookService } from '../services/webhook.service';
import { WebhookPayload } from '../types/webhook.types';
import { NotionConfig } from '../types/notion.types';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function main() {
  try {
    console.log('🚀 Starting webhook handler test...\n');

    // Debug: Check environment variables
    console.log('🔍 Checking environment variables...');
    const requiredEnvVars = ['NOTION_API_KEY', 'NOTION_DATABASE_ID'];
    const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);
    if (missingEnvVars.length > 0) {
      throw new Error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
    }
    console.log('✅ All required environment variables present\n');

    // Initialize services
    console.log('📦 Initializing services...');
    const notionConfig: NotionConfig = {
      apiKey: process.env.NOTION_API_KEY!,
      databaseId: process.env.NOTION_DATABASE_ID!
    };

    const notionService = new NotionService(notionConfig);
    const webhookSecret = process.env.WEBHOOK_SECRET || 'test-secret';
    console.log('🔑 Using webhook secret:', webhookSecret);
    const webhookService = new WebhookService(notionService, webhookSecret);

    // Test Notion connection
    console.log('\n🔍 Testing Notion connection...');
    try {
      await notionService.validateDatabaseSchema();
      console.log('✅ Database schema validation passed\n');
    } catch (error) {
      console.error('❌ Database schema validation failed:', error);
      return;
    }

    // Get a draft page to test with
    console.log('🔍 Finding a draft page to test with...');
    const drafts = await notionService.getDrafts();
    if (drafts.length === 0) {
      console.error('❌ No draft pages found in the database. Please create a draft page first.');
      return;
    }
    const testPage = drafts[0];
    console.log(`📝 Found draft page: "${testPage.title}" (${testPage.id})\n`);

    // Create test payload
    const testPayload: WebhookPayload = {
      event_type: 'databaseButtonClick',
      data: {
        pageId: testPage.id,
        buttonId: 'generate-variations'
      }
    };
    console.log('📦 Test payload:', JSON.stringify(testPayload, null, 2));

    // Test 1: Validate webhook secret
    console.log('\n🔒 Test 1: Validating webhook secret');
    const secretValidation = webhookService.validateWebhookSecret(webhookSecret);
    console.log('Result:', secretValidation);
    if (!secretValidation.isValid) {
      console.error('❌ Secret validation failed:', secretValidation.error);
      return;
    }
    console.log('✅ Secret validation passed\n');

    // Test 2: Validate payload
    console.log('📋 Test 2: Validating payload');
    const payloadValidation = webhookService.validatePayload(testPayload);
    console.log('Result:', payloadValidation);
    if (!payloadValidation.isValid) {
      console.error('❌ Payload validation failed:', payloadValidation.error);
      return;
    }
    console.log('✅ Payload validation passed\n');

    // Test 3: Process webhook
    console.log('⚡ Test 3: Processing webhook');
    try {
      console.log('Processing payload for page:', testPayload.data.pageId);
      const result = await webhookService.processWebhook(testPayload);
      console.log('Processing result:', JSON.stringify(result, null, 2));
      if (result.success) {
        console.log('✅ Webhook processing succeeded');
      } else {
        console.error('❌ Webhook processing failed:', result.error);
      }
    } catch (error) {
      console.error('❌ Error processing webhook:', error);
    }

    console.log('\n✨ Webhook handler test completed');
  } catch (error) {
    console.error('\n❌ Test failed:', error);
    process.exit(1);
  }
}

// Run the test
main().catch(console.error); 