"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotionService = void 0;
const client_1 = require("@notionhq/client");
class NotionService {
    constructor(config) {
        this.client = new client_1.Client({ auth: config.apiKey });
        this.databaseId = config.databaseId;
    }
    async getReadyTweets() {
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
                .filter((page) => 'properties' in page)
                .map(page => {
                const title = page.properties.Name;
                const publicationDate = page.properties['Publication Date'];
                const status = page.properties.Status;
                const url = page.properties.URL;
                return {
                    id: page.id,
                    content: title.title[0].plain_text,
                    publicationDate: publicationDate?.date?.start ? new Date(publicationDate.date.start) : new Date(),
                    status: status.select.name,
                    url: url?.url || undefined
                };
            });
        }
        catch (error) {
            console.error('Failed to fetch ready tweets from Notion:', error);
            throw error;
        }
    }
    async updateTweetStatus(tweetId, status, url) {
        try {
            const updateData = {
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
        }
        catch (error) {
            console.error(`Failed to update tweet status in Notion:`, error);
            throw error;
        }
    }
    async validateDatabaseSchema() {
        try {
            const database = await this.client.databases.retrieve({
                database_id: this.databaseId
            });
            const requiredProperties = ['Status', 'Publication Date', 'Name', 'URL'];
            const missingProperties = requiredProperties.filter(prop => !(prop in database.properties));
            if (missingProperties.length > 0) {
                throw new Error(`Missing required properties in Notion database: ${missingProperties.join(', ')}`);
            }
            // Validate Status property has correct options
            const statusProperty = database.properties['Status'];
            if (statusProperty.type !== 'select') {
                throw new Error('Status property must be a select type');
            }
            const requiredStatuses = ['Draft', 'Ready To Publish', 'Published', 'Failed to Post'];
            const availableStatuses = statusProperty.select.options.map((opt) => opt.name);
            const missingStatuses = requiredStatuses.filter(status => !availableStatuses.includes(status));
            if (missingStatuses.length > 0) {
                throw new Error(`Missing required status options: ${missingStatuses.join(', ')}`);
            }
            // Validate URL property is url type
            const urlProperty = database.properties['URL'];
            if (urlProperty.type !== 'url') {
                throw new Error('URL property must be a URL type');
            }
        }
        catch (error) {
            console.error('Failed to validate database schema:', error);
            throw error;
        }
    }
}
exports.NotionService = NotionService;
