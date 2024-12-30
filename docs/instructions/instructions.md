# Notion X Publisher

## Project Overview
This project automates the publication of tweets from a Notion database to X (formerly Twitter). It uses AWS Lambda for scheduling and handles rate limits and error cases gracefully.

## Core Functionalities
1. Access a Notion database containing tweets
2. Monitor tweets ready for publication and their scheduled dates
3. Automate tweet publication through X API
4. Check Notion database every five minutes for ready tweets
5. Schedule tweets based on their specified publication date
6. Update tweet status and store tweet URLs in Notion

## Technical Architecture

### File Structure
```
/src
  /services
    - notion.service.ts    # Notion API integration
    - twitter.service.ts   # Twitter API integration
    - scheduler.service.ts # Scheduling logic
  /types
    - notion.types.ts     # Notion-related interfaces
    - twitter.types.ts    # Twitter-related interfaces
  - index.ts             # Main Lambda handler
  - scheduled.ts         # Scheduled Lambda handler
  - local.ts            # Local development runner
```

### Notion Database Schema
Required properties:
- `Name`: Title field (contains tweet content)
- `Publication Date`: Date field (when to publish)
- `Status`: Select field with options:
  - Draft
  - Ready To Publish
  - Published
  - Failed to Post
- `URL`: URL field (stores tweet URL after publishing)

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
```

### AWS Lambda Configuration
- Runtime: Node.js 18.x
- Memory: 256MB (minimum)
- Timeout: 30 seconds
- Trigger: EventBridge (CloudWatch Events)
  - Schedule: Rate(5 minutes)

## Deployment Instructions

### 1. Prepare Deployment Package
1. Install dependencies:
   ```bash
   npm install
   ```

2. Build the project:
   ```bash
   npm run build
   ```

3. Create deployment ZIP:
   - Include:
     - /dist directory (compiled code)
     - package.json
     - package-lock.json
     - node_modules

### 2. AWS Lambda Setup
1. Create new Lambda function:
   - Name: notion-x-publisher
   - Runtime: Node.js 18.x
   - Architecture: x86_64

2. Configure function:
   - Handler: dist/scheduled.handler
   - Memory: 256MB
   - Timeout: 30 seconds
   - Environment variables: Add all required variables

3. Set up EventBridge trigger:
   - Create new rule
   - Schedule pattern: rate(5 minutes)
   - Target: Your Lambda function

### 3. IAM Permissions
Required permissions:
- CloudWatch Logs:
  - logs:CreateLogGroup
  - logs:CreateLogStream
  - logs:PutLogEvents

## Rate Limits and Scheduling
- Twitter API: 25 tweets per 24 hours
- Scheduling window: 5-minute precision
- Retry mechanism: Failed tweets marked for next run

## Error Handling
1. Rate Limit Exceeded:
   - Tweet marked as "Failed to Post"
   - Clear error message with reset time
   - Automatic retry on next available slot

2. API Errors:
   - Detailed error logging
   - Status updates in Notion
   - No tweet loss guarantee

## Local Development
1. Set up environment:
   ```bash
   cp .env.example .env
   # Fill in your API keys
   ```

2. Run locally:
   ```bash
   npm run local     # Run once
   npm run dev      # Run with auto-reload
   ```

3. Debug Twitter API:
   ```bash
   npm run debug:twitter
   ```

## Monitoring
- CloudWatch Logs for execution logs
- Notion database for tweet status
- Error tracking through Lambda metrics

## Security Considerations
1. API Keys:
   - Store in AWS Lambda environment variables
   - Never commit to version control
   - Rotate regularly

2. Permissions:
   - Use minimal IAM roles
   - Separate development/production credentials

## Maintenance
1. Regular checks:
   - Monitor rate limit usage
   - Check failed tweets
   - Verify Lambda execution logs

2. Updates:
   - Keep dependencies updated
   - Monitor API version changes
   - Review security advisories