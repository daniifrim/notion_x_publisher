"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const notion_service_1 = require("./services/notion.service");
const twitter_service_1 = require("./services/twitter.service");
class NotionXPublisher {
    constructor(notionConfig, twitterConfig) {
        this.notionService = new notion_service_1.NotionService(notionConfig);
        this.twitterService = new twitter_service_1.TwitterService(twitterConfig);
    }
    async initialize() {
        // Validate Notion database schema before proceeding
        await this.notionService.validateDatabaseSchema();
    }
    async processReadyTweets() {
        try {
            const readyTweets = await this.notionService.getReadyTweets();
            for (const tweet of readyTweets) {
                try {
                    const publishedTweet = await this.twitterService.postTweet(tweet.content);
                    await this.notionService.updateTweetStatus(tweet.id, 'Published', publishedTweet.text);
                }
                catch (error) {
                    console.error(`Failed to process tweet ${tweet.id}:`, error);
                    // Reset status back to draft if publishing fails
                    await this.notionService.updateTweetStatus(tweet.id, 'Draft');
                }
            }
        }
        catch (error) {
            console.error('Failed to process tweets:', error);
            throw error;
        }
    }
}
// AWS Lambda handler
const handler = async (event) => {
    try {
        const notionConfig = {
            databaseId: process.env.NOTION_DATABASE_ID,
            apiKey: process.env.NOTION_API_KEY
        };
        const twitterConfig = {
            apiKey: process.env.TWITTER_API_KEY,
            apiKeySecret: process.env.TWITTER_API_KEY_SECRET,
            accessToken: process.env.TWITTER_ACCESS_TOKEN,
            accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET
        };
        const publisher = new NotionXPublisher(notionConfig, twitterConfig);
        // Initialize and validate database schema
        await publisher.initialize();
        // Process tweets
        await publisher.processReadyTweets();
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Successfully processed tweets' })
        };
    }
    catch (error) {
        console.error('Lambda execution failed:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Failed to process tweets',
                error: error instanceof Error ? error.message : 'Unknown error'
            })
        };
    }
};
exports.handler = handler;
