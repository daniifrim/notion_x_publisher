import { Client } from '@notionhq/client';
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { NotionTweet, NotionConfig, NotionBlock, NotionInputConfig, NotionInputBlock } from '../types/notion.types';
import { DraftTweet, TweetStatus } from '../types/draft-processor.types';

export class NotionService {
  private client: Client;
  private databaseId: string;

  constructor(config: NotionConfig) {
    this.client = new Client({ auth: config.apiKey });
    this.databaseId = config.databaseId;
  }

  private async getPageBlocks(pageId: string): Promise<NotionBlock[]> {
    try {
      console.log(`🔍 Fetching blocks for page ${pageId}...`);
      const response = await this.client.blocks.children.list({
        block_id: pageId
      });
      
      console.log(`📦 Found ${response.results.length} blocks`);
      return response.results as NotionBlock[];
    } catch (error) {
      console.error('Failed to fetch page blocks:', error);
      throw error;
    }
  }

  private async extractTweetContent(page: any): Promise<string> {
    try {
      const blocks = await this.client.blocks.children.list({
        block_id: page.id
      });

      // For threads, join blocks with a separator
      if (page.properties['Thread']?.checkbox) {
        return blocks.results
          .map(block => {
            // Type guard for paragraph blocks
            if ('type' in block && block.type === 'paragraph' && 'paragraph' in block) {
              return block.paragraph.rich_text
                .map((text: { plain_text: string }) => text.plain_text)
                .join('');
            }
            return '';
          })
          .filter(text => text.length > 0)
          .join('\n\n---\n\n');
      }

      // For single tweets, join all blocks into one tweet
      return blocks.results
        .map(block => {
          // Type guard for paragraph blocks
          if ('type' in block && block.type === 'paragraph' && 'paragraph' in block) {
            return block.paragraph.rich_text
              .map((text: { plain_text: string }) => text.plain_text)
              .join('');
          }
          return '';
        })
        .filter(text => text.length > 0)
        .join('\n\n');
    } catch (error) {
      console.error('Failed to extract tweet content:', error);
      throw error;
    }
  }

  async getReadyTweets(): Promise<NotionTweet[]> {
    try {
      const now = new Date();
      console.log('🔍 Fetching tweets with status "Ready To Publish"...');
      
      // Query only by status first
      const query = {
        database_id: this.databaseId,
        filter: {
          property: 'Status',
          select: {
            equals: 'Ready To Publish'
          }
        },
        sorts: [
          {
            property: 'Scheduled Time',
            direction: 'ascending' as const
          }
        ]
      };

      console.log('📤 Query:', JSON.stringify(query, null, 2));
      const response = await this.client.databases.query(query);
      console.log('📥 Raw response:', JSON.stringify(response, null, 2));

      console.log(`📝 Found ${response.results.length} pages with Ready To Publish status`);
      
      const tweets = await Promise.all(
        response.results
          .filter((page): page is PageObjectResponse => 'properties' in page)
          .map(async page => {
            const properties = page.properties as any;
            const isThread = properties.Thread?.checkbox || false;
            const title = properties.Idea.title[0]?.plain_text || '';
            const scheduledTime = properties['Scheduled Time']?.date?.start;
            
            console.log(`\n📄 Processing page "${title}"`);
            console.log(`🧵 Is thread: ${isThread}`);
            console.log(`📅 Scheduled time: ${scheduledTime || 'Not set'}`);
            
            // Skip if has scheduled time and it's in the future
            if (scheduledTime) {
              const scheduleDate = new Date(scheduledTime);
              if (scheduleDate > now) {
                console.log(`⏳ Tweet scheduled for future: ${scheduleDate.toLocaleString()}`);
                return null;
              }
            }
            
            let content = title;
            if (isThread) {
              console.log('🔍 Getting thread content...');
              // For threads, we'll get the content from the page blocks
              const threadContent = await this.extractTweetContent(page);
              console.log('📝 Thread tweets:', threadContent);
              content = threadContent;
            }

            const tweet = {
              id: page.id,
              title,
              content,
              isThread,
              scheduledTime: scheduledTime ? new Date(scheduledTime) : now,
              status: properties.Status.select?.name || 'Draft',
              effort: properties.Effort?.select?.name,
              engagement: properties.Engagement?.select?.name
            };

            console.log('✅ Processed tweet:', tweet);
            return tweet;
          })
      );

      // Filter out null values (tweets scheduled for future)
      const readyTweets = tweets.filter((tweet): tweet is NonNullable<typeof tweet> => tweet !== null);
      console.log(`📊 Found ${readyTweets.length} tweets ready to publish now`);

      return readyTweets;
    } catch (error) {
      console.error('Failed to fetch ready tweets from Notion:', error);
      throw error;
    }
  }

  async updateTweetStatus(pageId: string, status: NotionTweet['status'], url?: string, error?: string): Promise<void> {
    const properties: any = {
      'Status': {
        status: {
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
        'Idea',
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

      // Validate Status property
      console.log('🔍 Validating Status property...');
      const statusProperty = database.properties['Status'] as any;
      if (statusProperty.type !== 'status') {
        throw new Error('Status property must be a status type');
      }

      const requiredStatuses = ['Draft', 'Processed', 'Ready To Publish', 'Published', 'Failed to Post'];
      const availableStatuses = statusProperty.status.options.map(
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

  async getDrafts(): Promise<DraftTweet[]> {
    try {
      const response = await this.client.databases.query({
        database_id: this.databaseId,
        filter: {
          property: 'Status',
          select: {
            equals: 'Draft'
          }
        }
      });

      return response.results
        .filter((page): page is PageObjectResponse => 'properties' in page)
        .map(page => {
          const properties = page.properties as Record<string, any>;
          const titleProperty = properties.Idea;
          
          if (!titleProperty || !Array.isArray(titleProperty.title)) {
            console.warn(`Page ${page.id} has invalid Idea property`);
            return {
              id: page.id,
              title: 'Untitled',
              status: 'Draft' as TweetStatus
            };
          }

          const title = titleProperty.title[0]?.plain_text || 'Untitled';
          console.log(`Found draft: "${title}"`);
          
          return {
            id: page.id,
            title: title,
            status: 'Draft' as TweetStatus
          };
        })
        .filter(draft => draft.title !== 'Untitled');
    } catch (error) {
      console.error('Failed to get drafts:', error);
      throw error;
    }
  }

  async updateDraftWithVariations(pageId: string, variations: string[]): Promise<void> {
    try {
      // First update the page status to 'AI Processed'
      await this.client.pages.update({
        page_id: pageId,
        properties: {
          'Status': {
            select: {
              name: 'AI Processed'
            }
          }
        }
      });

      // Then append the variations as blocks
      const blocks = variations.map(variation => ({
        object: 'block' as const,
        type: 'paragraph' as const,
        paragraph: {
          rich_text: [{
            type: 'text' as const,
            text: {
              content: variation
            }
          }]
        }
      }));

      await this.client.blocks.children.append({
        block_id: pageId,
        children: [
          {
            object: 'block' as const,
            type: 'heading_2' as const,
            heading_2: {
              rich_text: [{
                type: 'text' as const,
                text: {
                  content: 'Tweet Variations'
                }
              }]
            }
          },
          ...blocks
        ]
      });
    } catch (error) {
      console.error('Failed to update draft with variations:', error);
      throw error;
    }
  }
} 