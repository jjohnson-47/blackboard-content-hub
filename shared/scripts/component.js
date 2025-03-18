/**
 * Blackboard Content Hub - Shared Component Scripts
 * Common functionality for interactive components
 */

// Namespace to avoid global scope pollution
const BlackboardComponent = (function() {
  'use strict';
  
  // Configuration defaults
  const defaults = {
    debug: false,
    allowResize: true,
    allowFullscreen: true,
    allowCommunication: true,
    theme: 'light'
  };
  
  // Current configuration
  let config = { ...defaults };
  
  /**
   * Initialize the component with configuration options
   * @param {Object} options - Configuration options
   */
  function init(options = {}) {
    // Merge options with defaults
    config = { ...defaults, ...options };
    
    // Parse URL parameters
    parseUrlParams();
    
    // Set up theme
    applyTheme(config.theme);
    
    // Set up resize handling if allowed
    if (config.allowResize) {
      setupResizeHandling();
    }
    
    // Set up cross-origin communication if allowed
    if (config.allowCommunication) {
      setupCommunication();
    }
    
    // Log initialization if debug mode is on
    if (config.debug) {
      console.log('BlackboardComponent initialized with config:', config);
    }
    
    // Dispatch ready event
    dispatchEvent('component:ready', { config });
  }
  
  /**
   * Parse URL parameters and update configuration
   */
  function parseUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Check for theme parameter
    if (urlParams.has('theme')) {
      config.theme = urlParams.get('theme');
    }
    
    // Check for debug parameter
    if (urlParams.has('debug')) {
      config.debug = urlParams.get('debug') === 'true';
    }
    
    // Check for fontSize parameter
    if (urlParams.has('fontSize')) {
      config.fontSize = urlParams.get('fontSize');
      document.documentElement.style.fontSize = getFontSizeValue(config.fontSize);
    }
    
    // Component-specific parameters can be handled by the component itself
  }
  
  /**
   * Convert fontSize string to CSS value
   * @param {string} size - Size name (small, medium, large)
   * @return {string} CSS font-size value
   */
  function getFontSizeValue(size) {
    switch(size) {
      case 'small': return '14px';
      case 'large': return '18px';
      case 'medium':
      default: return '16px';
    }
  }
  
  /**
   * Apply theme to the component
   * @param {string} theme - Theme name (light, dark)
   */
  function applyTheme(theme) {
    if (theme === 'dark') {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }
  
  /**
   * Set up handling for iframe resizing
   */
  function setupResizeHandling() {
    // Function to send resize message to parent
    function notifyResize() {
      const height = document.documentElement.scrollHeight;
      window.parent.postMessage({
        type: 'resize',
        height: height
      }, '*');
    }
    
    // Initial resize
    window.addEventListener('load', notifyResize);
    
    // Resize on content changes
    const resizeObserver = new ResizeObserver(() => {
      notifyResize();
    });
    
    resizeObserver.observe(document.body);
  }
  
  /**
   * Set up cross-origin communication
   */
  function setupCommunication() {
    // Listen for messages from parent
    window.addEventListener('message', function(event) {
      // Process the message
      if (config.debug) {
        console.log('Message received from parent:', event.data);
      }
      
      // Dispatch event for component-specific handling
      dispatchEvent('message:received', event.data);
      
      // Handle common message types
      if (event.data && event.data.type) {
        switch(event.data.type) {
          case 'setTheme':
            if (event.data.theme) {
              applyTheme(event.data.theme);
            }
            break;
          case 'getConfig':
            sendMessageToParent({
              type: 'config',
              data: config
            });
            break;
        }
      }
    });
  }
  
  /**
   * Send a message to the parent window
   * @param {Object} message - Message to send
   */
  function sendMessageToParent(message) {
    if (window.parent !== window) {
      window.parent.postMessage(message, '*');
      
      if (config.debug) {
        console.log('Message sent to parent:', message);
      }
    }
  }
  
  /**
   * Dispatch a custom event
   * @param {string} name - Event name
   * @param {Object} detail - Event details
   */
  function dispatchEvent(name, detail = {}) {
    const event = new CustomEvent(name, { detail });
    document.dispatchEvent(event);
  }
  
  /**
   * Get current configuration
   * @return {Object} Current configuration
   */
  function getConfig() {
    return { ...config };
  }
  
  // Public API
  return {
    init,
    getConfig,
    sendMessageToParent,
    applyTheme
  };
})();

// Auto-initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
  BlackboardComponent.init();
});