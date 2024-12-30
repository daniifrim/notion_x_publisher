"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchedulerService = void 0;
class SchedulerService {
    constructor(notionService, twitterService) {
        this.notionService = notionService;
        this.twitterService = twitterService;
    }
    async processScheduledTweets() {
        try {
            // Check Twitter rate limits first
            const rateLimits = await this.twitterService.getRateLimits();
            if (rateLimits.remaining <= 0) {
                console.log(`⏳ Rate limit reached. Waiting until ${rateLimits.resetAt.toLocaleString()}`);
                return;
            }
            // Get tweets that are ready and due for publication
            const readyTweets = await this.notionService.getReadyTweets();
            console.log(`📝 Found ${readyTweets.length} tweets ready to publish`);
            for (const tweet of readyTweets) {
                try {
                    // Double check rate limits before each tweet
                    const currentLimits = await this.twitterService.getRateLimits();
                    if (currentLimits.remaining <= 0) {
                        console.log('⏳ Rate limit reached during processing. Remaining tweets will be processed in the next run.');
                        break;
                    }
                    console.log(`\n🐦 Publishing scheduled tweet: "${tweet.content}"`);
                    console.log(`📅 Scheduled for: ${tweet.publicationDate.toLocaleString()}`);
                    const publishedTweet = await this.twitterService.postTweet(tweet.content);
                    console.log('✅ Tweet published successfully');
                    // Update Notion with the tweet URL
                    const tweetUrl = `https://twitter.com/user/status/${publishedTweet.id}`;
                    await this.notionService.updateTweetStatus(tweet.id, 'Published', tweetUrl);
                    console.log('✅ Notion status updated');
                }
                catch (error) {
                    console.error('❌ Failed to process tweet:', error);
                    await this.notionService.updateTweetStatus(tweet.id, 'Failed to Post');
                    console.log('⚠️ Tweet status updated to Failed to Post');
                }
            }
        }
        catch (error) {
            console.error('❌ Scheduler error:', error);
            throw error;
        }
    }
}
exports.SchedulerService = SchedulerService;
