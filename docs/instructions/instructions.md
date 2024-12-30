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

### 1. GitHub Setup
1. Ensure your code is on GitHub:
   - All source code
   - `package.json` and `package-lock.json`
   - `.gitignore` should exclude:
     ```
     node_modules/
     dist/
     .env
     ```
   - Commit and push all changes

### 2. AWS Lambda Setup

#### 2.1 Create Lambda Function
1. Go to AWS Lambda Console
2. Click "Create function"
3. Select "Author from scratch"
   - Function name: `notion-x-publisher`
   - Runtime: Node.js 18.x
   - Architecture: x86_64
4. Click "Create function"

#### 2.2 Set Up GitHub Integration
1. In Lambda function page:
   - Go to "Code source" section
   - Click "Add trigger"
   - Select "GitHub"
   - Click "Configure new GitHub connection"
   - Follow OAuth flow to connect AWS and GitHub
   - Select your repository
   - Choose main/master branch
   - Configure webhook events (push to main)

#### 2.3 Configure Build Settings
1. Create `buildspec.yml` in your repository:
   ```yaml
   version: 0.2
   phases:
     install:
       runtime-versions:
         nodejs: 18
       commands:
         - npm install
     build:
       commands:
         - npm run build
   artifacts:
     files:
       - dist/**/*
       - node_modules/**/*
       - package.json
       - package-lock.json
   ```

#### 2.4 Configure Function
1. Set handler:
   - Go to "Runtime settings"
   - Click "Edit"
   - Set Handler to: `dist/scheduled.handler`

2. Set environment variables:
   - Go to "Configuration" tab
   - Click "Environment variables"
   - Add all required variables:
     ```
     NOTION_API_KEY
     NOTION_DATABASE_ID
     TWITTER_API_KEY
     TWITTER_API_SECRET
     TWITTER_ACCESS_TOKEN
     TWITTER_ACCESS_TOKEN_SECRET
     ```

3. Adjust settings:
   - Memory: 256MB
   - Timeout: 30 seconds

### 3. Set Up EventBridge Trigger
1. In Lambda console:
   - Click "Add trigger"
   - Select "EventBridge (CloudWatch Events)"
   - Create new rule:
     - Name: `notion-x-publisher-schedule`
     - Schedule expression: `rate(5 minutes)`
   - Click "Add"

### 4. Verify Deployment
1. Check CloudWatch Logs:
   - Go to "Monitor" tab
   - Click "View CloudWatch logs"
   - Verify function is running

2. Test function:
   - Create test event
   - Run test
   - Check logs and Notion database

### 5. Continuous Deployment
- Any push to main branch will:
  1. Trigger AWS build
  2. Deploy new code to Lambda
  3. Log build status in CloudWatch

## IAM Permissions
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