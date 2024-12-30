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
              property: 'Scheduled Time',
              date: {
                on_or_before: now.toISOString()
              }
            }
          ]
        },
        sorts: [
          {
            property: 'Scheduled Time',
            direction: 'ascending'
          }
        ]
      });

      return response.results
        .filter((page): page is PageObjectResponse => 'properties' in page)
        .map(page => {
          const properties = page.properties as any;
          return {
            id: page.id,
            content: properties.Name.title[0]?.plain_text || '',
            scheduledTime: new Date(properties['Scheduled Time'].date?.start || now.toISOString()),
            status: properties.Status.select?.name || 'Draft',
            effort: properties.Effort?.select?.name,
            engagement: properties.Engagement?.select?.name
          };
        });
    } catch (error) {
      console.error('Failed to fetch ready tweets from Notion:', error);
      throw error;
    }
  }

  async updateTweetStatus(pageId: string, status: NotionTweet['status'], url?: string): Promise<void> {
    const properties: any = {
      'Status': {
        select: {
          name: status
        }
      }
    };

    if (status === 'Published') {
      properties['URL'] = {
        url: url
      };
      properties['Published Date'] = {
        date: {
          start: new Date().toISOString()
        }
      };
    }

    await this.client.pages.update({
      page_id: pageId,
      properties
    });
  }

  async validateDatabaseSchema(): Promise<void> {
    try {
      console.log('🔍 Retrieving database schema...');
      const database = await this.client.databases.retrieve({
        database_id: this.databaseId
      });

      console.log('📊 Database properties found:', Object.keys(database.properties));
      console.log('🔎 Detailed properties:', JSON.stringify(database.properties, null, 2));

      const requiredProperties = [
        'Status',
        'Scheduled Time',
        'Name',
        'URL',
        'Published Date',
        'Effort',
        'Engagement'
      ];
      
      console.log('📋 Required properties:', requiredProperties);
      
      const missingProperties = requiredProperties.filter(
        prop => {
          const exists = prop in database.properties;
          if (!exists) {
            console.log(`❌ Missing property: ${prop}`);
          }
          return !exists;
        }
      );

      if (missingProperties.length > 0) {
        throw new Error(
          `Missing required properties in Notion database: ${missingProperties.join(', ')}`
        );
      }

      // Validate Status property has correct options
      console.log('🔍 Validating Status property...');
      const statusProperty = database.properties['Status'] as any;
      if (statusProperty.type !== 'select') {
        throw new Error('Status property must be a select type');
      }

      const requiredStatuses = ['Draft', 'Ready To Publish', 'Published', 'Failed to Post'];
      const availableStatuses = statusProperty.select.options.map(
        (opt: any) => opt.name
      );

      console.log('📋 Available statuses:', availableStatuses);

      const missingStatuses = requiredStatuses.filter(
        status => !availableStatuses.includes(status)
      );

      if (missingStatuses.length > 0) {
        throw new Error(
          `Missing required status options: ${missingStatuses.join(', ')}`
        );
      }

      // Validate property types
      console.log('🔍 Validating property types...');
      
      // URL property
      const urlProperty = database.properties['URL'] as any;
      console.log('URL property type:', urlProperty.type);
      if (urlProperty.type !== 'url') {
        throw new Error('URL property must be a URL type');
      }

      // Date properties
      const scheduledTimeProperty = database.properties['Scheduled Time'] as any;
      const publishedDateProperty = database.properties['Published Date'] as any;
      
      console.log('Scheduled Time property type:', scheduledTimeProperty.type);
      console.log('Published Date property type:', publishedDateProperty.type);
      
      if (scheduledTimeProperty.type !== 'date') {
        throw new Error('Scheduled Time property must be a date type');
      }
      if (publishedDateProperty.type !== 'date') {
        throw new Error('Published Date property must be a date type');
      }

      // Remove Type validation since it's not in the database
      console.log('✅ All database schema validations passed');
    } catch (error) {
      console.error('Failed to validate database schema:', error);
      if (error instanceof Error) {
        console.error('Error details:', {
          message: error.message,
          stack: error.stack
        });
      }
      throw error;
    }
  }
} 