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

import * as dotenv from 'dotenv';
import { TwitterService } from '../services/twitter.service';
import { TwitterConfig } from '../types/twitter.types';

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

    const twitterConfig: TwitterConfig = {
      apiKey: process.env.TWITTER_API_KEY!,
      apiKeySecret: process.env.TWITTER_API_SECRET!,
      accessToken: process.env.TWITTER_ACCESS_TOKEN!,
      accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET!
    };

    const twitterService = new TwitterService(twitterConfig);
    await twitterService.debugApiAccess();

  } catch (error) {
    console.error('❌ Debug failed:', error);
    process.exit(1);
  }
}

// Run debug
debugTwitter(); 