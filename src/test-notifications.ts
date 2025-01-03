/**
 * Notification Testing Script
 * 
 * This script tests the notification system independently of the tweet publishing process.
 * It sends test notifications to Slack to verify the configuration and message formatting.
 */

import * as dotenv from 'dotenv';
import { NotificationService } from './services/notification.service';
import { NotionTweet } from './types/notion.types';

// Load environment variables
dotenv.config();

async function main() {
  try {
    console.log('🔔 Testing notification system...\n');

    const notificationService = new NotificationService({
      slackWebhookUrl: process.env.SLACK_WEBHOOK_URL
    });

    // Test successful tweet notification
    const sampleTweet: NotionTweet = {
      id: 'test-id',
      title: 'Test Tweet',
      content: 'This is a test tweet content',
      status: 'Published',
      url: 'https://twitter.com/user/status/123456789',
      scheduledTime: new Date(),
      isThread: false
    };

    console.log('📤 Sending success notification...');
    await notificationService.notifyTweetPublished(sampleTweet);
    console.log('✅ Success notification sent\n');

    // Test error notification
    const failedTweet: NotionTweet = {
      id: 'test-error-id',
      title: 'Failed Test Tweet',
      content: 'This is a test tweet that failed',
      status: 'Failed to Post',
      scheduledTime: new Date(),
      isThread: true
    };

    console.log('📤 Sending error notification...');
    await notificationService.notifyTweetError(
      failedTweet,
      'Test error message: Rate limit exceeded'
    );
    console.log('✅ Error notification sent');

  } catch (error) {
    console.error('❌ Error testing notifications:', error);
  }
}

// Run the test
main().catch(console.error); 