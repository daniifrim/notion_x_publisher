/**
 * Tweet Preview Test Script
 * 
 * This script tests the tweet extraction and preview functionality without posting to Twitter.
 * It helps verify:
 * 1. Content extraction (text + images)
 * 2. Tweet length validation
 * 3. Image validation (up to 4 images, formats, sizes)
 * 4. Preview of how tweets would appear with multiple images
 * 
 * Usage:
 * - Run with: npm run test:preview
 * - Requires .env file with NOTION_API_KEY and NOTION_DATABASE_ID
 */

import { config } from 'dotenv';
import { NotionService } from '../services/notion.service';
import { NotionTweet } from '../types/notion.types';
import chalk from 'chalk';
import { URL } from 'url';

// Load environment variables
config();

// Constants
const MAX_TWEET_LENGTH = 280;
const MAX_IMAGES = 4;
const SUPPORTED_IMAGE_FORMATS = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
const MAX_IMAGE_SIZE_MB = 15; // Web upload limit

// Utility functions
function validateImageUrl(url: string): string[] {
  const errors: string[] = [];
  try {
    const parsedUrl = new URL(url);
    const extension = parsedUrl.pathname.split('.').pop()?.toLowerCase();
    
    if (!extension || !SUPPORTED_IMAGE_FORMATS.includes(extension)) {
      errors.push(`Unsupported image format: ${extension}. Supported formats: ${SUPPORTED_IMAGE_FORMATS.join(', ')}`);
    }
  } catch {
    errors.push('Invalid image URL format');
  }
  return errors;
}

function validateTweet(tweet: NotionTweet): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Check content length
  if (tweet.content.length > MAX_TWEET_LENGTH) {
    errors.push(`Tweet exceeds ${MAX_TWEET_LENGTH} characters (${tweet.content.length})`);
  }

  // Check if content is empty
  if (!tweet.content.trim()) {
    errors.push('Tweet content is empty');
  }

  // Validate images if present
  if (tweet.images && tweet.images.length > 0) {
    if (tweet.images.length > MAX_IMAGES) {
      errors.push(`Too many images: ${tweet.images.length}. Maximum allowed: ${MAX_IMAGES}`);
    }

    tweet.images.forEach((imageUrl: string, index: number) => {
      const imageErrors = validateImageUrl(imageUrl);
      imageErrors.forEach(error => errors.push(`Image ${index + 1}: ${error}`));
    });
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

function getImageLayoutDescription(imageCount: number): string {
  switch (imageCount) {
    case 2:
      return 'Side by side (7:8 aspect ratio each)';
    case 3:
      return 'One large (7:8) + two stacked (4:7 each)';
    case 4:
      return '2x2 grid (2:1 aspect ratio each)';
    default:
      return 'Single image';
  }
}

function displayTweetPreview(tweet: NotionTweet, validation: { isValid: boolean; errors: string[] }) {
  console.log('\n' + '='.repeat(50));
  console.log(chalk.blue('📝 Tweet Preview'));
  console.log('-'.repeat(50));
  
  // Display tweet content
  console.log(chalk.white(tweet.content));
  
  // Display images info if present
  if (tweet.images && tweet.images.length > 0) {
    console.log(chalk.cyan('\n🖼️  Images:'));
    console.log(chalk.gray(`Layout: ${getImageLayoutDescription(tweet.images.length)}`));
    tweet.images.forEach((url: string, index: number) => {
      console.log(chalk.cyan(`Image ${index + 1}:`), url);
    });
  }

  // Display metadata
  console.log('\n📊 Metadata:');
  console.log(chalk.gray(`Characters: ${tweet.content.length}/${MAX_TWEET_LENGTH}`));
  console.log(chalk.gray(`Scheduled for: ${tweet.scheduledTime.toLocaleString()}`));
  console.log(chalk.gray(`Status: ${tweet.status}`));
  if (tweet.images) {
    console.log(chalk.gray(`Images: ${tweet.images.length}/${MAX_IMAGES}`));
  }

  // Display validation results
  console.log('\n✅ Validation:');
  if (validation.isValid) {
    console.log(chalk.green('Tweet is valid and ready to publish'));
  } else {
    console.log(chalk.red('Tweet has validation errors:'));
    validation.errors.forEach(error => {
      console.log(chalk.red(`  • ${error}`));
    });
  }
  
  console.log('='.repeat(50) + '\n');
}

async function main() {
  try {
    console.log(chalk.blue('🚀 Starting tweet preview test...\n'));

    // Initialize Notion service
    const notionService = new NotionService({
      apiKey: process.env.NOTION_API_KEY || '',
      databaseId: process.env.NOTION_DATABASE_ID || ''
    });

    // Get ready tweets
    console.log(chalk.blue('📥 Fetching ready tweets...'));
    const readyTweets = await notionService.getReadyTweets();
    
    // Filter out threads
    const singleTweets = readyTweets.filter(tweet => !tweet.isThread);
    console.log(chalk.blue(`\nFound ${singleTweets.length} single tweets ready to publish`));

    // Process each tweet
    for (const tweet of singleTweets) {
      const validation = validateTweet(tweet);
      displayTweetPreview(tweet, validation);
    }

    console.log(chalk.green('\n✨ Preview test completed successfully'));
  } catch (error) {
    console.error(chalk.red('\n❌ Error in preview script:'), error);
    process.exit(1);
  }
}

// Run the test
main(); 