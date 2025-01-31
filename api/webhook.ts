import { NextRequest, NextResponse } from 'next/server';
import { NotionService } from '../src/services/notion.service';
import { DraftProcessorService } from '../src/services/draft-processor.service';
import { NotificationService } from '../src/services/notification.service';
import { AI_CONFIG } from '../src/config/ai.config';

export const config = {
  runtime: 'edge'
};

export default async function handler(
  req: NextRequest
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
  }

  try {
    // Verify webhook secret
    const secret = req.headers.get('x-webhook-secret');
    if (secret !== process.env.WEBHOOK_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Initialize services
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

    // Process the webhook payload
    const payload = await req.json();
    await draftProcessor.handleWebhook(payload);

    return NextResponse.json({
      status: 'success',
      message: 'Webhook processed successfully'
    }, { status: 202 });
  } catch (error) {
    console.error('Webhook processing failed:', error);
    return NextResponse.json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Internal server error'
    }, { status: 500 });
  }
} 