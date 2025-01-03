"use strict";
/**
 * Twitter Integration Debug Script
 *
 * This script helps diagnose Twitter API integration issues by testing various
 * Twitter API endpoints and validating credentials.
 *
 * Features:
 * 1. Validates Twitter API credentials
 * 2. Tests tweet posting functionality
 * 3. Checks API rate limits
 * 4. Verifies app permissions
 *
 * Usage:
 * - Run with: npm run debug:twitter
 * - Requires .env file with Twitter API credentials
 *
 * Related Files:
 * - services/twitter.service.ts: The main Twitter service being tested
 * - scheduled.ts: The Lambda function that uses Twitter integration
 *
 * Note: This is a debugging tool, not used in production
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
const twitter_service_1 = require("./services/twitter.service");
// Load environment variables
dotenv.config();
async function debugTwitter() {
    try {
        console.log('🔧 Starting Twitter API debug...');
        // Log environment variables (without sensitive data)
        console.log('\n📋 Checking environment variables:');
        const envVars = {
            TWITTER_API_KEY: process.env.TWITTER_API_KEY ? '✅ Set' : '❌ Missing',
            TWITTER_API_SECRET: process.env.TWITTER_API_SECRET ? '✅ Set' : '❌ Missing',
            TWITTER_ACCESS_TOKEN: process.env.TWITTER_ACCESS_TOKEN ? '✅ Set' : '❌ Missing',
            TWITTER_ACCESS_TOKEN_SECRET: process.env.TWITTER_ACCESS_TOKEN_SECRET ? '✅ Set' : '❌ Missing'
        };
        console.log(envVars);
        const twitterConfig = {
            apiKey: process.env.TWITTER_API_KEY,
            apiKeySecret: process.env.TWITTER_API_SECRET,
            accessToken: process.env.TWITTER_ACCESS_TOKEN,
            accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET
        };
        const twitterService = new twitter_service_1.TwitterService(twitterConfig);
        await twitterService.debugApiAccess();
    }
    catch (error) {
        console.error('❌ Debug failed:', error);
        process.exit(1);
    }
}
// Run debug
debugTwitter();
//# sourceMappingURL=debug-twitter.js.map