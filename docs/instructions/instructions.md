# Notion X Publisher - Instructions

## Architecture Overview

### Lambda Functions and Entry Points

1. **Main Lambda Function (`notion-x-publisher`)**
   - Primary function that handles multiple entry points
   - Default handler: `index.default` (from `scheduled.ts`)
   - Handles webhook requests and scheduled tasks
   - Memory: 256MB
   - Timeout: 300 seconds

2. **Function Entry Points**
   ```
   src/
   ├── index.ts              # Main entry point, exports all handlers
   ├── scheduled.ts          # Default handler (main publisher)
   └── functions/
       ├── scheduler/        # Tweet publishing (5-min intervals)
       ├── scraper/         # Tweet scraping (hourly)
       └── ai-processor/    # Draft processing (30-min intervals)
   ```

3. **Scheduled Tasks**
   - Draft Processing: Every 30 minutes
     - Handler: `src/functions/ai-processor/index.handler`
     - Memory: 1024MB
     - Purpose: Generate tweet variations from drafts
   
   - Tweet Publishing: Every 5 minutes
     - Handler: `src/functions/scheduler/index.handler`
     - Memory: 256MB
     - Purpose: Check and publish scheduled tweets
   
   - Tweet Scraping: Every hour
     - Handler: `src/functions/scraper/index.handler`
     - Memory: 512MB
     - Purpose: Scrape and analyze tweets

4. **Webhook Handler**
   - Triggered by Notion button clicks
   - Uses the default handler
   - Processes manual tweet variation requests
   - Integrated through API Gateway

### Service Layer

Our services are shared across all functions and entry points:

1. **Core Services**
   - `NotionService`: Manages Notion database operations
   - `TwitterService`: Handles Twitter API interactions
   - `AIService`: Manages OpenAI integrations
   - `ScraperService`: Handles tweet scraping
   - `SchedulerService`: Manages tweet scheduling
   - `DraftProcessorService`: Processes draft tweets

2. **Service Organization**
   ```
   src/services/
   ├── notion.service.ts      # Notion API integration
   ├── twitter.service.ts     # Twitter API integration
   ├── ai.service.ts         # OpenAI integration
   ├── scraper.service.ts    # Tweet scraping logic
   ├── scheduler.service.ts  # Tweet scheduling
   └── draft-processor.service.ts  # Draft processing
   ```

### AWS Configuration

1. **API Gateway Setup**
   - Create HTTP API
   - Integration: Select `notion-x-publisher` function
   - Method: POST
   - Path: /webhook
   - The function's default handler will process webhook requests

2. **EventBridge Rules**
   - Configured through `serverless.yml`
   - Each scheduled task has its own rule
   - No manual EventBridge setup needed

3. **Environment Variables**
   ```
   NOTION_API_KEY=your_notion_api_key
   NOTION_DATABASE_ID=your_database_id
   TWITTER_API_KEY=your_twitter_api_key
   TWITTER_API_SECRET=your_twitter_api_secret
   TWITTER_ACCESS_TOKEN=your_access_token
   TWITTER_ACCESS_TOKEN_SECRET=your_access_token_secret
   OPENAI_API_KEY=your_openai_api_key
   WEBHOOK_SECRET=your_webhook_secret
   ```

### Development Workflow

1. **Local Testing**
   - Use `npm run test:local` for local development
   - Simulates Lambda environment
   - Tests all services without deployment

2. **Deployment**
   - Use `npm run deploy` to deploy all functions
   - Serverless Framework handles configuration
   - Updates all function configurations

3. **Monitoring**
   - CloudWatch Logs for each function
   - Separate log groups for each handler
   - Monitor execution times and errors

### Best Practices

1. **Function Organization**
   - Keep handlers lightweight
   - Delegate business logic to services
   - Share code through service layer

2. **Error Handling**
   - Implement retries for transient failures
   - Log errors with context
   - Update Notion status on failures

3. **Performance**
   - Optimize cold starts
   - Use appropriate memory settings
   - Monitor execution times

### Troubleshooting

1. **Common Issues**
   - Check CloudWatch logs for errors
   - Verify environment variables
   - Test services individually

2. **Debugging**
   - Use local development environment
   - Check service initialization
   - Monitor API rate limits

## Project Overview
This project automates the publication of tweets from a Notion database to X (formerly Twitter). It uses AWS Lambda for scheduling, handles rate limits and error cases gracefully, and includes AI-powered tweet analysis and thread support.

## Core Functionalities
1. Access a Notion database containing tweets and threads
2. Monitor tweets ready for publication and their scheduled dates
3. Automate tweet publication through X API
4. Check Notion database every five minutes for ready tweets
5. Schedule tweets based on their specified publication date
6. Update tweet status and store tweet URLs in Notion
7. Scrape and analyze tweets using AI
8. Support for Twitter threads with proper ordering
9. Automatic retry mechanism for failed tweets
10. Support for multiple images in tweets (up to 4)

