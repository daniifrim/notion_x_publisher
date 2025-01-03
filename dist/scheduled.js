"use strict";
/**
 * AWS Lambda Handler: Main Tweet Publisher
 *
 * This is the main Lambda function that runs every 5 minutes via EventBridge trigger.
 * It handles the core functionality of checking Notion for ready tweets and publishing them to Twitter.
 *
 * Process Flow:
 * 1. Checks Notion database for tweets with "Ready to Publish" status
 * 2. For each ready tweet:
 *    - Validates the content
 *    - Posts to Twitter
 *    - Updates status in Notion to "Published" or "Failed to Post"
 *
 * Related Files:
 * - services/notion.service.ts: Handles all Notion database operations
 * - services/twitter.service.ts: Manages Twitter API interactions
 * - types/notion.types.ts: Type definitions for Notion data
 *
 * Trigger: EventBridge rule "notion-x-publisher-schedule" (every 5 minutes)
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const dotenv = __importStar(require("dotenv"));
const notion_service_1 = require("./services/notion.service");
const twitter_service_1 = require("./services/twitter.service");
// Load environment variables
dotenv.config();
const handler = async (event) => {
    try {
        console.log('🕒 Starting scheduled Lambda execution...');
        console.log('⏰ Current time:', new Date().toISOString());
        // Validate environment variables
        const requiredEnvVars = [
            'NOTION_API_KEY',
            'NOTION_DATABASE_ID',
            'TWITTER_API_KEY',
            'TWITTER_API_SECRET',
            'TWITTER_ACCESS_TOKEN',
            'TWITTER_ACCESS_TOKEN_SECRET'
        ];
        const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);
        if (missingEnvVars.length > 0) {
            throw new Error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
        }
        // Initialize services
        console.log('📦 Initializing services...');
        const notionConfig = {
            databaseId: process.env.NOTION_DATABASE_ID,
            apiKey: process.env.NOTION_API_KEY
        };
        const twitterConfig = {
            apiKey: process.env.TWITTER_API_KEY,
            apiKeySecret: process.env.TWITTER_API_SECRET,
            accessToken: process.env.TWITTER_ACCESS_TOKEN,
            accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET
        };
        const notionService = new notion_service_1.NotionService(notionConfig);
        const twitterService = new twitter_service_1.TwitterService(twitterConfig);
        // Initialize Twitter service
        console.log('🐦 Initializing Twitter service...');
        await twitterService.initialize();
        console.log('✅ Twitter service initialized');
        // Get ready tweets
        console.log('\n📝 Checking for ready tweets...');
        const readyTweets = await notionService.getReadyTweets();
        console.log(`Found ${readyTweets.length} tweets ready to publish`);
        // Process each tweet
        const results = [];
        for (const tweet of readyTweets) {
            try {
                if (tweet.isThread) {
                    console.log(`\n🧵 Processing thread: "${tweet.title}"`);
                    // Split content into individual tweets
                    const tweets = tweet.content.split('\n').filter(t => t.trim().length > 0);
                    console.log(`Thread contains ${tweets.length} tweets:`);
                    tweets.forEach((content, index) => {
                        console.log(`\n[${index + 1}/${tweets.length}] ${content}`);
                    });
                    const threadResult = await twitterService.postThread(tweets);
                    console.log('✅ Thread published successfully');
                    console.log(`🔗 Thread URL: ${threadResult.threadUrl}`);
                    await notionService.updateTweetStatus(tweet.id, 'Published', threadResult.threadUrl);
                    console.log('✅ Notion status updated');
                    results.push({
                        id: tweet.id,
                        success: true,
                        url: threadResult.threadUrl
                    });
                }
                else {
                    console.log(`\n🔄 Processing single tweet: "${tweet.content}"`);
                    console.log(`Scheduled for: ${tweet.scheduledTime.toLocaleString()}`);
                    const publishedTweet = await twitterService.postTweet(tweet.content);
                    console.log('✅ Tweet published successfully');
                    console.log(`🔗 Tweet URL: ${publishedTweet.url}`);
                    await notionService.updateTweetStatus(tweet.id, 'Published', publishedTweet.url);
                    console.log('✅ Notion status updated');
                    results.push({
                        id: tweet.id,
                        success: true,
                        url: publishedTweet.url
                    });
                }
            }
            catch (error) {
                console.error(`❌ Failed to process tweet ${tweet.id}:`, error);
                await notionService.updateTweetStatus(tweet.id, 'Failed to Post', undefined, error instanceof Error ? error.message : 'Unknown error');
                results.push({
                    id: tweet.id,
                    success: false,
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        }
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Successfully processed scheduled tweets',
                processed: readyTweets.length,
                results
            })
        };
    }
    catch (error) {
        console.error('❌ Lambda execution failed:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Failed to process scheduled tweets',
                error: error instanceof Error ? error.message : 'Unknown error'
            })
        };
    }
};
exports.handler = handler;
//# sourceMappingURL=scheduled.js.map