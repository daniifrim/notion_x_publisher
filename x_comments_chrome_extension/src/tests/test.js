import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { JSDOM } from 'jsdom';

// Get current file path in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set test environment
process.env.NODE_ENV = 'development';
process.env.DEEPSEEK_API_KEY = 'sk-b22d31a46d384ddaa1a31429c897cce3';

// Mock Chrome API
global.chrome = {
    runtime: {
        onMessage: {
            addListener: () => {}
        }
    }
};

async function runTest() {
    try {
        // Load mock HTML
        const html = fs.readFileSync(path.join(__dirname, 'mock-thread.html'), 'utf8');
        const dom = new JSDOM(html);
        global.document = dom.window.document;
        global.window = dom.window;
        global.fetch = async () => ({
            ok: true,
            json: async () => ({
                choices: [{
                    message: {
                        content: JSON.stringify({
                            summary: "A discussion about the relative difficulty of backend versus frontend development, focusing on architectural choices and trade-offs. The thread explores the REST philosophy of simple backend endpoints with frontend complexity, while also considering how both sides can be equally challenging depending on implementation choices.",
                            suggestions: [
                                "Love how you're applying REST philosophy here! I've found that pushing complexity to the frontend actually improves iteration speed. Anyone else seeing similar benefits with their microservices?",
                                "That's exactly my experience with backend simplicity! Using tools like FastAPI or Express has made our endpoints super clean, while letting React handle the complex UI states. What's your go-to backend framework?",
                                "Interesting point about logical vs. complex! In my experience, TypeScript has been a game-changer for both sides - it brings that backend-style type safety to the frontend. Have you tried it in your stack?",
                                "The 'works or doesn't' approach is spot on for backend! Though I've found that modern frontend testing tools like Cypress make frontend just as verifiable. What's your testing strategy?",
                                "Here's a hot take: the rise of edge computing is actually blurring the backend/frontend divide. Been experimenting with Cloudflare Workers lately and it's mind-blowing! Anyone else exploring this space?"
                            ]
                        })
                    }
                }]
            })
        });

        // Initialize scraper
        const { TwitterThreadScraper } = await import('../content/threadScraper.js');
        const llmService = await import('../background/llm.service.js');
        
        console.log('🔍 Starting thread scraping test...');
        
        const scraper = new TwitterThreadScraper();
        
        // Test scraping
        const threadData = await scraper.scrapeThread();
        console.log('\n📝 Scraped Thread Data:');
        console.log(JSON.stringify(threadData, null, 2));

        // Verify scraping results
        console.log('\n✅ Verifying scraping results...');
        console.assert(threadData.mainTweet.text.includes('Which one is the easiest?'), 'Main tweet text not found');
        console.assert(threadData.replies.length === 22, 'Incorrect number of replies');
        console.assert(threadData.replies[0].author.name === 'arthur', 'First reply author incorrect');

        // Test LLM processing
        console.log('\n🤖 Testing LLM processing...');
        const llmResponse = await llmService.default.processThread(threadData);
        
        console.log('\n📊 LLM Processing Result:');
        console.log(JSON.stringify(llmResponse, null, 2));

        console.log('\n✅ Test completed successfully!');
    } catch (error) {
        console.error('❌ Test failed:', error);
        process.exit(1);
    }
}

runTest(); 