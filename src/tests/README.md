# Test Scripts

This directory contains various test and debug scripts for the Notion X Publisher project.

## Available Scripts

- `test-draft-processor.ts`: Tests the AI-powered draft processing functionality
- `test-notifications.ts`: Tests the notification system (Slack/email)
- `test-tweet-extraction.ts`: Tests tweet content extraction from Notion
- `test-scheduler.ts`: Tests the tweet scheduling and publishing pipeline
- `test-scraper.ts`: Tests the tweet scraping functionality
- `debug-twitter.ts`: Debug utility for Twitter API integration

## Usage

Run any test using npm:

```bash
npm run test:draft-processor
npm run test:notifications
npm run test:tweet-extraction
npm run test:scheduler
npm run test:scraper
npm run debug:twitter
```

## Requirements

- Valid `.env` file with all required credentials
- Notion database with proper schema
- Twitter API credentials
- Slack webhook URL (for notification tests)

## Note

These are development and debugging tools. They interact with real APIs but are designed
to be safe to run without affecting production data. 