import config from './config.js';

class LLMService {
    constructor() {
        this.apiEndpoint = 'https://api.deepseek.com/v1/chat/completions';
        this.cache = new Map();
        this.cacheExpiry = 30 * 60 * 1000; // 30 minutes
    }

    /**
     * Gets the API key from config
     * @returns {Promise<string>} The API key
     */
    async getApiKey() {
        const apiKey = await config.get('DEEPSEEK_API_KEY');
        if (!apiKey) {
            throw new Error('DeepSeek API key not found. Please set it in the extension options.');
        }
        return apiKey;
    }

    /**
     * Generates a cache key for a thread
     * @param {Object} threadData - The thread data
     * @returns {string} Cache key
     */
    generateCacheKey(threadData) {
        return `${threadData.metadata.url}_${threadData.timestamp}`;
    }

    /**
     * Processes a thread to generate summary and suggestions
     * @param {Object} threadData - The thread data from the scraper
     * @returns {Promise<Object>} Summary and suggestions
     */
    async processThread(threadData) {
        const cacheKey = this.generateCacheKey(threadData);
        
        // Check cache first
        if (this.cache.has(cacheKey)) {
            const cached = this.cache.get(cacheKey);
            if (Date.now() - cached.timestamp < this.cacheExpiry) {
                return cached.data;
            }
            this.cache.delete(cacheKey);
        }

        try {
            const prompt = this.constructPrompt(threadData);
            const response = await this.callLLM(prompt);
            const processed = this.parseResponse(response);

            // Cache the results
            this.cache.set(cacheKey, {
                timestamp: Date.now(),
                data: processed
            });

            return processed;
        } catch (error) {
            console.error('Error processing thread:', error);
            throw new Error('Failed to process thread: ' + error.message);
        }
    }

    /**
     * Constructs the prompt for the LLM
     * @param {Object} threadData - The thread data
     * @returns {string} The constructed prompt
     */
    constructPrompt(threadData) {
        const { mainTweet, replies } = threadData;
        
        return `You are an AI assistant helping to analyze Twitter threads and generate engaging responses.

Context:
Main Tweet (by ${mainTweet.author.name}): "${mainTweet.text}"

Replies:
${replies.map(reply => `- ${reply.author.name}: "${reply.text}"`).join('\n')}

Your task is to provide:
1. A concise summary of the main discussion points (2-3 sentences)
2. 5 suggested replies that strictly follow these guidelines:

Tone and Voice Requirements:
- Use an informal and conversational tone with contractions (e.g., "That's", "I've found", "Here's why")
- Show enthusiasm about technical topics (e.g., "Love how this scales!", "Amazing approach!")
- Engage directly with others' points (e.g., "Your point about X is spot on!")
- Share personal insights based on experience (e.g., "In my experience...", "I've found that...")
- Keep responses brief and punchy (1-2 sentences max)
- Use emphasis with strategic punctuation or phrases like "exactly" or "definitely"
- Focus on actionable insights and practical utility
- Maintain a tech-savvy voice while being accessible
- Use tech jargon appropriately but explain complex concepts simply
- Be culturally aware and inclusive in technical discussions

Content Requirements for Suggestions:
- Focus heavily on technology, AI, coding, and software tools
- Include personal experiences or opinions to humanize responses
- Use action-oriented language focusing on outcomes
- Reference specific technical concepts mentioned in the thread
- Add value through practical insights or questions
- Encourage further discussion with open-ended questions
- Stay relevant to the technical context of the discussion
- Avoid repeating points already made in existing replies
- Consider both technical accuracy and conversational engagement
- Aim to advance the technical discussion constructively

IMPORTANT: Respond with a plain JSON object (no markdown, no code blocks) in this exact format:
{
    "summary": "Your summary here",
    "suggestions": [
        "First suggestion here",
        "Second suggestion here",
        "Third suggestion here",
        "Fourth suggestion here",
        "Fifth suggestion here"
    ]
}

Each suggestion should feel like a natural comment that a tech-savvy professional would write, combining technical insight with conversational engagement.`;
    }

    /**
     * Calls the DeepSeek API
     * @param {string} prompt - The constructed prompt
     * @returns {Promise<Object>} Raw API response
     */
    async callLLM(prompt) {
        const apiKey = await this.getApiKey();
        
        const response = await fetch(this.apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'deepseek-chat',
                messages: [
                    {
                        role: 'system',
                        content: 'You are a helpful assistant that analyzes Twitter threads and generates summaries and reply suggestions. Always respond in JSON format.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: 0.7,
                max_tokens: 1000
            })
        });

        if (!response.ok) {
            throw new Error(`API call failed: ${response.statusText}`);
        }

        return await response.json();
    }

    /**
     * Parses the LLM response into the required format
     * @param {Object} response - Raw API response
     * @returns {Object} Processed response
     */
    parseResponse(response) {
        try {
            let content = response.choices[0].message.content;
            
            // Remove markdown code block if present
            content = content.replace(/```json\n|\n```/g, '');
            
            // Clean up any remaining whitespace
            content = content.trim();
            
            // Parse the JSON
            const parsed = JSON.parse(content);

            // Validate the response structure
            if (!parsed.summary || !Array.isArray(parsed.suggestions)) {
                throw new Error('Invalid response structure');
            }

            return {
                summary: parsed.summary,
                suggestions: parsed.suggestions,
                metadata: {
                    timestamp: new Date().toISOString(),
                    model: 'deepseek-chat'
                }
            };
        } catch (error) {
            console.error('Raw response content:', response.choices[0].message.content);
            throw new Error('Failed to parse LLM response: ' + error.message);
        }
    }
}

export default new LLMService(); 