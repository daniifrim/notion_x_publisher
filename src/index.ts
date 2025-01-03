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

// Export Lambda handlers with unique names
export { handler as scheduledHandler } from './scheduled';
export { handler as scraperHandler } from './functions/scraper';
export { handler as schedulerHandler } from './functions/scheduler';

// Export services
export * from './services/notion.service';
export * from './services/twitter.service';
export * from './services/ai.service';
export * from './services/scraper.service';
export * from './services/scheduler.service';

// Export types and configs
export * from './types/notion.types';
export * from './types/twitter.types';
export * from './types/ai.types';
export * from './types/scraper.types';
export * from './types/scheduler.types';
export * from './config/ai.config'; 