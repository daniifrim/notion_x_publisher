import OpenAI from 'openai';
import { AIConfig, AnalysisPrompt, AnalysisResult, ProcessedTweet } from '../types/ai.types';

export class AIService {
  private client: OpenAI;
  private config: AIConfig;

  constructor(config: AIConfig) {
    this.config = config;
    this.client = new OpenAI({
      apiKey: config.apiKey
    });
  }

  private createAnalysisPrompt(data: AnalysisPrompt): string {
    // Combine tweets into a format that includes URLs
    const combinedText = data.tweets
      .map(t => `Tweet by @${t.username}:\n${t.text}\nURL: ${t.url}`)
      .join('\n\n');

    return `You are a skilled research analyst tasked with creating comprehensive tweet summaries. 
The analysis is tailored for ${data.profile}, with interests in: ${data.interests.join(', ')}.

Follow these strict guidelines for the summary:

1. STRUCTURE:
   - Start with a clear title (H1)
   - Include exact count: 'Information taken from analysis of X tweets'
   - Use H2 headers for main sections
   - Use bullet points for listing related information
   - Each section should be 2-3 paragraphs maximum

2. SOURCING:
   - Every major claim must have a source link
   - Format sources as [Source: @username](actual_tweet_url)
   - Include the source immediately after the claim
   - Multiple sources should be numbered: [Source 1: @username](url1), [Source 2: @username](url2)
   - IMPORTANT: Use the actual tweet URLs provided in the text, don't use placeholder URLs

3. CONTENT REQUIREMENTS:
   - Separate factual information (from tweets) from analysis
   - Use bullet points for key takeaways
   - Include specific numbers, data, or examples when available
   - Avoid repetition of ideas
   - For each major topic, include:
     * What was stated (fact)
     * Why it matters (analysis)
     * Potential implications (insight)

4. FORMATTING:
   - Use bold (**) for key terms
   - Use bullet points (-) for lists
   - Keep paragraphs short (2-3 sentences)
   - Use horizontal rules (---) to separate major sections

Tweets to analyze:
${combinedText}`;
  }

  async analyzeTweets(data: AnalysisPrompt): Promise<AnalysisResult> {
    try {
      const prompt = this.createAnalysisPrompt(data);
      
      const response = await this.client.chat.completions.create({
        model: this.config.model,
        messages: [
          {
            role: 'system',
            content: 'You are a skilled research analyst that creates well-structured markdown summaries.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: this.config.maxTokens,
        temperature: this.config.temperature,
        response_format: { type: 'text' }
      });

      const markdown = response.choices[0]?.message?.content || '';

      return {
        markdown,
        jsonOutput: {
          summary: 'Summary saved to markdown file',
          tweets: data.tweets
        }
      };
    } catch (error) {
      console.error('Failed to analyze tweets:', error);
      throw error;
    }
  }
} 