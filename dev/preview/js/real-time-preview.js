/**
 * Real-time Preview Module
 * 
 * This module enhances the development environment with real-time preview capabilities,
 * allowing developers to see changes as they type without manually clicking the render button.
 */

class RealTimePreview {
  constructor(editor, updatePreviewFn, options = {}) {
    this.editor = editor;
    this.updatePreviewFn = updatePreviewFn;
    this.options = Object.assign({
      debounceTime: 1000, // Default debounce time in ms
      enabled: true,      // Enabled by default
      autoSave: true      // Auto-save to localStorage
    }, options);
    
    this.debounceTimer = null;
    this.lastUpdateTime = Date.now();
    this.init();
  }
  
  /**
   * Initialize the real-time preview
   */
  init() {
    // Add change event listener to editor
    this.editor.on('change', () => {
      if (!this.options.enabled) return;
      
      // Clear previous timer
      if (this.debounceTimer) {
        clearTimeout(this.debounceTimer);
      }
      
      // Set new timer
      this.debounceTimer = setTimeout(() => {
        this.updatePreview();
      }, this.options.debounceTime);
    });
    
    // Add UI controls
    this.addControls();
  }
  
  /**
   * Update the preview
   */
  updatePreview() {
    this.updatePreviewFn();
    this.lastUpdateTime = Date.now();
    
    // Update status message
    if (window.devPreview) {
      window.devPreview.updateStatusMessage(`Preview updated automatically at ${new Date().toLocaleTimeString()}`);
    }
    
    // Auto-save if enabled
    if (this.options.autoSave && window.devPreview && window.devPreview.saveToLocalStorage) {
      window.devPreview.saveToLocalStorage();
    }
  }
  
  /**
   * Add UI controls for real-time preview
   */
  addControls() {
    // Create toggle switch container
    const container = document.createElement('div');
    container.className = 'real-time-preview-control';
    container.style.display = 'flex';
    container.style.alignItems = 'center';
    container.style.marginLeft = '15px';
    
    // Create label
    const label = document.createElement('label');
    label.className = 'toggle-switch';
    label.style.display = 'inline-flex';
    label.style.alignItems = 'center';
    
    // Create checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = this.options.enabled;
    checkbox.style.margin = '0';
    checkbox.style.marginRight = '8px';
    
    // Create text
    const text = document.createElement('span');
    text.textContent = 'Real-time Preview';
    text.style.fontSize = '0.85rem';
    
    // Assemble elements
    label.appendChild(checkbox);
    label.appendChild(text);
    container.appendChild(label);
    
    // Add event listener
    checkbox.addEventListener('change', (e) => {
      this.options.enabled = e.target.checked;
      
      // Update status message
      if (window.devPreview) {
        window.devPreview.updateStatusMessage(`Real-time preview ${this.options.enabled ? 'enabled' : 'disabled'}`);
        
        // Show toast notification
        window.devPreview.showToast(
          'info',
          'Real-time Preview',
          `Real-time preview has been ${this.options.enabled ? 'enabled' : 'disabled'}`
        );
      }
    });
    
    // Add to toolbar
    const toolbar = document.querySelector('.toolbar-section:first-child');
    if (toolbar) {
      toolbar.appendChild(container);
    }
  }
  
  /**
   * Enable real-time preview
   */
  enable() {
    this.options.enabled = true;
    const checkbox = document.querySelector('.real-time-preview-control input');
    if (checkbox) {
      checkbox.checked = true;
    }
  }
  
  /**
   * Disable real-time preview
   */
  disable() {
    this.options.enabled = false;
    const checkbox = document.querySelector('.real-time-preview-control input');
    if (checkbox) {
      checkbox.checked = false;
    }
  }
  
  /**
   * Set debounce time
   * @param {number} time - Debounce time in milliseconds
   */
  setDebounceTime(time) {
    this.options.debounceTime = time;
  }
}

// Export for use in main editor.js
window.RealTimePreview = RealTimePreview;