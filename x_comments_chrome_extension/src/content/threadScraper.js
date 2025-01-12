// Debug logger
const DEBUG = true;
const logger = {
    log: (...args) => DEBUG && console.log('[Thread Scraper]:', ...args),
    error: (...args) => DEBUG && console.error('[Thread Scraper Error]:', ...args),
    warn: (...args) => DEBUG && console.warn('[Thread Scraper Warning]:', ...args)
};

class TwitterThreadScraper {
    constructor() {
        this.mainTweet = null;
        this.replies = [];
        this.isLoading = false;
        this.maxRetries = 3;
        this.retryDelay = 1000; // 1 second
    }

    /**
     * Extracts text content from a tweet element
     */
    extractTweetText(tweetElement) {
        logger.log('Extracting tweet text');
        const textDiv = tweetElement.querySelector('[data-testid="tweetText"]');
        return textDiv ? textDiv.textContent.trim() : '';
    }

    /**
     * Extracts author information from a tweet element
     */
    extractAuthor(tweetElement) {
        logger.log('Extracting author info');
        const authorElement = tweetElement.querySelector('[data-testid="User-Name"]');
        if (!authorElement) return null;

        const nameSpan = authorElement.querySelector('span');
        const handleLink = authorElement.querySelector('a');

        return {
            name: nameSpan ? nameSpan.textContent.trim() : '',
            handle: handleLink ? handleLink.getAttribute('href').replace('/', '') : ''
        };
    }

    /**
     * Extracts timestamp from a tweet element
     */
    extractTimestamp(tweetElement) {
        const timeElement = tweetElement.querySelector('time');
        return timeElement ? timeElement.getAttribute('datetime') : null;
    }

    /**
     * Gets the count for a specific metric
     */
    getMetricCount(tweetElement, metric) {
        const metricElement = tweetElement.querySelector(`[data-testid="${metric}"]`);
        if (!metricElement) return 0;
        const countText = metricElement.textContent.trim();
        return parseInt(countText.replace(/[^0-9]/g, '')) || 0;
    }

    /**
     * Extracts the views from aria-label
     */
    getViewsCount(tweetElement) {
        const viewsElement = tweetElement.querySelector('[aria-label$=" views"]');
        if (!viewsElement) return 0;
        const label = viewsElement.getAttribute('aria-label') || '0';
        return parseInt(label.replace(/[^0-9]/g, '')) || 0;
    }

    /**
     * Extracts engagement metrics from a tweet element
     */
    extractMetrics(tweetElement) {
        return {
            replies: this.getMetricCount(tweetElement, 'reply'),
            retweets: this.getMetricCount(tweetElement, 'retweet'),
            likes: this.getMetricCount(tweetElement, 'like'),
            views: this.getViewsCount(tweetElement)
        };
    }

    /**
     * Extracts the main tweet content and metadata
     */
    async extractMainTweet() {
        logger.log('Extracting main tweet');
        for (let i = 0; i < this.maxRetries; i++) {
            try {
                const tweetArticle = document.querySelector('article[data-testid="tweet"]');
                if (!tweetArticle) {
                    throw new Error('Main tweet not found');
                }

                return {
                    text: this.extractTweetText(tweetArticle),
                    author: this.extractAuthor(tweetArticle),
                    timestamp: this.extractTimestamp(tweetArticle),
                    metrics: this.extractMetrics(tweetArticle)
                };
            } catch (error) {
                logger.error('Error extracting main tweet:', error);
                if (i === this.maxRetries - 1) throw error;
                await this.delay(this.retryDelay);
            }
        }
    }

    /**
     * Extracts all replies in the thread
     */
    async extractReplies() {
        logger.log('Extracting replies');
        const replies = [];
        
        // Initial scroll position
        let lastHeight = document.documentElement.scrollHeight;
        const maxScrollAttempts = 5;
        let scrollAttempts = 0;
        
        while (scrollAttempts < maxScrollAttempts) {
            // Get current replies
            const replyElements = Array.from(document.querySelectorAll('article[data-testid="tweet"]')).slice(1);
            
            // Process new replies
            for (let i = replies.length; i < replyElements.length; i++) {
                const replyElement = replyElements[i];
                replies.push({
                    text: this.extractTweetText(replyElement),
                    author: this.extractAuthor(replyElement),
                    timestamp: this.extractTimestamp(replyElement),
                    metrics: this.extractMetrics(replyElement)
                });
            }
            
            logger.log(`Found ${replies.length} replies so far`);
            
            // Scroll to load more
            window.scrollTo(0, document.documentElement.scrollHeight);
            await this.delay(1000); // Wait for content to load
            
            // Check if we've reached the end
            const newHeight = document.documentElement.scrollHeight;
            if (newHeight === lastHeight) {
                scrollAttempts++;
            } else {
                scrollAttempts = 0;
                lastHeight = newHeight;
            }
        }
        
        logger.log(`Finished extracting ${replies.length} total replies`);
        return replies;
    }

    /**
     * Main method to scrape the entire thread
     */
    async scrapeThread() {
        if (this.isLoading) {
            throw new Error('Scraping already in progress');
        }

        this.isLoading = true;
        try {
            logger.log('Starting thread scrape');
            await this.waitForContent();

            const mainTweet = await this.extractMainTweet();
            const replies = await this.extractReplies();

            const threadData = {
                mainTweet,
                replies,
                timestamp: new Date().toISOString(),
                metadata: {
                    url: window.location.href,
                    totalReplies: replies.length
                }
            };

            logger.log('Thread scraping completed:', threadData);
            return threadData;

        } catch (error) {
            logger.error('Error scraping thread:', error);
            throw error;
        } finally {
            this.isLoading = false;
        }
    }

    /**
     * Waits for the content to be loaded
     */
    waitForContent() {
        logger.log('Waiting for content to load');
        return new Promise(resolve => {
            const checkContent = () => {
                if (document.querySelector('article[data-testid="tweet"]')) {
                    logger.log('Content loaded');
                    resolve();
                } else {
                    setTimeout(checkContent, 100);
                }
            };
            checkContent();
        });
    }

    /**
     * Utility method to delay execution
     */
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize the scraper and listen for messages
logger.log('Initializing content script');
const scraper = new TwitterThreadScraper();

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    logger.log('Received message:', request);
    
    // Handle ping message to check if content script is loaded
    if (request.action === 'ping') {
        logger.log('Received ping, sending pong');
        sendResponse({ success: true, message: 'pong' });
        return true;
    }
    
    if (request.action === 'scrapeThread') {
        logger.log('Starting thread scrape from message');
        // Ensure we're on a tweet page
        if (!window.location.href.match(/https?:\/\/(twitter|x)\.com\/\w+\/status\/\d+/)) {
            logger.error('Not a valid tweet page');
            sendResponse({ 
                success: false, 
                error: 'Not a valid tweet page',
                details: {
                    url: window.location.href,
                    timestamp: new Date().toISOString()
                }
            });
            return true;
        }

        scraper.scrapeThread()
            .then(threadData => {
                logger.log('Scraping successful, sending response');
                sendResponse({ 
                    success: true, 
                    data: threadData 
                });
            })
            .catch(error => {
                logger.error('Scraping failed:', error);
                sendResponse({ 
                    success: false, 
                    error: error.message,
                    details: {
                        url: window.location.href,
                        timestamp: new Date().toISOString()
                    }
                });
            });
        return true; // Required for async response
    }
}); 