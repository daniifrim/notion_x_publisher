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

export interface ThreadTweet extends Tweet {
  replyToId?: string;
  position: number;
}

export interface Thread {
  tweets: ThreadTweet[];
  threadUrl?: string;
} 