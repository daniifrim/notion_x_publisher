const DEBUG = true;

export function createLogger(prefix) {
    return {
        log: (...args) => DEBUG && console.log(`[${prefix}]:`, ...args),
        error: (...args) => DEBUG && console.error(`[${prefix} Error]:`, ...args),
        warn: (...args) => DEBUG && console.warn(`[${prefix} Warning]:`, ...args)
    };
} 