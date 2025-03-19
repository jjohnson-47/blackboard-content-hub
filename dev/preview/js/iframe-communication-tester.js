/**
 * Iframe Communication Tester
 * 
 * This module provides tools for testing postMessage communication between
 * the parent page and the iframe, essential for developing interactive
 * educational components that need to communicate with their container.
 */

class IframeCommunicationTester {
  constructor(previewFrame) {
    this.previewFrame = previewFrame;
    this.messageLog = [];
    this.eventListeners = [];
    this.originRestriction = '*'; // Default to allow all origins for testing
    this.init();
  }
  
  /**
   * Initialize the communication tester
   */
  init() {
    // Create UI
    this.createUI();
    
    // Set up event listener for messages from iframe
    this.setupMessageListener();
  }
  
  /**
   * Create the UI for the communication tester
   */
  createUI() {
    // Create container
    const container = document.createElement('div');
    container.id = 'iframe-communication-tester';
    container.className = 'communication-tester';
    container.style.display = 'none';
    
    // Create header
    const header = document.createElement('div');
    header.className = 'communication-tester-header';
    header.innerHTML = `
      <h3>Iframe Communication Tester</h3>
      <button id="close-communication-tester" class="btn btn-icon btn-outline">
        <span class="material-icons">close</span>
      </button>
    `;
    
    // Create content
    const content = document.createElement('div');
    content.className = 'communication-tester-content';
    
    // Create send message section
    const sendSection = document.createElement('div');
    sendSection.className = 'communication-tester-section';
    sendSection.innerHTML = `
      <h4>Send Message to Iframe</h4>
      <div class="form-group">
        <label class="form-label" for="message-type">Message Type</label>
        <input type="text" id="message-type" class="form-control" placeholder="e.g., command, event, data" value="command">
      </div>
      <div class="form-group">
        <label class="form-label" for="message-data">Message Data (JSON)</label>
        <textarea id="message-data" class="form-control" rows="4" placeholder='{"action": "getData", "params": {"id": 123}}'>{
  "action": "getData",
  "params": {
    "id": 123
  }
}</textarea>
      </div>
      <div class="form-group">
        <label class="form-label" for="target-origin">Target Origin</label>
        <input type="text" id="target-origin" class="form-control" placeholder="* (any) or https://example.com" value="*">
        <div class="form-text">Use * for development, but specify exact origin in production</div>
      </div>
      <button id="send-message-btn" class="btn btn-primary">
        <span class="material-icons">send</span>
        Send Message
      </button>
    `;
    
    // Create receive message section
    const receiveSection = document.createElement('div');
    receiveSection.className = 'communication-tester-section';
    receiveSection.innerHTML = `
      <h4>Received Messages</h4>
      <div class="form-group">
        <label class="form-label" for="origin-restriction">Accept Messages From</label>
        <input type="text" id="origin-restriction" class="form-control" placeholder="* (any) or https://example.com" value="*">
        <div class="form-text">Use * for development, but specify exact origin in production</div>
      </div>
      <div class="message-log-container">
        <div id="message-log" class="message-log"></div>
      </div>
      <button id="clear-log-btn" class="btn btn-outline">
        <span class="material-icons">delete</span>
        Clear Log
      </button>
    `;
    
    // Create code snippets section
    const snippetsSection = document.createElement('div');
    snippetsSection.className = 'communication-tester-section';
    snippetsSection.innerHTML = `
      <h4>Code Snippets</h4>
      <div class="tabs">
        <div class="tab-buttons">
          <button class="tab-button active" data-tab="parent-code">Parent Page</button>
          <button class="tab-button" data-tab="iframe-code">Iframe</button>
        </div>
        <div class="tab-content active" id="parent-code">
          <pre><code>// Send message to iframe
const iframe = document.getElementById('myIframe');
iframe.contentWindow.postMessage({
  type: 'command',
  action: 'getData',
  params: { id: 123 }
}, '*'); // Use specific origin in production

// Listen for responses
window.addEventListener('message', function(event) {
  // Always verify origin in production
  // if (event.origin !== 'https://trusted-domain.com') return;
  
  console.log('Received data:', event.data);
}, false);</code></pre>
          <button id="copy-parent-code" class="btn btn-sm btn-outline">
            <span class="material-icons">content_copy</span>
            Copy
          </button>
        </div>
        <div class="tab-content" id="iframe-code">
          <pre><code>// Listen for messages from parent
window.addEventListener('message', function(event) {
  // Always verify origin in production
  // if (event.origin !== 'https://trusted-domain.com') return;
  
  // Process the message
  if (event.data.type === 'command' && event.data.action === 'getData') {
    // Send response back to parent
    window.parent.postMessage({
      type: 'response',
      data: { result: 'success', value: 42 }
    }, event.origin);
  }
}, false);</code></pre>
          <button id="copy-iframe-code" class="btn btn-sm btn-outline">
            <span class="material-icons">content_copy</span>
            Copy
          </button>
        </div>
      </div>
    `;
    
    // Assemble UI
    content.appendChild(sendSection);
    content.appendChild(receiveSection);
    content.appendChild(snippetsSection);
    container.appendChild(header);
    container.appendChild(content);
    
    // Add to page
    document.body.appendChild(container);
    
    // Add button to toolbar
    const toolbarSection = document.querySelector('.toolbar-section:last-child');
    if (toolbarSection) {
      const button = document.createElement('button');
      button.id = 'open-communication-tester';
      button.className = 'btn btn-outline btn-sm';
      button.title = 'Iframe Communication Tester';
      button.innerHTML = `
        <span class="material-icons">swap_horiz</span>
        Test Communication
      `;
      toolbarSection.appendChild(button);
      
      // Add event listener
      button.addEventListener('click', () => this.toggleTester());
    }
    
    // Add event listeners
    this.addEventListeners();
    
    // Add styles
    this.addStyles();
  }
  
