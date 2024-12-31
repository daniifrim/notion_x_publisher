import OpenAI from 'openai';
import { AI_CONFIG, AIRequestConfig, AIRole } from '../config/ai.config';

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
} 