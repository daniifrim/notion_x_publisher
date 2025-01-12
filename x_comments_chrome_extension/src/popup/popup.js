// Debug logger
const DEBUG = true;
const logger = {
    log: (...args) => DEBUG && console.log('[Thread Insights]:', ...args),
    error: (...args) => DEBUG && console.error('[Thread Insights Error]:', ...args),
    warn: (...args) => DEBUG && console.warn('[Thread Insights Warning]:', ...args)
};

document.addEventListener('DOMContentLoaded', () => {
    logger.log('Popup initialized');
    // DOM Elements
    const initialState = document.getElementById('initial-state');
    const loadingState = document.getElementById('loading-state');
    const resultsState = document.getElementById('results-state');
    const analyzeBtn = document.getElementById('analyze-btn');
    const backBtn = document.getElementById('back-btn');
    const threadSummary = document.getElementById('thread-summary');
    const suggestionsList = document.getElementById('suggestions-list');
    const statusMessage = document.getElementById('status-message');
    const phases = document.querySelectorAll('.phase');

    // Loading phases management
    const updateLoadingPhase = (phase) => {
        logger.log(`Updating loading phase: ${phase}`);
        phases.forEach(p => {
            const isCurrentPhase = p.dataset.phase === phase;
            const shouldBeCompleted = getPhaseIndex(p.dataset.phase) < getPhaseIndex(phase);
            
            p.classList.remove('active', 'completed');
            if (isCurrentPhase) {
                p.classList.add('active');
                statusMessage.textContent = phase === 'scraping' ? 
                    'Analyzing Thread...' : 
                    'Generating AI Suggestions...';
            } else if (shouldBeCompleted) {
                p.classList.add('completed');
            }
        });
    };

    const getPhaseIndex = (phase) => {
        const phaseOrder = ['scraping', 'generating'];
        return phaseOrder.indexOf(phase);
    };

    // State Management
    const states = {
        initial: () => {
            logger.log('Switching to initial state');
            initialState.classList.remove('hidden');
            loadingState.classList.add('hidden');
            resultsState.classList.add('hidden');
            // Reset phases
            phases.forEach(p => p.classList.remove('active', 'completed'));
            statusMessage.textContent = 'Analyzing Thread...';
        },
        loading: () => {
            logger.log('Switching to loading state');
            initialState.classList.add('hidden');
            loadingState.classList.remove('hidden');
            resultsState.classList.add('hidden');
        },
        results: () => {
            logger.log('Switching to results state');
            initialState.classList.add('hidden');
            loadingState.classList.add('hidden');
            resultsState.classList.remove('hidden');
        }
    };

    // Listen for progress updates from background script
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.action === 'progressUpdate') {
            logger.log('Received progress update:', message);
            updateLoadingPhase(message.phase);
        }
    });

    // Event Handlers
    analyzeBtn.addEventListener('click', async () => {
        logger.log('Analyze button clicked');
        states.loading();
        updateLoadingPhase('scraping');
        
        try {
            // Get the current active tab
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            logger.log('Current tab:', tab);
            
            const response = await chrome.runtime.sendMessage({
                action: 'analyzeThread',
                tabId: tab.id
            });
            
            logger.log('Received response:', response);

            if (response.error) {
                throw new Error(response.error);
            }

            // Display results immediately
            displayResults(response);
            states.results();
            
        } catch (error) {
            logger.error('Error analyzing thread:', error);
            // TODO: Add error state handling
            states.initial();
        }
    });

    backBtn.addEventListener('click', () => {
        logger.log('Back button clicked');
        states.initial();
    });

    // Helper Functions
    function displayResults(data) {
        logger.log('Displaying results:', data);
        // Display summary
        threadSummary.textContent = data.summary;

        // Display suggestions
        suggestionsList.innerHTML = '';
        data.suggestions.forEach((suggestion, index) => {
            const suggestionElement = document.createElement('div');
            suggestionElement.className = 'suggestion-item';
            suggestionElement.innerHTML = `
                ${suggestion}
                <button class="copy-btn" data-suggestion="${index}">Copy</button>
            `;
            suggestionsList.appendChild(suggestionElement);
        });

        // Add copy functionality
        suggestionsList.addEventListener('click', (e) => {
            if (e.target.classList.contains('copy-btn')) {
                const index = e.target.dataset.suggestion;
                navigator.clipboard.writeText(data.suggestions[index]);
                logger.log('Copied suggestion:', data.suggestions[index]);
                
                // Visual feedback
                const originalText = e.target.textContent;
                e.target.textContent = 'Copied!';
                e.target.classList.add('copied');
                setTimeout(() => {
                    e.target.textContent = originalText;
                    e.target.classList.remove('copied');
                }, 1500);
            }
        });
    }

    // Initialize
    states.initial();
}); 