  /**
   * Add event listeners to UI elements
   */
  addEventListeners() {
    // Close button
    const closeButton = document.getElementById('close-communication-tester');
    if (closeButton) {
      closeButton.addEventListener('click', () => this.toggleTester(false));
    }
    
    // Send message button
    const sendButton = document.getElementById('send-message-btn');
    if (sendButton) {
      sendButton.addEventListener('click', () => this.sendMessage());
    }
    
    // Clear log button
    const clearButton = document.getElementById('clear-log-btn');
    if (clearButton) {
      clearButton.addEventListener('click', () => this.clearLog());
    }
    
    // Origin restriction input
    const originInput = document.getElementById('origin-restriction');
    if (originInput) {
      originInput.addEventListener('change', (e) => {
        this.originRestriction = e.target.value;
      });
    }
    
    // Tab buttons
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons and content
        tabButtons.forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => {
          content.classList.remove('active');
        });
        
        // Add active class to clicked button and corresponding content
        button.classList.add('active');
        const tabId = button.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
      });
    });
    
    // Copy buttons
    const copyParentButton = document.getElementById('copy-parent-code');
    if (copyParentButton) {
      copyParentButton.addEventListener('click', () => {
        const code = document.querySelector('#parent-code code').textContent;
        this.copyToClipboard(code);
        this.showToast('Copied to clipboard');
      });
    }
    
    const copyIframeButton = document.getElementById('copy-iframe-code');
    if (copyIframeButton) {
      copyIframeButton.addEventListener('click', () => {
        const code = document.querySelector('#iframe-code code').textContent;
        this.copyToClipboard(code);
        this.showToast('Copied to clipboard');
      });
    }
  }
  
  /**
   * Add styles for the communication tester
   */
  addStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .communication-tester {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 80%;
        max-width: 800px;
        height: 80%;
        max-height: 600px;
        background-color: white;
        border-radius: 8px;
        box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
        z-index: 1000;
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }
      
      .communication-tester-header {
        padding: 15px;
        background-color: #4a148c;
        color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      
      .communication-tester-header h3 {
        margin: 0;
        font-size: 1.2rem;
      }
      
      .communication-tester-header button {
        color: white;
        border: none;
      }
      
      .communication-tester-content {
        flex: 1;
        overflow-y: auto;
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 20px;
      }
      
      .communication-tester-section {
        background-color: #f8f9fa;
        border-radius: 8px;
        padding: 15px;
        border: 1px solid #e0e0e0;
      }
      
      .communication-tester-section h4 {
        margin-top: 0;
        margin-bottom: 15px;
        color: #4a148c;
        font-size: 1rem;
      }
      
      .message-log-container {
        background-color: #f0f0f0;
        border: 1px solid #ddd;
        border-radius: 4px;
        height: 150px;
        overflow-y: auto;
        margin-bottom: 10px;
        padding: 10px;
        font-family: monospace;
        font-size: 0.9rem;
      }
      
      .message-log {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      
      .message-item {
        padding: 8px;
        border-radius: 4px;
        background-color: white;
        border-left: 3px solid #4a148c;
        box-shadow: 0 1px 3px rgba(0,0,0,0.12);
      }
      
      .message-item.sent {
        border-left-color: #00897b;
      }
      
      .message-item.received {
        border-left-color: #4a148c;
      }
      
      .message-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 5px;
        font-size: 0.8rem;
        color: #757575;
      }
      
      .message-content {
        white-space: pre-wrap;
        word-break: break-word;
      }
      
      .tabs {
        display: flex;
        flex-direction: column;
      }
      
      .tab-buttons {
        display: flex;
        border-bottom: 1px solid #e0e0e0;
        margin-bottom: 15px;
      }
      
      .tab-button {
        background-color: transparent;
        color: #333;
        border: none;
        padding: 8px 16px;
        cursor: pointer;
        font-size: 0.9rem;
      }
      
      .tab-button:hover {
        background-color: #f0f0f0;
      }
      
      .tab-button.active {
        color: #4a148c;
        border-bottom: 2px solid #4a148c;
      }
      
      .tab-content {
        display: none;
      }
      
      .tab-content.active {
        display: block;
      }
      
      .tab-content pre {
        background-color: #f5f5f5;
        padding: 15px;
        border-radius: 4px;
        overflow-x: auto;
        margin: 0 0 10px 0;
      }
      
      .tab-content code {
        font-family: 'Fira Code', 'Consolas', 'Monaco', monospace;
        font-size: 0.9rem;
        line-height: 1.5;
      }
    `;
    document.head.appendChild(style);
  }
  
  /**
   * Set up message listener for iframe communication
   */
  setupMessageListener() {
    // Remove any existing listeners
    this.eventListeners.forEach(listener => {
      window.removeEventListener('message', listener);
    });
    this.eventListeners = [];
    
    // Add new listener
    const listener = (event) => {
      // Check origin if restriction is set
      if (this.originRestriction !== '*' && event.origin !== this.originRestriction) {
        return;
      }
      
      // Log the message
      this.logMessage(event.data, 'received', event.origin);
    };
    
    window.addEventListener('message', listener);
    this.eventListeners.push(listener);
  }
  
  /**
   * Send message to iframe
   */
  sendMessage() {
    try {
      // Get message data
      const typeInput = document.getElementById('message-type');
      const dataInput = document.getElementById('message-data');
      const originInput = document.getElementById('target-origin');
      
      if (!typeInput || !dataInput || !originInput) {
        throw new Error('UI elements not found');
      }
      
      const type = typeInput.value.trim();
      const dataStr = dataInput.value.trim();
      const origin = originInput.value.trim();
      
      // Parse JSON data
      let data;
      try {
        data = JSON.parse(dataStr);
      } catch (e) {
        throw new Error('Invalid JSON: ' + e.message);
      }
      
      // Add type to data if not present
      if (!data.type) {
        data.type = type;
      }
      
      // Send message to iframe
      if (this.previewFrame && this.previewFrame.contentWindow) {
        this.previewFrame.contentWindow.postMessage(data, origin);
        
        // Log the message
        this.logMessage(data, 'sent', origin);
      } else {
        throw new Error('Preview frame not available');
      }
    } catch (error) {
      // Show error
      if (window.devPreview && window.devPreview.showToast) {
        window.devPreview.showToast('error', 'Error', error.message);
      } else {
        alert('Error: ' + error.message);
      }
    }
  }
  
  /**
   * Log a message in the message log
   * @param {Object} data - Message data
   * @param {string} direction - 'sent' or 'received'
   * @param {string} origin - Message origin
   */
  logMessage(data, direction, origin) {
    // Add to message log
    this.messageLog.push({
      data,
      direction,
      origin,
      timestamp: new Date()
    });
    
    // Update UI
    this.updateMessageLog();
  }
  
  /**
   * Update the message log UI
   */
  updateMessageLog() {
    const logElement = document.getElementById('message-log');
    if (!logElement) return;
    
    // Clear existing log
    logElement.innerHTML = '';
    
    // Add messages
    this.messageLog.forEach(message => {
      const messageElement = document.createElement('div');
      messageElement.className = `message-item ${message.direction}`;
      
      const header = document.createElement('div');
      header.className = 'message-header';
      header.innerHTML = `
        <span>${message.direction === 'sent' ? 'Sent to' : 'Received from'}: ${message.origin}</span>
        <span>${message.timestamp.toLocaleTimeString()}</span>
      `;
      
      const content = document.createElement('div');
      content.className = 'message-content';
      content.textContent = JSON.stringify(message.data, null, 2);
      
      messageElement.appendChild(header);
      messageElement.appendChild(content);
      logElement.appendChild(messageElement);
    });
    
    // Scroll to bottom
    logElement.scrollTop = logElement.scrollHeight;
  }
  
  /**
   * Clear the message log
   */
  clearLog() {
    this.messageLog = [];
    this.updateMessageLog();
  }
  
  /**
   * Toggle the communication tester visibility
   * @param {boolean} [show] - Force show or hide
   */
  toggleTester(show) {
    const tester = document.getElementById('iframe-communication-tester');
    if (!tester) return;
    
    if (show === undefined) {
      show = tester.style.display === 'none';
    }
    
    tester.style.display = show ? 'flex' : 'none';
  }
  
  /**
   * Copy text to clipboard
   * @param {string} text - Text to copy
   */
  copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }
  
  /**
   * Show toast notification
   * @param {string} message - Toast message
   */
  showToast(message) {
    if (window.devPreview && window.devPreview.showToast) {
      window.devPreview.showToast('info', 'Communication Tester', message);
    }
  }
}

// Export for use in main editor.js
window.IframeCommunicationTester = IframeCommunicationTester;