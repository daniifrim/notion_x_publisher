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
exports.handler = void 0;
const dotenv = __importStar(require("dotenv"));
const notion_service_1 = require("./services/notion.service");
const twitter_service_1 = require("./services/twitter.service");
const scheduler_service_1 = require("./services/scheduler.service");
// Load environment variables
dotenv.config();
const handler = async (event) => {
    try {
        console.log('🕒 Starting scheduled tweet processing...');
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
        const schedulerService = new scheduler_service_1.SchedulerService(notionService, twitterService);
        // Process any tweets that are ready and due
        await schedulerService.processScheduledTweets();
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Successfully processed scheduled tweets' })
        };
    }
    catch (error) {
        console.error('❌ Scheduler execution failed:', error);
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