## Technical Architecture

### File Structure
```
/src
  /functions
    /scheduler     # Tweet scheduling Lambda
    /scraper      # Tweet scraping Lambda
    /ai-processor # AI analysis Lambda
  /services
    - notion.service.ts    # Notion API integration
    - twitter.service.ts   # Twitter API integration
    - scheduler.service.ts # Scheduling logic
    - scraper.service.ts  # Tweet scraping logic
    - ai.service.ts      # OpenAI integration
  /types
    - notion.types.ts    # Notion-related interfaces
    - twitter.types.ts   # Twitter-related interfaces
    - scheduler.types.ts # Scheduler-related interfaces
    - scraper.types.ts  # Scraper-related interfaces
    - ai.types.ts      # AI-related interfaces
  - index.ts          # Main Lambda handler
  - scheduled.ts      # Scheduled Lambda handler
  - local.ts         # Local development runner
```

### Notion Database Schema
Required properties:
- `Name`: Title field (contains tweet content or thread title)
- `Scheduled Time`: Date field (when to publish)
- `Status`: Select field with options:
  - Draft
  - Ready To Publish
  - Processing
  - Published
  - Failed to Post
- `URL`: URL field (stores tweet URL after publishing)
- `Thread`: Checkbox field (indicates if part of a thread)
- `Error`: Text field (stores error messages if posting fails)
- `Effort`: Select field (optional metadata)
- `Engagement`: Select field (optional metadata)

### Environment Variables
```env
# Notion Configuration
NOTION_API_KEY=your_notion_api_key
NOTION_DATABASE_ID=your_database_id

# Twitter Configuration
TWITTER_API_KEY=your_twitter_api_key
TWITTER_API_SECRET=your_twitter_api_secret
TWITTER_ACCESS_TOKEN=your_twitter_access_token
TWITTER_ACCESS_TOKEN_SECRET=your_twitter_access_token_secret

# Apify Configuration
APIFY_API_TOKEN=your_apify_token
APIFY_TASK_ID=your_task_id

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key
```

### AWS Lambda Configuration
- Runtime: Node.js 18.x
- Memory:
  - Scheduler: 256MB
  - Scraper: 512MB
  - AI Processor: 1024MB
- Timeout:
  - Scheduler: 60 seconds
  - Scraper: 300 seconds
  - AI Processor: 300 seconds
- Triggers:
  - Scheduler: Rate(5 minutes)
  - Scraper: Rate(1 hour)
  - AI Processor: Rate(30 minutes)
- Handler Configuration:
  - Main function: `index.handler`
  - Scraper: `index.scraperHandler`
  - Scheduler: `index.schedulerHandler`

## Deployment

### GitHub Actions Deployment
The project uses GitHub Actions for automatic deployment to AWS Lambda:

1. Required Secrets:
   ```
   AWS_ACCESS_KEY_ID=your_aws_access_key
   AWS_SECRET_ACCESS_KEY=your_aws_secret_key
   AWS_REGION=your_aws_region (e.g., us-east-2)
   ```

2. IAM Policy Requirements:
   - Lambda function update permissions
   - CloudWatch Logs permissions
   - Minimum policy example:
     ```json
     {
       "Version": "2012-10-17",
       "Statement": [
         {
           "Effect": "Allow",
           "Action": [
             "lambda:UpdateFunctionCode",
             "lambda:UpdateFunctionConfiguration",
             "lambda:GetFunction",
             "lambda:GetFunctionConfiguration"
           ],
           "Resource": "arn:aws:lambda:region:account-id:function:notion-x-publisher"
         },
         {
           "Effect": "Allow",
           "Action": [
             "logs:CreateLogGroup",
             "logs:CreateLogStream",
             "logs:PutLogEvents"
           ],
           "Resource": "arn:aws:logs:region:account-id:*"
         }
       ]
     }
     ```

3. Deployment Process:
   - Triggered on push to main branch
   - Builds TypeScript code
   - Installs production dependencies
   - Creates deployment package
   - Updates Lambda function

4. Monitoring Deployments:
   - Check GitHub Actions tab for deployment status
   - Review CloudWatch logs for function execution
   - Verify Lambda function configuration

## Features

### Tweet Scheduling
- Precise 5-minute scheduling windows
- Support for single tweets and threads
- Automatic status updates
- Error handling with retries
- Rate limit management

### Thread Support
- Create threads using dividers in Notion
- Automatic thread ordering
- Single status update for all thread tweets
- Thread URL tracking

