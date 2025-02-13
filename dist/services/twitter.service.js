"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwitterService = void 0;
const twitter_api_v2_1 = require("twitter-api-v2");
class TwitterService {
    constructor(config) {
        this.username = '';
        this.config = config;
        this.client = new twitter_api_v2_1.TwitterApi({
            appKey: config.apiKey,
            appSecret: config.apiKeySecret,
            accessToken: config.accessToken,
            accessSecret: config.accessTokenSecret,
        });
    }
    async initialize() {
        const me = await this.client.v2.me();
        this.username = me.data.username;
    }
    formatRateLimitError(error) {
        if (error.code === 429) {
            const resetDate = new Date(Number(error.headers['x-user-limit-24hour-reset']) * 1000);
            const remainingTweets = error.headers['x-user-limit-24hour-remaining'];
            const limit = error.headers['x-user-limit-24hour-limit'];
            return `Twitter rate limit reached: ${remainingTweets}/${limit} tweets remaining. Resets at ${resetDate.toLocaleString()}`;
        }
        return error.message;
    }
    async debugApiAccess() {
        try {
            console.log('🔍 Testing Twitter API access...');
            // Test 1: Get user info
            console.log('Test 1: Getting user info...');
            const user = await this.client.v2.me();
            console.log('✅ Successfully got user info:', user.data);
            // Test 2: Check app settings
            console.log('\nTest 2: Checking app settings...');
            const appSettings = await this.client.v2.get('users/me');
            console.log('✅ Successfully got app settings:', appSettings);
            // Test 3: Check write permissions
            console.log('\nTest 3: Checking write permissions...');
            const writePermissions = await this.client.v2.get('users/me', {
                'tweet.fields': 'created_at'
            });
            console.log('✅ Successfully checked write permissions:', writePermissions);
            // Test 4: Check rate limits
            console.log('\nTest 4: Checking rate limits...');
            const rateLimits = await this.getRateLimits();
            console.log('ℹ️ Current rate limits:', rateLimits);
            // Test 5: Attempt to post a test tweet
            console.log('\nTest 5: Attempting to post a test tweet...');
            if (rateLimits.remaining > 0) {
                const testTweet = await this.client.v2.tweet('Test tweet from NotionXPublisher [' + new Date().toISOString() + ']');
                console.log('✅ Successfully posted test tweet:', testTweet);
            }
            else {
                console.log('⚠️ Skipping test tweet - rate limit reached');
            }
            console.log('\n✅ All debug tests passed!');
        }
        catch (error) {
            console.error('❌ Debug test failed:', {
                error: this.formatRateLimitError(error),
                code: error.code,
                data: error.data,
                stack: error.stack
            });
            throw error;
        }
    }
    async getRateLimits() {
        try {
            const response = await this.client.v2.get('users/me');
            const headers = response._headers;
            return {
                limit: Number(headers['x-user-limit-24hour-limit'] || 25),
                remaining: Number(headers['x-user-limit-24hour-remaining'] || 0),
                resetAt: new Date(Number(headers['x-user-limit-24hour-reset'] || 0) * 1000)
            };
        }
        catch (error) {
            console.error('Failed to get rate limits:', error);
            throw error;
        }
    }
    async validateCredentials() {
        try {
            // First run debug tests
            await this.debugApiAccess();
            // Verify credentials and app permissions
            const currentUser = await this.client.v2.me();
            // Check if we have write permissions by attempting to get app settings
            const appPermissions = await this.client.v2.get('users/me');
            if (!appPermissions || appPermissions.errors) {
                throw new Error('Twitter API credentials do not have write permissions. Please check your app settings in the Twitter Developer Portal.');
            }
        }
        catch (error) {
            if (error.code === 403) {
                throw new Error('Twitter API authentication failed. Please ensure your app has OAuth 1.0a enabled and "Read and Write" permissions.');
            }
            throw error;
        }
    }
    async postTweet(content) {
        try {
            if (!this.username) {
                await this.initialize();
            }
            const tweet = await this.client.v2.tweet(content);
            return {
                id: tweet.data.id,
                text: tweet.data.text,
                url: `https://x.com/${this.username}/status/${tweet.data.id}`
            };
        }
        catch (error) {
            console.error('Twitter API Error:', error);
            if (error instanceof Error) {
                throw new Error(`Twitter API Error: ${error.message}`);
            }
            throw error;
        }
    }
    async postThread(tweets) {
        try {
            if (!this.username) {
                await this.initialize();
            }
            if (!tweets.length) {
                throw new Error('Thread must contain at least one tweet');
            }
            const tweetIds = [];
            let replyToId;
            // Post each tweet in the thread
            for (const tweetContent of tweets) {
                const tweetData = replyToId
                    ? await this.client.v2.tweet(tweetContent, { reply: { in_reply_to_tweet_id: replyToId } })
                    : await this.client.v2.tweet(tweetContent);
                tweetIds.push(tweetData.data.id);
                replyToId = tweetData.data.id;
            }
            return {
                threadUrl: `https://x.com/${this.username}/status/${tweetIds[0]}`,
                tweetIds
            };
        }
        catch (error) {
            console.error('Twitter Thread Error:', error);
            if (error instanceof Error) {
                throw new Error(`Twitter Thread Error: ${error.message}`);
            }
            throw error;
        }
    }
    async scheduleTweet(content, publishDate) {
        // Note: Twitter API v2 doesn't support scheduling tweets directly
        // We'll need to implement this using a queue system or AWS EventBridge
        throw new Error('Tweet scheduling not implemented - requires additional infrastructure');
    }
}
exports.TwitterService = TwitterService;
//# sourceMappingURL=twitter.service.js.map