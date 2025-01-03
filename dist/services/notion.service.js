"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotionService = void 0;
const client_1 = require("@notionhq/client");
class NotionService {
    constructor(config) {
        this.client = new client_1.Client({ auth: config.apiKey });
        this.databaseId = config.databaseId;
    }
    async getPageBlocks(pageId) {
        try {
            console.log(`🔍 Fetching blocks for page ${pageId}...`);
            const response = await this.client.blocks.children.list({
                block_id: pageId
            });
            console.log(`📦 Found ${response.results.length} blocks`);
            return response.results;
        }
        catch (error) {
            console.error('Failed to fetch page blocks:', error);
            throw error;
        }
    }
    async extractThreadContent(pageId) {
        const blocks = await this.getPageBlocks(pageId);
        const tweets = [];
        let currentTweet = [];
        console.log('🧵 Extracting thread content from blocks...');
        for (const block of blocks) {
            if (block.type === 'divider') {
                // When we hit a divider, join the current tweet content and add it to tweets
                if (currentTweet.length > 0) {
                    const tweetContent = currentTweet.join('\n').trim();
                    console.log('📝 Adding tweet:', tweetContent);
                    tweets.push(tweetContent);
                    currentTweet = [];
                }
            }
            else if (block.type === 'paragraph') {
                const richText = block.paragraph?.rich_text;
                if (richText && richText.length > 0) {
                    // Add paragraph content to current tweet
                    const text = richText
                        .map(rt => rt.plain_text)
                        .join('')
                        .trim();
                    if (text.length > 0) {
                        console.log('📄 Adding paragraph:', text);
                        currentTweet.push(text);
                    }
                }
            }
        }
        // Don't forget the last tweet if it exists
        if (currentTweet.length > 0) {
            const tweetContent = currentTweet.join('\n').trim();
            console.log('📝 Adding final tweet:', tweetContent);
            tweets.push(tweetContent);
        }
        // Filter out any empty tweets
        const filteredTweets = tweets.filter(tweet => tweet.length > 0);
        console.log(`✅ Extracted ${filteredTweets.length} tweets from thread`);
        return filteredTweets;
    }
    async getReadyTweets() {
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
                        direction: 'ascending'
                    }
                ]
            };
            console.log('📤 Query:', JSON.stringify(query, null, 2));
            const response = await this.client.databases.query(query);
            console.log('📥 Raw response:', JSON.stringify(response, null, 2));
            console.log(`📝 Found ${response.results.length} pages with Ready To Publish status`);
            const tweets = await Promise.all(response.results
                .filter((page) => 'properties' in page)
                .map(async (page) => {
                const properties = page.properties;
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
                    const threadContent = await this.extractThreadContent(page.id);
                    console.log('📝 Thread tweets:', threadContent);
                    content = threadContent.join('\n');
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
            }));
            // Filter out null values (tweets scheduled for future)
            const readyTweets = tweets.filter((tweet) => tweet !== null);
            console.log(`📊 Found ${readyTweets.length} tweets ready to publish now`);
            return readyTweets;
        }
        catch (error) {
            console.error('Failed to fetch ready tweets from Notion:', error);
            throw error;
        }
    }
    async updateTweetStatus(pageId, status, url, error) {
        const properties = {
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
    async validateDatabaseSchema() {
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
            const missingProperties = requiredProperties.filter(prop => {
                const exists = prop in database.properties;
                if (!exists) {
                    console.log(`❌ Missing property: ${prop}`);
                }
                return !exists;
            });
            if (missingProperties.length > 0) {
                throw new Error(`Missing required properties in Notion database: ${missingProperties.join(', ')}`);
            }
            // Validate Status property has correct options
            console.log('🔍 Validating Status property...');
            const statusProperty = database.properties['Status'];
            if (statusProperty.type !== 'select') {
                throw new Error('Status property must be a select type');
            }
            // Validate Thread property is a checkbox
            console.log('🔍 Validating Thread property...');
            const threadProperty = database.properties['Thread'];
            if (threadProperty.type !== 'checkbox') {
                throw new Error('Thread property must be a checkbox type');
            }
            const requiredStatuses = ['Draft', 'Ready To Publish', 'Published', 'Failed to Post'];
            const availableStatuses = statusProperty.select.options.map((opt) => opt.name);
            console.log('📋 Available statuses:', availableStatuses);
            const missingStatuses = requiredStatuses.filter(status => !availableStatuses.includes(status));
            if (missingStatuses.length > 0) {
                throw new Error(`Missing required status options: ${missingStatuses.join(', ')}`);
            }
            // Validate property types
            console.log('🔍 Validating property types...');
            // URL property
            const urlProperty = database.properties['URL'];
            console.log('URL property type:', urlProperty.type);
            if (urlProperty.type !== 'url') {
                throw new Error('URL property must be a URL type');
            }
            // Date properties
            const scheduledTimeProperty = database.properties['Scheduled Time'];
            const publishedDateProperty = database.properties['Published Date'];
            console.log('Scheduled Time property type:', scheduledTimeProperty.type);
            console.log('Published Date property type:', publishedDateProperty.type);
            if (scheduledTimeProperty.type !== 'date') {
                throw new Error('Scheduled Time property must be a date type');
            }
            if (publishedDateProperty.type !== 'date') {
                throw new Error('Published Date property must be a date type');
            }
            console.log('✅ All database schema validations passed');
        }
        catch (error) {
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
    async getInputConfig() {
        try {
            const inputPageId = process.env.NOTION_INPUT_PAGE_ID;
            if (!inputPageId) {
                throw new Error('NOTION_INPUT_PAGE_ID environment variable is not set');
            }
            const response = await this.client.blocks.children.list({
                block_id: inputPageId
            });
            const blocks = response.results;
            let currentSection = '';
            const config = {
                profile: '',
                interests: [],
                accountsToFollow: []
            };
            for (const block of blocks) {
                if (block.type === 'heading_2' && block.heading_2?.rich_text[0]) {
                    const heading = block.heading_2.rich_text[0].plain_text.toLowerCase();
                    if (heading === 'profile') {
                        currentSection = 'profile';
                    }
                    else if (heading === 'interests') {
                        currentSection = 'interests';
                    }
                    else if (heading === 'accounts to follow') {
                        currentSection = 'accountsToFollow';
                    }
                }
                else if (block.type === 'paragraph' && block.paragraph?.rich_text[0]) {
                    const text = block.paragraph.rich_text[0].plain_text.trim();
                    if (text) {
                        if (currentSection === 'profile') {
                            config.profile += (config.profile ? '\n' : '') + text;
                        }
                        else if (currentSection === 'interests') {
                            config.interests.push(text);
                        }
                        else if (currentSection === 'accountsToFollow') {
                            if (text.startsWith('https://x.com/') || text.startsWith('https://twitter.com/')) {
                                config.accountsToFollow.push(text);
                            }
                        }
                    }
                }
            }
            return config;
        }
        catch (error) {
            console.error('Failed to fetch input configuration:', error);
            throw error;
        }
    }
    async createAnalysisEntry(title, markdown, sourceUrls) {
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
        }
        catch (error) {
            console.error('Failed to create analysis entry:', error);
            throw error;
        }
    }
    convertMarkdownToBlocks(markdown) {
        const blocks = [];
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
            const processLinks = (text) => {
                const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
                const parts = [];
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
            }
            else if (line.startsWith('## ')) {
                // Heading 2
                blocks.push({
                    object: 'block',
                    type: 'heading_2',
                    heading_2: {
                        rich_text: processLinks(line.slice(3))
                    }
                });
            }
            else if (line.startsWith('- ')) {
                // Bullet point
                blocks.push({
                    object: 'block',
                    type: 'bulleted_list_item',
                    bulleted_list_item: {
                        rich_text: processLinks(line.slice(2))
                    }
                });
            }
            else if (line.startsWith('**') && line.endsWith('**')) {
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
            }
            else if (line === '---') {
                // Divider
                blocks.push({
                    object: 'block',
                    type: 'divider',
                    divider: {}
                });
            }
            else {
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
    async getDrafts() {
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
                .filter((page) => 'properties' in page)
                .map(page => {
                const properties = page.properties;
                const titleProperty = properties.Idea;
                if (!titleProperty || !Array.isArray(titleProperty.title)) {
                    console.warn(`Page ${page.id} has invalid Idea property`);
                    return {
                        id: page.id,
                        title: 'Untitled',
                        status: 'Draft'
                    };
                }
                const title = titleProperty.title[0]?.plain_text || 'Untitled';
                console.log(`Found draft: "${title}"`);
                return {
                    id: page.id,
                    title: title,
                    status: 'Draft'
                };
            })
                .filter(draft => draft.title !== 'Untitled');
        }
        catch (error) {
            console.error('Failed to get drafts:', error);
            throw error;
        }
    }
    async updateDraftWithVariations(pageId, variations) {
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
                object: 'block',
                type: 'paragraph',
                paragraph: {
                    rich_text: [{
                            type: 'text',
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
                        object: 'block',
                        type: 'heading_2',
                        heading_2: {
                            rich_text: [{
                                    type: 'text',
                                    text: {
                                        content: 'Tweet Variations'
                                    }
                                }]
                        }
                    },
                    ...blocks
                ]
            });
        }
        catch (error) {
            console.error('Failed to update draft with variations:', error);
            throw error;
        }
    }
}
exports.NotionService = NotionService;
//# sourceMappingURL=notion.service.js.map