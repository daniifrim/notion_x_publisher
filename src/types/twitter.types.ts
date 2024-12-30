export interface TwitterConfig {
  apiKey: string;
  apiKeySecret: string;
  accessToken: string;
  accessTokenSecret: string;
}

export interface Tweet {
  id: string;
  text: string;
  createdAt: Date;
} 