import * as dotenv from 'dotenv';
import { TwitterService } from './services/twitter.service';
import { TwitterConfig } from './types/twitter.types';

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