export interface ScraperConfig {
  apifyToken: string;
  taskId: string;
}

export interface ScraperInput {
  customMapFunction: string;
  includeSearchTerms: boolean;
  maxItems: number;
  minimumRetweets: number;
  onlyImage: boolean;
  onlyQuote: boolean;
  onlyTwitterBlue: boolean;
  onlyVerifiedUsers: boolean;
  onlyVideo: boolean;
  searchTerms: string[];
  sort: 'Top' | 'Latest';
  start: string;
  startUrls: string[];
  tweetLanguage: string;
}

export interface ScrapedTweet {
  text: string;
  url: string;
  username: string;
  likeCount: number;
  retweetCount: number;
  createdAt: string;
  isVerified: boolean;
  isRetweet: boolean;
  hasMedia: boolean;
}

export interface ScraperResult {
  tweets: ScrapedTweet[];
  totalTweets: number;
  timestamp: string;
} 