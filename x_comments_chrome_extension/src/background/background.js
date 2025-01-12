import llmService from './llm.service.js';
import { createLogger } from '../utils/logger.js';

const logger = createLogger('Background');

chrome.runtime.onInstalled.addListener(() => {
    logger.log('Extension installed');
});

// Helper function to send progress updates to popup
async function sendProgressUpdate(tabId, phase) {
    try {
        await chrome.runtime.sendMessage({
            action: 'progressUpdate',
            phase
        });
    } catch (error) {
        logger.error('Error sending progress update:', error);
    }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'analyzeThread') {
        // Handle the analysis and send response
        handleThreadAnalysis(request.tabId)
            .then(processedData => {
                logger.log('Sending processed data back to popup:', processedData);
                sendResponse(processedData);
            })
            .catch(error => {
                logger.error('Error in analysis:', error);
                sendResponse({ error: error.message });
            });
        return true; // Keep the message channel open for async response
    }
});

async function injectContentScript(tabId) {
    try {
        // First check if the content script is already injected
        try {
            await chrome.tabs.sendMessage(tabId, { action: 'ping' });
            logger.log('Content script already injected');
            return true;
        } catch (error) {
            logger.log('Content script not yet injected, will inject now');
        }

        // Inject the content script
        await chrome.scripting.executeScript({
            target: { tabId },
            files: ['src/content/threadScraper.js']
        });

        logger.log('Content script injected successfully');
        return true;
    } catch (error) {
        logger.error('Error injecting content script:', error);
        return false;
    }
}

async function handleThreadAnalysis(tabId) {
    try {
        logger.log('Starting thread analysis for tab:', tabId);

        // Check if we're on a valid page
        const tab = await chrome.tabs.get(tabId);
        if (!tab.url.includes('twitter.com') && !tab.url.includes('x.com')) {
            throw new Error('Not a valid Twitter/X page');
        }

        // Ensure content script is injected
        const injected = await injectContentScript(tabId);
        if (!injected) {
            throw new Error('Failed to inject content script');
        }

        // Add a small delay to ensure the script is fully loaded
        await new Promise(resolve => setTimeout(resolve, 100));

        // Update to scraping phase
        await sendProgressUpdate(tabId, 'scraping');

        // Send message to content script to scrape
        const response = await chrome.tabs.sendMessage(tabId, { action: 'scrapeThread' });
        
        if (!response || !response.success) {
            throw new Error(response?.error || 'Failed to scrape thread');
        }

        const threadData = response.data;
        logger.log('Thread data scraped:', threadData);

        if (!threadData) {
            throw new Error('No thread data returned from scraper');
        }

        // Update to generating phase
        await sendProgressUpdate(tabId, 'generating');

        // Process the thread with LLM
        const processedData = await llmService.processThread(threadData);
        logger.log('Thread processed:', processedData);

        return processedData;

    } catch (error) {
        logger.error('Error in thread analysis:', error);
        throw error;
    }
} 