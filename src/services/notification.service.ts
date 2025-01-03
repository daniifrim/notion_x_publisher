/**
 * Notification Service
 * 
 * Handles sending notifications through various channels (Slack, email)
 * for tweet status updates and errors.
 */

import { NotionTweet } from '../types/notion.types';

export interface NotificationConfig {
  slackWebhookUrl?: string;
  emailConfig?: {
    from: string;
    to: string;
    apiKey: string;
  };
}

export class NotificationService {
  private config: NotificationConfig;

  constructor(config: NotificationConfig) {
    this.config = config;
  }

  async notifyTweetPublished(tweet: NotionTweet): Promise<void> {
    const message = `✅ Tweet Published!\n\nTitle: ${tweet.title}\nURL: ${tweet.url}\nType: ${tweet.isThread ? 'Thread' : 'Single Tweet'}`;
    
    await this.sendNotification(message, 'success');
  }

  async notifyTweetError(tweet: NotionTweet, error: string): Promise<void> {
    const message = `❌ Tweet Failed!\n\nTitle: ${tweet.title}\nError: ${error}\nType: ${tweet.isThread ? 'Thread' : 'Single Tweet'}`;
    
    await this.sendNotification(message, 'error');
  }

  private async sendNotification(message: string, type: 'success' | 'error'): Promise<void> {
    if (this.config.slackWebhookUrl) {
      try {
        const emoji = type === 'success' ? ':white_check_mark:' : ':x:';
        const color = type === 'success' ? '#36a64f' : '#ff0000';

        const payload = {
          blocks: [
            {
              type: "section",
              text: {
                type: "mrkdwn",
                text: `${emoji} *Notion X Publisher Update*\n\n${message}`
              }
            }
          ],
          attachments: [
            {
              color: color,
              footer: "Notion X Publisher",
              footer_icon: "https://notion.so/favicon.ico",
              ts: Math.floor(Date.now() / 1000).toString()
            }
          ]
        };

        const response = await fetch(this.config.slackWebhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          console.error('Failed to send Slack notification:', await response.text());
        }
      } catch (error) {
        console.error('Error sending Slack notification:', error);
      }
    }

    // TODO: Add email notification support
    if (this.config.emailConfig) {
      // Implement email notifications using a service like SendGrid or AWS SES
    }
  }
} 