/**
 * Main Application Entry Point
 * 
 * This is the primary entry point for the application when running in production.
 * It exports all the Lambda handlers and shared services that can be used by
 * different parts of the application.
 * 
 * Exports:
 * - Lambda Handlers: scheduled, scraper, scheduler
 * - Services: NotionService, TwitterService, AIService, ScraperService
 * - Types and Configurations
 * 
 * Usage:
 * - AWS Lambda uses this to import the handlers
 * - Other parts of the application import services from here
 * 
 * Related Files:
 * - scheduled.ts: Main tweet publisher Lambda
 * - functions/scraper/index.ts: Tweet scraper Lambda
 * - functions/scheduler/index.ts: Tweet scheduler Lambda
 * 
 * Note: This is the main production entry point
 */

import { handler as scheduledHandler } from './scheduled';
import { handler as webhookHandler } from './webhook';

export const scheduled = scheduledHandler;
export const webhook = webhookHandler;

module.exports = {
  scheduled,
  webhook
}; 