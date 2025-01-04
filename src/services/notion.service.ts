/**
 * Notion Service
 * 
 * Handles interactions with the Notion API for database operations.
 * 
 */

import { Client } from '@notionhq/client';
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { NotionTweet, NotionConfig, NotionBlock, NotionStatus, NotionInputConfig, NotionInputBlock } from '../types/notion.types';
import { DraftTweet } from '../types/draft-processor.types';
import { NOTION_SCHEMA } from '../constants/notion.constants';

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

  private async extractTweetContent(page: any): Promise<{ content: string; imageUrls: string[] }> {
    try {
      const blocks = await this.client.blocks.children.list({
        block_id: page.id
      });

      const imageUrls: string[] = [];

      // For threads, join blocks with a separator
      if (page.properties['Thread']?.checkbox) {
        const content = blocks.results
          .map(block => {
            // Handle image blocks
            if ('type' in block && block.type === 'image') {
              if ('file' in block.image) {
                imageUrls.push(block.image.file.url);
              } else if ('external' in block.image) {
                imageUrls.push(block.image.external.url);
              }
              return '';
            }
            // Handle paragraph blocks
            if ('type' in block && block.type === 'paragraph' && 'paragraph' in block) {
              return block.paragraph.rich_text
                .map((text: { plain_text: string }) => text.plain_text)
                .join('');
            }
            return '';
          })
          .filter(text => text.length > 0)
          .join('\n\n---\n\n');

        return { content, imageUrls };
      }

      // For single tweets, join all blocks into one tweet
      const content = blocks.results
        .map(block => {
          // Handle image blocks
          if ('type' in block && block.type === 'image') {
            if ('file' in block.image) {
              imageUrls.push(block.image.file.url);
            } else if ('external' in block.image) {
              imageUrls.push(block.image.external.url);
            }
            return '';
          }
          // Handle paragraph blocks
          if ('type' in block && block.type === 'paragraph' && 'paragraph' in block) {
            return block.paragraph.rich_text
              .map((text: { plain_text: string }) => text.plain_text)
              .join('');
          }
          return '';
        })
        .filter(text => text.length > 0)
        .join('\n\n');

      return { content, imageUrls };
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
          status: {
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
              const { content: threadContent, imageUrls } = await this.extractTweetContent(page);
              console.log('📝 Thread tweets:', threadContent);
              content = threadContent;

              const tweet: NotionTweet = {
                id: page.id,
                title,
                content,
                isThread,
                scheduledTime: scheduledTime ? new Date(scheduledTime) : now,
                status: properties.Status.status?.name || 'Draft',
                images: imageUrls
              };

              console.log('✅ Processed tweet:', tweet);
              return tweet;
            }

            // For single tweets, get content and image
            const { content: tweetContent, imageUrls } = await this.extractTweetContent(page);
            const tweet: NotionTweet = {
              id: page.id,
              title,
              content: tweetContent || content, // Use extracted content if available, fallback to title
              isThread,
              scheduledTime: scheduledTime ? new Date(scheduledTime) : now,
              status: properties.Status.status?.name || 'Draft',
              images: imageUrls
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

  async updateTweetStatus(pageId: string, status: NotionStatus, url?: string, error?: string): Promise<void> {
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

      console.log('✅ Database schema validation completed successfully');
    } catch (error) {
      console.error('Failed to validate database schema:', error);
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
          status: {
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
              status: 'Draft' as NotionStatus
            };
          }

          const title = titleProperty.title[0]?.plain_text || 'Untitled';
          console.log(`Found draft: "${title}"`);
          
          return {
            id: page.id,
            title: title,
            status: 'Draft' as NotionStatus
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
      // First update the page status to 'Processed'
      await this.client.pages.update({
        page_id: pageId,
        properties: {
          'Status': {
            status: {
              name: 'Processed'
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

  async updateTweetVariations(pageId: string, variations: string[]): Promise<void> {
    try {
      console.log(`📝 Updating variations for page ${pageId}...`);
      
      // Format variations as blocks
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

      // First, add a heading for the variations
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
                  content: '🔄 Generated Variations'
                }
              }]
            }
          },
          ...blocks
        ]
      });

      console.log('✅ Variations updated successfully');
    } catch (error) {
      console.error('Failed to update variations:', error);
      throw error;
    }
  }

  async getDraftTweetsNotInThread(): Promise<NotionTweet[]> {
    try {
      console.log('🔍 Fetching draft tweets not in thread...');
      
      const response = await this.client.databases.query({
        database_id: this.databaseId,
        filter: {
          and: [
            {
              property: NOTION_SCHEMA.PROPERTIES.STATUS,
              status: {
                equals: NOTION_SCHEMA.STATUS_VALUES.DRAFT
              }
            },
            {
              property: NOTION_SCHEMA.PROPERTIES.THREAD,
              checkbox: {
                equals: false
              }
            }
          ]
        }
      });



      const tweets = await Promise.all(
        response.results
          .filter((page): page is PageObjectResponse => 'properties' in page)
          .map(async page => {
            const properties = page.properties as any;
            console.log(`\n🔍 Processing page ${page.id}`);
            console.log('📦 Properties:', JSON.stringify(properties, null, 2));
            
            const titleProperty = properties[NOTION_SCHEMA.PROPERTIES.TITLE];
            console.log('📝 Title property:', JSON.stringify(titleProperty, null, 2));
            
            const title = titleProperty?.title?.[0]?.plain_text || '';
            console.log('📌 Extracted title:', title);
            
            const { content, imageUrls } = await this.extractTweetContent(page);
            
            return {
              id: page.id,
              title,
              content,
              status: NOTION_SCHEMA.STATUS_VALUES.DRAFT as NotionStatus,
              scheduledTime: new Date(),
              isThread: false,
              images: imageUrls
            };
          })
      );

      console.log(`📊 Found ${tweets.length} draft tweets not in thread`);
      return tweets;
    } catch (error) {
      console.error('Failed to fetch draft tweets not in thread:', error);
      throw error;
    }
  }

  async getPageStatus(pageId: string): Promise<NotionStatus> {
    const page = await this.client.pages.retrieve({ page_id: pageId });
    const status = this.extractStatus(page);
    return status;
  }

  async getPageContent(pageId: string): Promise<string> {
    const blocks = await this.client.blocks.children.list({
      block_id: pageId,
      page_size: 50
    });

    let content = '';
    for (const block of blocks.results) {
      if ('paragraph' in block) {
        content += block.paragraph.rich_text.map(text => text.plain_text).join('') + '\n';
      }
    }

    return content.trim();
  }

  private extractStatus(page: any): NotionStatus {
    const statusProperty = page.properties?.[NOTION_SCHEMA.PROPERTIES.STATUS];
    if (!statusProperty?.select?.name) {
      return NOTION_SCHEMA.STATUS_VALUES.DRAFT;
    }
    return statusProperty.select.name as NotionStatus;
  }

  async getDraftById(pageId: string): Promise<DraftTweet | null> {
    try {
      const response = await this.client.pages.retrieve({
        page_id: pageId
      });

      if (!('properties' in response)) {
        console.warn(`Page ${pageId} has no properties`);
        return null;
      }

      const properties = response.properties as Record<string, any>;
      const titleProperty = properties[NOTION_SCHEMA.PROPERTIES.TITLE];
      
      if (!titleProperty || !Array.isArray(titleProperty.title)) {
        console.warn(`Page ${pageId} has invalid ${NOTION_SCHEMA.PROPERTIES.TITLE} property`);
        return null;
      }

      const title = titleProperty.title[0]?.plain_text || '';
      console.log(`Found draft: "${title}"`);
      
      return {
        id: pageId,
        title,
        status: NOTION_SCHEMA.STATUS_VALUES.DRAFT as NotionStatus
      };
    } catch (error) {
      console.error('Failed to get draft by ID:', error);
      throw error;
    }
  }

  /**
   * Gets a specific page from Notion by ID
   * @param pageId The ID of the page to retrieve
   * @returns The page object or null if not found
   */
  async getPage(pageId: string): Promise<PageObjectResponse | null> {
    try {
      const response = await this.client.pages.retrieve({ page_id: pageId });
      if (!('properties' in response)) {
        console.warn('Retrieved page has no properties');
        return null;
      }
      return response as PageObjectResponse;
    } catch (error) {
      console.error('Error getting page:', error);
      return null;
    }
  }

  /**
   * Updates a page's title in Notion
   * @param pageId The ID of the page to update
   * @param title The new title text
   */
  async updatePageTitle(pageId: string, title: string): Promise<void> {
    try {
      console.log(`📝 Updating title for page ${pageId}`);
      await this.client.pages.update({
        page_id: pageId,
        properties: {
          [NOTION_SCHEMA.PROPERTIES.TITLE]: {
            title: [
              {
                text: {
                  content: title
                }
              }
            ]
          }
        }
      });
      console.log('✅ Title updated successfully');
    } catch (error) {
      console.error('Failed to update page title:', error);
      throw error;
    }
  }
} 