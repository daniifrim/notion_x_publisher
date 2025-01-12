import config from '../background/config.js';

// Load saved API key
document.addEventListener('DOMContentLoaded', async () => {
    const apiKey = await config.get('DEEPSEEK_API_KEY');
    if (apiKey) {
        document.getElementById('apiKey').value = apiKey;
    }
});

// Save API key
document.getElementById('save').addEventListener('click', async () => {
    const apiKey = document.getElementById('apiKey').value.trim();
    const status = document.getElementById('status');

    if (!apiKey) {
        showStatus('Please enter an API key', 'error');
        return;
    }

    try {
        await config.set('DEEPSEEK_API_KEY', apiKey);
        showStatus('API key saved successfully!', 'success');
    } catch (error) {
        showStatus('Failed to save API key: ' + error.message, 'error');
    }
});

function showStatus(message, type) {
    const status = document.getElementById('status');
    status.textContent = message;
    status.className = `status ${type}`;
    status.style.display = 'block';

    setTimeout(() => {
        status.style.display = 'none';
    }, 3000);
} 