### Tweet Scraping
- Configurable search terms
- Verified user filtering
- Minimum retweet threshold
- Support for various tweet types (text, media, quotes)
- Rate limit handling

### AI Analysis
- Tweet content analysis
- Structured markdown summaries
- Source linking and attribution
- Engagement metrics analysis
- Customizable analysis prompts

### Tweet Media Support
- Support for multiple media types:
  - Images: Up to 4 images per tweet
  - GIFs: Single animated GIF per tweet
  - Videos: Single video per tweet
- Media Type Constraints:
  - Images:
    - Formats: JPG, PNG, WEBP
    - Maximum size: 5MB (mobile) / 15MB (web)
    - Layout Handling:
      - Two Images: Side by side (7:8 aspect ratio each)
      - Three Images: One large (7:8) + two stacked (4:7 each)
      - Four Images: 2x2 grid (2:1 aspect ratio each)
  - GIFs:
    - Format: GIF only
    - Maximum size: 15MB
    - One GIF per tweet
    - Cannot be combined with other media
  - Videos:
    - Formats: MP4, MOV
    - Maximum size: 512MB
    - Maximum duration: 2 minutes and 20 seconds
    - One video per tweet
    - Cannot be combined with other media
- Media Validation:
  - Format validation
  - Size validation
  - Count validation
  - Combination rules enforcement
- Media Storage:
  - Media files are stored as blocks in Notion
  - Automatic media type detection
  - Support for both single tweets and threads
  - Proper error handling for invalid media

### Media Handling Best Practices
1. File Size Optimization:
   - Compress images before uploading to Notion
   - Use appropriate video codecs (H.264 for MP4)
   - Optimize GIFs for web usage

2. Media Combinations:
   - Use multiple images for visual storytelling
   - Keep GIFs and videos as standalone media
   - Consider thread structure when using media

3. Error Handling:
   - Validation before upload
   - Clear error messages for media issues
   - Automatic retry for transient failures

## Error Handling
1. Rate Limit Exceeded:
   - Tweet marked as "Failed to Post"
   - Clear error message with reset time
   - Automatic retry with configurable delay
   - Maximum retry attempts

2. API Errors:
   - Detailed error logging
   - Status updates in Notion
   - Error message storage
   - Automatic retry mechanism

## Local Development
1. Set up environment:
   ```bash
   cp .env.example .env
   # Fill in your API keys
   ```

2. Run tests:
   ```bash
   npm run test:scheduler  # Test scheduler
   npm run test:scraper   # Test scraper
   ```

3. Run locally:
   ```bash
   npm run start:local    # Run local version
   npm run offline       # Run serverless offline
   ```

## Monitoring
- CloudWatch Logs for execution logs
- Notion database for tweet status
- Error tracking through Lambda metrics
- Detailed processing results in logs

## Security Considerations
1. API Keys:
   - Store in AWS Lambda environment variables
   - Never commit to version control
   - Rotate regularly
   - Separate keys for different environments

2. Permissions:
   - Use minimal IAM roles
   - Separate development/production credentials
   - Rate limit protection
   - Error handling for API failures

## Maintenance
1. Regular checks:
   - Monitor rate limit usage
   - Check failed tweets
   - Verify Lambda execution logs
   - Review AI analysis quality

2. Updates:
   - Keep dependencies updated
   - Monitor API version changes
   - Review security advisories
   - Update AI prompts as needed

## Important Notes

1. OpenAI Model Configuration
   - If the model is `gpt-4o` use `gpt-4o` as the model name
   - Do not try to change it to other variant
   - Do not change this to `gpt-4` or any other variant

## Manual Tweet Variation Generation

The system supports manual generation of tweet variations through a webhook triggered by a button in Notion:

1. **Button Setup in Notion**
   - Each draft tweet has a "Create Variations" button
   - When clicked, it triggers the webhook to generate variations
   - The button is only active for tweets in "Draft" status

2. **Webhook Functionality**
   - Validates the webhook secret for security
   - Retrieves the draft tweet's title from the database
   - Uses the AI service to generate 5 variations in different styles:
     - Straightforward
     - Casual and conversational
     - Engaging with a question
     - Humorous or witty
     - Thought-provoking

3. **Response Handling**
   - Updates the Notion page with generated variations
   - Changes status to "Processed" when successful
   - Sets status to "Failed to Post" with error message if unsuccessful

4. **Usage**
   - Click the "Create Variations" button in Notion
   - Wait for the webhook to process (typically a few seconds)
   - Review the generated variations in the page content
   - Select preferred variation for scheduling

5. **Error Handling**
   - Validates webhook payload and secret
   - Checks page status before processing
   - Provides detailed error messages in Notion
   - Implements retry mechanism for transient failures