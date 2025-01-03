/**
 * Tweet Draft Processor Testing Script
 * 
 * This script tests the AI-powered draft processing functionality locally.
 * It processes draft tweets from Notion, generates variations using AI,
 * and updates the Notion database with the results.
 * 
 * Features Tested:
 * 1. Draft Tweet Retrieval: Gets drafts from Notion
 * 2. AI Processing: Uses OpenAI to generate tweet variations
 * 3. Notion Updates: Saves generated variations back to Notion
 * 4. Error Handling: Tests error cases and recovery
 * 
 * AI Configuration:
 * - Model: Uses the model specified in AI_CONFIG
 * - Max Tokens: Configured in AI_CONFIG
 * - Temperature: Controls creativity level
 * 
 * Usage:
 * - Run with: npm run test:drafts
 * - Requires .env file with OPENAI_API_KEY and NOTION credentials
 * 
 * Related Files:
 * - services/draft-processor.service.ts: Core draft processing logic
 * - services/ai.service.ts: OpenAI integration
 * - config/ai.config.ts: AI model configuration
 * 
 * Note: This is a testing script, not used in production
 */

import { config } from 'dotenv';
import { NotionService } from '../services/notion.service';
import { DraftProcessorService } from '../services/draft-processor.service';
import { DraftProcessorConfig } from '../types/draft-processor.types';
import { AI_CONFIG } from '../config/ai.config';

// Load environment variables
config();

async function main() {
  try {
    // Initialize services
    const notionService = new NotionService({
      apiKey: process.env.NOTION_API_KEY || '',
      databaseId: process.env.NOTION_DATABASE_ID || ''
    });

    const draftProcessorConfig: DraftProcessorConfig = {
      model: AI_CONFIG.model,
      maxTokens: AI_CONFIG.defaultMaxTokens,
      temperature: AI_CONFIG.defaultTemperature
    };

    const draftProcessor = new DraftProcessorService(draftProcessorConfig, notionService);

    console.log('Starting draft processing...');

    // Process all drafts
    const results = await draftProcessor.processAllDrafts();

    // Log results
    console.log('Processing completed. Results:');
    results.forEach((result, index) => {
      console.log(`\nDraft ${index + 1}:`);
      console.log('Success:', result.success);
      console.log('Message:', result.message);
      if (result.error) {
        console.error('Error:', result.error);
      }
      if (result.variations) {
        console.log('\nVariations:');
        result.variations.forEach((variation, i) => {
          console.log(`${i + 1}. ${variation}`);
        });
      }
    });

  } catch (error) {
    console.error('Failed to process drafts:', error);
    process.exit(1);
  }
}

main(); 