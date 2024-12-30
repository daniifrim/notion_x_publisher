export interface AIConfig {
  apiKey: string;
  model: string;
  maxTokens: number;
  temperature: number;
}

export interface TweetAnalysis {
  summary: string;
  tweets: ProcessedTweet[];
  timestamp: string;
}

export interface ProcessedTweet {
  text: string;
  url: string;
  username: string;
  likeCount: number;
  retweetCount: number;
}

export interface AnalysisPrompt {
  profile: string;
  interests: string[];
  tweets: ProcessedTweet[];
}

export interface AnalysisResult {
  markdown: string;
  jsonOutput: {
    summary: string;
    tweets: ProcessedTweet[];
  };
} 