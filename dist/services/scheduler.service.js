"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchedulerService = void 0;
class SchedulerService {
    constructor(config, twitterService, notionService) {
        this.config = config;
        this.twitterService = twitterService;
        this.notionService = notionService;
    }
    async processSingleTweet(tweet) {
        try {
            // Check if it's time to publish
            if (tweet.scheduledTime > new Date()) {
                return false; // Not time yet
            }
            // Update status to Processing
            await this.notionService.updateTweetStatus(tweet.id, 'Processing');
            // Handle thread vs single tweet
            let result;
            if (tweet.threadId) {
                // Get all tweets in the thread
                const notionTweets = await this.notionService.getReadyTweets();
                const threadTweets = notionTweets
                    .filter(t => t.isThread && t.title === tweet.threadId)
                    .sort((a, b) => (a.content > b.content ? 1 : -1));
                // Post thread
                result = await this.twitterService.postThread(threadTweets.map(t => t.content));
                // Update all thread tweets
                for (const threadTweet of threadTweets) {
                    await this.notionService.updateTweetStatus(threadTweet.id, 'Published', result.threadUrl);
                }
            }
            else {
                // Post single tweet
                result = await this.twitterService.postTweet(tweet.content);
                await this.notionService.updateTweetStatus(tweet.id, 'Published', result.url);
            }
            return true;
        }
        catch (error) {
            console.error(`Failed to process tweet ${tweet.id}:`, error);
            // Update retry count and status
            tweet.retryCount++;
            tweet.lastAttempt = new Date();
            tweet.error = error instanceof Error ? error.message : 'Unknown error';
            if (tweet.retryCount >= this.config.maxRetries) {
                await this.notionService.updateTweetStatus(tweet.id, 'Failed to Post', undefined, tweet.error);
            }
            return false;
        }
    }
    async processQueue() {
        const result = {
            success: true,
            message: 'Tweet processing completed',
            tweetsProcessed: 0,
            errors: []
        };
        try {
            // Get all ready tweets from Notion
            const tweets = await this.notionService.getReadyTweets();
            // Convert to ScheduledTweet format
            const scheduledTweets = tweets.map(tweet => ({
                id: tweet.id,
                content: tweet.content,
                scheduledTime: tweet.scheduledTime,
                status: 'Pending',
                retryCount: 0,
                threadId: tweet.isThread ? tweet.title : undefined
            }));
            // Process each tweet
            for (const tweet of scheduledTweets) {
                try {
                    const processed = await this.processSingleTweet(tweet);
                    if (processed) {
                        result.tweetsProcessed++;
                    }
                }
                catch (error) {
                    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
                    result.errors.push(`Failed to process tweet ${tweet.id}: ${errorMessage}`);
                }
            }
            // Update result based on processing
            if (result.errors.length > 0) {
                result.success = false;
                result.message = `Completed with ${result.errors.length} errors`;
            }
            return result;
        }
        catch (error) {
            console.error('Failed to process tweet queue:', error);
            return {
                success: false,
                message: 'Failed to process tweet queue',
                tweetsProcessed: result.tweetsProcessed,
                errors: [...result.errors, error instanceof Error ? error.message : 'Unknown error']
            };
        }
    }
    async retryFailedTweets() {
        const result = {
            success: true,
            message: 'Retry processing completed',
            tweetsProcessed: 0,
            errors: []
        };
        try {
            // Get failed tweets that haven't exceeded retry limit
            const tweets = await this.notionService.getReadyTweets();
            const failedTweets = tweets.filter(tweet => tweet.status === 'Failed to Post');
            // Process each failed tweet
            for (const tweet of failedTweets) {
                const scheduledTweet = {
                    id: tweet.id,
                    content: tweet.content,
                    scheduledTime: tweet.scheduledTime,
                    status: 'Pending',
                    retryCount: 0,
                    threadId: tweet.isThread ? tweet.title : undefined
                };
                try {
                    const processed = await this.processSingleTweet(scheduledTweet);
                    if (processed) {
                        result.tweetsProcessed++;
                    }
                }
                catch (error) {
                    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
                    result.errors.push(`Failed to retry tweet ${tweet.id}: ${errorMessage}`);
                }
            }
            // Update result based on processing
            if (result.errors.length > 0) {
                result.success = false;
                result.message = `Retry completed with ${result.errors.length} errors`;
            }
            return result;
        }
        catch (error) {
            console.error('Failed to retry failed tweets:', error);
            return {
                success: false,
                message: 'Failed to process retry queue',
                tweetsProcessed: result.tweetsProcessed,
                errors: [...result.errors, error instanceof Error ? error.message : 'Unknown error']
            };
        }
    }
}
exports.SchedulerService = SchedulerService;
//# sourceMappingURL=scheduler.service.js.map