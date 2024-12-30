import { Client } from '@notionhq/client';
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { NotionTweet, NotionConfig } from '../types/notion.types';

export class NotionService {
  private client: Client;
  private databaseId: string;

  constructor(config: NotionConfig) {
    this.client = new Client({ auth: config.apiKey });
    this.databaseId = config.databaseId;
  }

  async getReadyTweets(): Promise<NotionTweet[]> {
    try {
      const now = new Date();
      const response = await this.client.databases.query({
        database_id: this.databaseId,
        filter: {
          and: [
            {
              property: 'Status',
              select: {
                equals: 'Ready To Publish'
              }
            },
            {
              property: 'Publication Date',
              date: {
                on_or_before: now.toISOString()
              }
            }
          ]
        },
        sorts: [
          {
            property: 'Publication Date',
            direction: 'ascending'
          }
        ]
      });

      return response.results
        .filter((page): page is PageObjectResponse => 'properties' in page)
        .map(page => {
          const title = page.properties.Name as {
            title: Array<{ plain_text: string }>
          };
          const publicationDate = page.properties['Publication Date'] as {
            date: { start: string } | null
          };
          const status = page.properties.Status as {
            select: { name: NotionTweet['status'] }
          };
          const url = page.properties.URL as {
            url: string | null
          };

          return {
            id: page.id,
            content: title.title[0].plain_text,
            publicationDate: publicationDate?.date?.start ? new Date(publicationDate.date.start) : new Date(),
            status: status.select.name,
            url: url?.url || undefined
          };
        });
    } catch (error) {
      console.error('Failed to fetch ready tweets from Notion:', error);
      throw error;
    }
  }

  async updateTweetStatus(tweetId: string, status: NotionTweet['status'], url?: string): Promise<void> {
    try {
      const updateData: any = {
        page_id: tweetId,
        properties: {
          Status: {
            select: {
              name: status
            }
          }
        }
      };

      if (url) {
        updateData.properties.URL = {
          url: url
        };
      }

      await this.client.pages.update(updateData);
    } catch (error) {
      console.error(`Failed to update tweet status in Notion:`, error);
      throw error;
    }
  }

  async validateDatabaseSchema(): Promise<void> {
    try {
      const database = await this.client.databases.retrieve({
        database_id: this.databaseId
      });

      const requiredProperties = ['Status', 'Publication Date', 'Name', 'URL'];
      const missingProperties = requiredProperties.filter(
        prop => !(prop in database.properties)
      );

      if (missingProperties.length > 0) {
        throw new Error(
          `Missing required properties in Notion database: ${missingProperties.join(', ')}`
        );
      }

      // Validate Status property has correct options
      const statusProperty = database.properties['Status'] as any;
      if (statusProperty.type !== 'select') {
        throw new Error('Status property must be a select type');
      }

      const requiredStatuses = ['Draft', 'Ready To Publish', 'Published', 'Failed to Post'];
      const availableStatuses = statusProperty.select.options.map(
        (opt: any) => opt.name
      );

      const missingStatuses = requiredStatuses.filter(
        status => !availableStatuses.includes(status)
      );

      if (missingStatuses.length > 0) {
        throw new Error(
          `Missing required status options: ${missingStatuses.join(', ')}`
        );
      }

      // Validate URL property is url type
      const urlProperty = database.properties['URL'] as any;
      if (urlProperty.type !== 'url') {
        throw new Error('URL property must be a URL type');
      }
    } catch (error) {
      console.error('Failed to validate database schema:', error);
      throw error;
    }
  }
} 