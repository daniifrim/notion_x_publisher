"use strict";
/**
 * Local Development Runner
 *
 * This script is used for local testing and development. It simulates the behavior
 * of the Lambda functions without needing to deploy to AWS.
 *
 * Features:
 * 1. Environment validation
 * 2. Notion database schema validation
 * 3. Twitter credentials verification
 * 4. Manual tweet processing
 *
 * Usage:
 * - Run with: npm run local
 * - Requires .env file with all necessary credentials
 *
 * Related Files:
 * - scheduled.ts: The actual Lambda function this simulates
 * - services/*.ts: All service files used in production
 *
 * Note: This is NOT deployed to AWS - it's only for local development
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
const dotenv = __importStar(require("dotenv"));
const notion_service_1 = require("./services/notion.service");
const twitter_service_1 = require("./services/twitter.service");
// Load environment variables
dotenv.config();
async function main() {
    try {
        console.log('🚀 Starting NotionXPublisher locally...');
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
        // Initialize configurations
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
        // Initialize services
        console.log('📦 Initializing services...');
        const notionService = new notion_service_1.NotionService(notionConfig);
        const twitterService = new twitter_service_1.TwitterService(twitterConfig);
        // Validate Notion database schema
        console.log('🔍 Validating Notion database schema...');
        await notionService.validateDatabaseSchema();
        console.log('✅ Notion database schema is valid');
        // Initialize Twitter service
        console.log('🐦 Initializing Twitter service...');
        await twitterService.initialize();
        console.log('✅ Twitter service initialized');
        // Get ready tweets
        console.log('\n📝 Checking for ready tweets...');
        const readyTweets = await notionService.getReadyTweets();
        console.log(`Found ${readyTweets.length} tweets ready to publish`);
        // Process each tweet
        for (const tweet of readyTweets) {
            if (tweet.isThread) {
                console.log(`\n🧵 Processing thread: "${tweet.title}"`);
                // Split content into individual tweets
                const tweets = tweet.content.split('\n').filter(t => t.trim().length > 0);
                console.log(`Thread contains ${tweets.length} tweets:`);
                tweets.forEach((content, index) => {
                    console.log(`\n[${index + 1}/${tweets.length}] ${content}`);
                });
                try {
                    const threadResult = await twitterService.postThread(tweets);
                    console.log('✅ Thread published successfully');
                    console.log(`🔗 Thread URL: ${threadResult.threadUrl}`);
                    await notionService.updateTweetStatus(tweet.id, 'Published', threadResult.threadUrl);
                    console.log('✅ Notion status updated');
                }
                catch (error) {
                    console.error('❌ Failed to publish thread:', error);
                    await notionService.updateTweetStatus(tweet.id, 'Failed to Post', error instanceof Error ? error.message : 'Unknown error');
                    console.log('⚠️ Tweet status updated to Failed to Post');
                }
            }
            else {
                console.log(`\n🔄 Processing single tweet: "${tweet.content}"`);
                console.log(`Scheduled for: ${tweet.scheduledTime.toLocaleString()}`);
                try {
                    const publishedTweet = await twitterService.postTweet(tweet.content);
                    console.log('✅ Tweet published successfully');
                    console.log(`🔗 Tweet URL: ${publishedTweet.url}`);
                    await notionService.updateTweetStatus(tweet.id, 'Published', publishedTweet.url);
                    console.log('✅ Notion status updated');
                }
                catch (error) {
                    console.error('❌ Failed to publish tweet:', error);
                    await notionService.updateTweetStatus(tweet.id, 'Failed to Post', error instanceof Error ? error.message : 'Unknown error');
                    console.log('⚠️ Tweet status updated to Failed to Post');
                }
            }
        }
        console.log('\n✨ Local execution completed');
    }
    catch (error) {
        console.error('❌ Error during local execution:', error);
        process.exit(1);
    }
}
// Run the local execution
main();
//# sourceMappingURL=local.js.map