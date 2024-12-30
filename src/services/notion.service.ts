import { Client } from '@notionhq/client';
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { NotionTweet, NotionConfig, NotionBlock, NotionInputConfig, NotionInputBlock } from '../types/notion.types';

export class NotionService {
  private client: Client;
  private databaseId: string;

  constructor(config: NotionConfig) {
    this.client = new Client({ auth: config.apiKey });
    this.databaseId = config.databaseId;
  }

  private async getPageBlocks(pageId: string): Promise<NotionBlock[]> {
    try {
      const response = await this.client.blocks.children.list({
        block_id: pageId
      });
      
      return response.results as NotionBlock[];
    } catch (error) {
      console.error('Failed to fetch page blocks:', error);
      throw error;
    }
  }

  private async extractThreadContent(pageId: string): Promise<string[]> {
    const blocks = await this.getPageBlocks(pageId);
    const tweets: string[] = [];
    let currentTweet: string[] = [];

    for (const block of blocks) {
      if (block.type === 'divider') {
        // When we hit a divider, join the current tweet content and add it to tweets
        if (currentTweet.length > 0) {
          tweets.push(currentTweet.join('\n').trim());
          currentTweet = [];
        }
      } else if (block.type === 'paragraph') {
        const richText = block.paragraph?.rich_text;
        if (richText && richText.length > 0) {
          // Add paragraph content to current tweet
          const text = richText
            .map(rt => rt.plain_text)
            .join('')
            .trim();
          
          if (text.length > 0) {
            currentTweet.push(text);
          }
        }
      }
    }

    // Don't forget the last tweet if it exists
    if (currentTweet.length > 0) {
      tweets.push(currentTweet.join('\n').trim());
    }

    // Filter out any empty tweets
    return tweets.filter(tweet => tweet.length > 0);
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

      const tweets = await Promise.all(
        response.results
          .filter((page): page is PageObjectResponse => 'properties' in page)
          .map(async page => {
            const properties = page.properties as any;
            const isThread = properties.Thread?.checkbox || false;
            const title = properties.Name.title[0]?.plain_text || '';
            
            let content = title;
            if (isThread) {
              // For threads, we'll get the content from the page blocks
              const threadContent = await this.extractThreadContent(page.id);
              content = threadContent.join('\n');
            }

            return {
              id: page.id,
              title,
              content,
              isThread,
              scheduledTime: new Date(properties['Scheduled Time'].date?.start || now.toISOString()),
              status: properties.Status.select?.name || 'Draft',
              effort: properties.Effort?.select?.name,
              engagement: properties.Engagement?.select?.name
            };
          })
      );

      return tweets;
    } catch (error) {
      console.error('Failed to fetch ready tweets from Notion:', error);
      throw error;
    }
  }

  async updateTweetStatus(pageId: string, status: NotionTweet['status'], url?: string, error?: string): Promise<void> {
    const properties: any = {
      'Status': {
        select: {
          name: status
        }
      }
    };

    if (status === 'Published' && url) {
      properties['URL'] = {
        url: url
      };
      properties['Published Date'] = {
        date: {
          start: new Date().toISOString()
        }
      };
    }

    if (status === 'Failed to Post' && error) {
      properties['Error'] = {
        rich_text: [{
          type: 'text',
          text: {
            content: error
          }
        }]
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
        'Engagement',
        'Thread'
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

      // Validate Thread property is a checkbox
      console.log('🔍 Validating Thread property...');
      const threadProperty = database.properties['Thread'] as any;
      if (threadProperty.type !== 'checkbox') {
        throw new Error('Thread property must be a checkbox type');
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

  async getInputConfig(): Promise<NotionInputConfig> {
    try {
      const inputPageId = process.env.NOTION_INPUT_PAGE_ID;
      if (!inputPageId) {
        throw new Error('NOTION_INPUT_PAGE_ID environment variable is not set');
      }

      const response = await this.client.blocks.children.list({
        block_id: inputPageId
      });

      const blocks = response.results as NotionInputBlock[];
      
      let currentSection = '';
      const config: NotionInputConfig = {
        profile: '',
        interests: [],
        accountsToFollow: []
      };

      for (const block of blocks) {
        if (block.type === 'heading_2' && block.heading_2?.rich_text[0]) {
          const heading = block.heading_2.rich_text[0].plain_text.toLowerCase();
          if (heading === 'profile') {
            currentSection = 'profile';
          } else if (heading === 'interests') {
            currentSection = 'interests';
          } else if (heading === 'accounts to follow') {
            currentSection = 'accountsToFollow';
          }
        } else if (block.type === 'paragraph' && block.paragraph?.rich_text[0]) {
          const text = block.paragraph.rich_text[0].plain_text.trim();
          if (text) {
            if (currentSection === 'profile') {
              config.profile += (config.profile ? '\n' : '') + text;
            } else if (currentSection === 'interests') {
              config.interests.push(text);
            } else if (currentSection === 'accountsToFollow') {
              if (text.startsWith('https://x.com/') || text.startsWith('https://twitter.com/')) {
                config.accountsToFollow.push(text);
              }
            }
          }
        }
      }

      return config;
    } catch (error) {
      console.error('Failed to fetch input configuration:', error);
      throw error;
    }
  }

  async createAnalysisEntry(title: string, markdown: string, sourceUrls: string[]): Promise<void> {
    try {
      const analysisDatabaseId = process.env.NOTION_ANALYSIS_DATABASE_ID;
      if (!analysisDatabaseId) {
        throw new Error('NOTION_ANALYSIS_DATABASE_ID environment variable is not set');
      }

      // Format current date and time
      const now = new Date();
      const formattedDateTime = now.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });

      // Create the page with only the title
      const response = await this.client.pages.create({
        parent: {
          database_id: analysisDatabaseId
        },
        properties: {
          'Name': {
            title: [
              {
                text: {
                  content: `Twitter Analysis - ${formattedDateTime}`
                }
              }
            ]
          }
        }
      });

      // Convert markdown to Notion blocks
      const blocks = this.convertMarkdownToBlocks(markdown);

      // Add the content as blocks
      await this.client.blocks.children.append({
        block_id: response.id,
        children: blocks
      });
    } catch (error) {
      console.error('Failed to create analysis entry:', error);
      throw error;
    }
  }

  private convertMarkdownToBlocks(markdown: string): any[] {
    const blocks: any[] = [];
    const lines = markdown.split('\n');
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) {
        // Add empty lines as paragraphs
        blocks.push({
          object: 'block',
          type: 'paragraph',
          paragraph: {
            rich_text: []
          }
        });
        continue;
      }

      // Convert markdown links to Notion format
      const processLinks = (text: string) => {
        const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
        const parts: { type: 'text' | 'link'; content: string; url?: string }[] = [];
        let lastIndex = 0;
        let match;

        while ((match = linkRegex.exec(text)) !== null) {
          // Add text before the link
          if (match.index > lastIndex) {
            parts.push({
              type: 'text',
              content: text.slice(lastIndex, match.index)
            });
          }

          // Add the link
          parts.push({
            type: 'link',
            content: match[1],
            url: match[2]
          });

          lastIndex = match.index + match[0].length;
        }

        // Add remaining text
        if (lastIndex < text.length) {
          parts.push({
            type: 'text',
            content: text.slice(lastIndex)
          });
        }

        return parts.map(part => ({
          type: 'text',
          text: { content: part.content },
          ...(part.type === 'link' ? { href: part.url } : {})
        }));
      };

      if (line.startsWith('# ')) {
        // Heading 1
        blocks.push({
          object: 'block',
          type: 'heading_1',
          heading_1: {
            rich_text: processLinks(line.slice(2))
          }
        });
      } else if (line.startsWith('## ')) {
        // Heading 2
        blocks.push({
          object: 'block',
          type: 'heading_2',
          heading_2: {
            rich_text: processLinks(line.slice(3))
          }
        });
      } else if (line.startsWith('- ')) {
        // Bullet point
        blocks.push({
          object: 'block',
          type: 'bulleted_list_item',
          bulleted_list_item: {
            rich_text: processLinks(line.slice(2))
          }
        });
      } else if (line.startsWith('**') && line.endsWith('**')) {
        // Bold text as a paragraph
        blocks.push({
          object: 'block',
          type: 'paragraph',
          paragraph: {
            rich_text: [{
              type: 'text',
              text: { content: line.replace(/\*\*/g, '') },
              annotations: { bold: true }
            }]
          }
        });
      } else if (line === '---') {
        // Divider
        blocks.push({
          object: 'block',
          type: 'divider',
          divider: {}
        });
      } else {
        // Regular paragraph
        blocks.push({
          object: 'block',
          type: 'paragraph',
          paragraph: {
            rich_text: processLinks(line)
          }
        });
      }
    }

    return blocks;
  }
} 