"use strict";
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
// Load environment variables from .env file
dotenv.config();
async function main() {
    try {
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
        console.log('🚀 Initializing NotionXPublisher...');
        const notionService = new notion_service_1.NotionService(notionConfig);
        const twitterService = new twitter_service_1.TwitterService(twitterConfig);
        console.log('🔍 Validating Notion database schema...');
        await notionService.validateDatabaseSchema();
        console.log('✅ Database schema is valid');
        console.log('🔑 Validating Twitter credentials...');
        await twitterService.validateCredentials();
        console.log('✅ Twitter credentials are valid');
        console.log('📚 Fetching ready tweets...');
        const readyTweets = await notionService.getReadyTweets();
        console.log(`📝 Found ${readyTweets.length} tweets ready to publish`);
        for (const tweet of readyTweets) {
            try {
                console.log(`\n🐦 Publishing tweet: "${tweet.content}"`);
                const publishedTweet = await twitterService.postTweet(tweet.content);
                console.log('✅ Tweet published successfully');
                await notionService.updateTweetStatus(tweet.id, 'Published', publishedTweet.text);
                console.log('✅ Notion status updated');
            }
            catch (error) {
                console.error('❌ Failed to process tweet:', error);
                await notionService.updateTweetStatus(tweet.id, 'Failed to Post');
                console.log('⚠️ Tweet status updated to Failed to Post');
            }
        }
        console.log('\n✨ All done!');
    }
    catch (error) {
        console.error('❌ Application error:', error);
        process.exit(1);
    }
}
// Run the application
main();
