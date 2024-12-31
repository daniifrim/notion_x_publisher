export const AI_CONFIG = {
  model: 'gpt-4o' as const,
  defaultMaxTokens: 1000,
  defaultTemperature: 0.7,
  roles: {
    system: 'developer' as const,
    user: 'user' as const,
    assistant: 'assistant' as const
  }
} as const;

export type AIModel = typeof AI_CONFIG.model;
export type AIRole = typeof AI_CONFIG.roles[keyof typeof AI_CONFIG.roles];

export interface AIRequestConfig {
  maxTokens?: number;
  temperature?: number;
  model?: AIModel;
} 