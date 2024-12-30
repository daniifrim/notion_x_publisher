import * as dotenv from 'dotenv';
import { NotionService } from './services/notion.service';
import { TwitterService } from './services/twitter.service';
import { NotionConfig } from './types/notion.types';
import { TwitterConfig } from './types/twitter.types';

// Load environment variables from .env file
dotenv.config();

async function main() {
  try {
    const notionConfig: NotionConfig = {
      databaseId: process.env.NOTION_DATABASE_ID!,
      apiKey: process.env.NOTION_API_KEY!
    };

    const twitterConfig: TwitterConfig = {
      apiKey: process.env.TWITTER_API_KEY!,
      apiKeySecret: process.env.TWITTER_API_SECRET!,
      accessToken: process.env.TWITTER_ACCESS_TOKEN!,
      accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET!
    };

    console.log('🚀 Initializing NotionXPublisher...');
    
    const notionService = new NotionService(notionConfig);
    const twitterService = new TwitterService(twitterConfig);

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
      } catch (error) {
        console.error('❌ Failed to process tweet:', error);
        await notionService.updateTweetStatus(tweet.id, 'Failed to Post');
        console.log('⚠️ Tweet status updated to Failed to Post');
      }
    }

    console.log('\n✨ All done!');
  } catch (error) {
    console.error('❌ Application error:', error);
    process.exit(1);
  }
}

// Run the application
main(); 