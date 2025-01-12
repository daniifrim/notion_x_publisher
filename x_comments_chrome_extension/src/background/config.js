/**
 * Configuration management for the extension
 */
class Config {
    constructor() {
        this.config = {};
        this.isInitialized = false;
    }

    /**
     * Initialize configuration
     * @returns {Promise<void>}
     */
    async init() {
        if (this.isInitialized) return;

        // Load from chrome.storage.local
        const result = await chrome.storage.local.get(['DEEPSEEK_API_KEY']);
        this.config = result;

        // If API key is not set, use default test key
        if (!this.config.DEEPSEEK_API_KEY) {
            this.config.DEEPSEEK_API_KEY = 'sk-b22d31a46d384ddaa1a31429c897cce3';
        }

        this.isInitialized = true;
    }

    /**
     * Get a configuration value
     * @param {string} key - Configuration key
     * @returns {Promise<string>} Configuration value
     */
    async get(key) {
        if (!this.isInitialized) {
            await this.init();
        }
        return this.config[key];
    }

    /**
     * Set a configuration value
     * @param {string} key - Configuration key
     * @param {string} value - Configuration value
     * @returns {Promise<void>}
     */
    async set(key, value) {
        if (!this.isInitialized) {
            await this.init();
        }
        this.config[key] = value;
        await chrome.storage.local.set({ [key]: value });
    }
}

export default new Config(); 