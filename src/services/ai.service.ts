/**
 * AI Service
 * 
 * This service is responsible for interacting with the OpenAI API to generate text completions.
 * It provides methods for creating completions, analyzing tweets, and creating prompt completions.
 * 
 * Key Responsibilities:
 * 1. Create text completions.
 * 2. Analyze tweets.
 * 3. Create prompt completions.
 * 
 * Configuration:
 * - AI_CONFIG: Configuration settings for the AI API.
 * 
 * Methods:
 * - createCompletion: Creates a text completion.
 * - analyzeTweets: Analyzes tweets for engagement patterns.
 * - createPromptCompletion: Creates a prompt completion.
 */ 

import OpenAI from 'openai';
import { AI_CONFIG, AIRequestConfig, AIRole } from '../config/ai.config';
import { AnalysisPrompt, AnalysisResult, ProcessedTweet } from '../types/ai.types';

export class AIService {
  private static instance: AIService;
  private client: OpenAI;

  private constructor() {
    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || ''
    });
  }

  public static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }

  async createCompletion(
    messages: { role: AIRole; content: string }[],
    config?: AIRequestConfig
  ): Promise<string> {
    try {
      const response = await this.client.chat.completions.create({
        model: config?.model || AI_CONFIG.model,
        messages,
        max_tokens: config?.maxTokens || AI_CONFIG.defaultMaxTokens,
        temperature: config?.temperature || AI_CONFIG.defaultTemperature
      });

      return response.choices[0]?.message?.content || '';
    } catch (error) {
      console.error('Failed to create completion:', error);
      throw error;
    }
  }

  async createPromptCompletion(
    systemPrompt: string,
    userPrompt: string,
    config?: AIRequestConfig
  ): Promise<string> {
    const messages = [
      {
        role: AI_CONFIG.roles.system,
        content: systemPrompt
      },
      {
        role: AI_CONFIG.roles.user,
        content: userPrompt
      }
    ];

    return this.createCompletion(messages, config);
  }

  async analyzeTweets(input: AnalysisPrompt): Promise<AnalysisResult> {
    try {
      const systemPrompt = `You are an AI assistant analyzing tweets for a user with the following profile: ${input.profile}. 
Their interests include: ${input.interests.join(', ')}. 
Analyze the provided tweets and create a markdown summary focusing on engagement patterns, content themes, and actionable insights.`;

      const userPrompt = `Please analyze these tweets:
${input.tweets.map((t: ProcessedTweet) => `- ${t.text} (Likes: ${t.likeCount}, Retweets: ${t.retweetCount}, URL: ${t.url})`).join('\n')}`;

      const analysis = await this.createPromptCompletion(systemPrompt, userPrompt);

      return {
        markdown: analysis,
        jsonOutput: {
          summary: analysis,
          tweets: input.tweets
        }
      };
    } catch (error) {
      console.error('Failed to analyze tweets:', error);
      throw error;
    }
  }
} 