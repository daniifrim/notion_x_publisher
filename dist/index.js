"use strict";
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schedulerHandler = exports.scraperHandler = exports.default = void 0;
// Export the main handler as default for AWS Lambda
var scheduled_1 = require("./scheduled");
Object.defineProperty(exports, "default", { enumerable: true, get: function () { return scheduled_1.handler; } });
// Export other handlers with unique names
var scraper_1 = require("./functions/scraper");
Object.defineProperty(exports, "scraperHandler", { enumerable: true, get: function () { return scraper_1.handler; } });
var scheduler_1 = require("./functions/scheduler");
Object.defineProperty(exports, "schedulerHandler", { enumerable: true, get: function () { return scheduler_1.handler; } });
// Export services
__exportStar(require("./services/notion.service"), exports);
__exportStar(require("./services/twitter.service"), exports);
__exportStar(require("./services/ai.service"), exports);
__exportStar(require("./services/scraper.service"), exports);
__exportStar(require("./services/scheduler.service"), exports);
// Export types and configs
__exportStar(require("./types/notion.types"), exports);
__exportStar(require("./types/twitter.types"), exports);
__exportStar(require("./types/ai.types"), exports);
__exportStar(require("./types/scraper.types"), exports);
__exportStar(require("./types/scheduler.types"), exports);
__exportStar(require("./config/ai.config"), exports);
//# sourceMappingURL=index.js.map