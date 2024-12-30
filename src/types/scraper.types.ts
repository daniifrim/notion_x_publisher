export interface ScraperConfig {
  apifyToken: string;
  taskId: string;
}

export interface ScraperInput {
  customMapFunction: string;
  start: string;
  end: string;
  includeSearchTerms: boolean;
  maxItems: number;
  minimumFavorites?: number;
  minimumReplies?: number;
  minimumRetweets: number;
  onlyImage: boolean;
  onlyQuote: boolean;
  onlyTwitterBlue: boolean;
  onlyVerifiedUsers: boolean;
  onlyVideo: boolean;
  searchTerms: string[];
  sort: "Latest" | "Top";
  startUrls: string[];
  tweetLanguage: string;
  geocode?: string;
  placeObjectId?: string;
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