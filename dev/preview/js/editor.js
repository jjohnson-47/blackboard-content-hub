/**
 * Development Preview UI - Main JavaScript
 * 
 * This file contains the core functionality for the development preview UI,
 * including component loading, code editing, and preview functionality.
 * 
 * Enhanced in Phase 2 with:
 * - Real-time preview
 * - Iframe communication testing
 * - Accessibility checking
 * - Code validation
 * 
 * Enhanced in Phase 3 with:
 * - Unified Component Registry integration
 * - Support for components from all locations
 * - Component filtering and search
 */

class DevPreview {
  constructor() {
    this.initElements();
    this.initState();
    this.initEditor();
    this.attachEventListeners();
    
    // Initialize component registry
    this.initComponentRegistry().then(() => {
      this.loadComponentList();
    });
    
    // Initialize Phase 2 enhancements
    this.initRealTimePreview();
    this.initIframeCommunicationTester();
    
    // Initialize resizable layout
    this.initResizableLayout();
  }

  /**
   * Initialize DOM element references
   */
  initElements() {
    // Main elements
    this.componentList = document.getElementById('componentList');
    this.previewFrame = document.getElementById('previewFrame');
    this.codeEditor = document.getElementById('codeEditor');
    this.editorTabs = document.querySelectorAll('.editor-tab');
    this.deviceButtons = document.querySelectorAll('.device-btn');
    this.sizeIndicator = document.getElementById('sizeIndicator');
    
    // Component filters and search
    this.locationFilter = document.getElementById('locationFilter');
    this.componentSearch = document.getElementById('componentSearch');
    
    // Buttons
    this.refreshListBtn = document.getElementById('refreshListBtn');
    this.refreshFrameBtn = document.getElementById('refreshFrameBtn');
    this.openNewWindowBtn = document.getElementById('openNewWindowBtn');
    this.runBtn = document.getElementById('runBtn');
    this.formatBtn = document.getElementById('formatBtn');
    this.saveBtn = document.getElementById('saveBtn');
    this.statusMessage = document.getElementById('statusMessage');
    
    // New component modal
    this.newComponentBtn = document.getElementById('newComponentBtn');
    this.newComponentModal = document.getElementById('newComponentModal');
    this.closeNewComponentModal = document.getElementById('closeNewComponentModal');
    this.cancelNewComponent = document.getElementById('cancelNewComponent');
    this.createNewComponent = document.getElementById('createNewComponent');
    this.componentName = document.getElementById('componentName');
    this.componentTitle = document.getElementById('componentTitle');
    this.componentTemplate = document.getElementById('componentTemplate');
    
    // Promote modal
    this.promoteBtn = document.getElementById('promoteBtn');
    this.promoteModal = document.getElementById('promoteModal');
    this.closePromoteModal = document.getElementById('closePromoteModal');
    this.cancelPromote = document.getElementById('cancelPromote');
    this.confirmPromote = document.getElementById('confirmPromote');
    this.promoteType = document.getElementById('promoteType');
    this.courseSelectorGroup = document.getElementById('courseSelectorGroup');
    this.categorySelectorGroup = document.getElementById('categorySelectorGroup');
    
    // Delete modal
    this.deleteModal = document.getElementById('deleteModal');
    this.closeDeleteModal = document.getElementById('closeDeleteModal');
    this.cancelDelete = document.getElementById('cancelDelete');
    this.confirmDelete = document.getElementById('confirmDelete');
    this.deleteComponentName = document.getElementById('deleteComponentName');
    
    // Toast notification
    this.toast = document.getElementById('toast');
    this.toastTitle = document.getElementById('toastTitle');
    this.toastMessage = document.getElementById('toastMessage');
    this.toastIcon = document.getElementById('toastIcon');
    this.toastClose = document.getElementById('toastClose');
  }

  /**
   * Initialize resizable layout
   */
  initResizableLayout() {
    // Get elements
    const container = document.querySelector('.editor-preview-container');
    const leftPanel = document.getElementById('editorContainer');
    const rightPanel = document.getElementById('previewContainer');
    const handle = document.getElementById('resizeHandle');
    
    if (!container || !leftPanel || !rightPanel || !handle) {
      console.warn('Resizable layout elements not found');
      return;
    }
    
    // Load saved state or set default
    this.loadLayoutState();
    
    // Variables for resize operation
    let isResizing = false;
    let startX = 0;
    let startWidth = 0;
    
    // Start resize
    const startResize = (e) => {
      isResizing = true;
      startX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      startWidth = leftPanel.offsetWidth;
      document.body.classList.add('resizing');
      e.preventDefault();
    };
    
    // Resize function
    const resize = (e) => {
      if (!isResizing) return;
      
      const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      const deltaX = clientX - startX;
      
      // Calculate new width with constraints
      const containerWidth = container.offsetWidth;
      const minWidth = 200;
      const maxWidth = containerWidth - minWidth - handle.offsetWidth;
      const newWidth = Math.max(minWidth, Math.min(maxWidth, startWidth + deltaX));
      
      // Apply new width
      leftPanel.style.width = `${newWidth}px`;
      
      // Prevent default to avoid text selection
      e.preventDefault();
    };
    
    // Stop resize
    const stopResize = () => {
      if (isResizing) {
        isResizing = false;
        document.body.classList.remove('resizing');
        this.saveLayoutState();
      }
    };
    
    // Mouse events
    handle.addEventListener('mousedown', startResize);
    document.addEventListener('mousemove', resize);
    document.addEventListener('mouseup', stopResize);
    
    // Touch events
    handle.addEventListener('touchstart', startResize, { passive: false });
    document.addEventListener('touchmove', resize, { passive: false });
    document.addEventListener('touchend', stopResize);
    
    // Window resize
    window.addEventListener('resize', () => {
      const containerWidth = container.offsetWidth;
      const leftWidth = leftPanel.offsetWidth;
      const minWidth = 200;
      const maxWidth = containerWidth - minWidth - handle.offsetWidth;
      
      if (leftWidth > maxWidth) {
        leftPanel.style.width = `${maxWidth}px`;
      } else if (leftWidth < minWidth) {
        leftPanel.style.width = `${minWidth}px`;
      }
    });
    
    // Keyboard support
    handle.addEventListener('keydown', (e) => {
      let newWidth = leftPanel.offsetWidth;
      
      if (e.key === 'ArrowLeft') {
        newWidth -= 10;
      } else if (e.key === 'ArrowRight') {
        newWidth += 10;
      } else {
        return;
      }
      
      const containerWidth = container.offsetWidth;
      const minWidth = 200;
      const maxWidth = containerWidth - minWidth - handle.offsetWidth;
      newWidth = Math.max(minWidth, Math.min(maxWidth, newWidth));
      
      leftPanel.style.width = `${newWidth}px`;
      this.saveLayoutState();
      e.preventDefault();
    });
    
    // ARIA attributes
    handle.setAttribute('role', 'separator');
    handle.setAttribute('aria-orientation', 'vertical');
    handle.setAttribute('aria-valuemin', 200);
    handle.setAttribute('aria-valuemax', container.offsetWidth - 200 - handle.offsetWidth);
    handle.setAttribute('aria-valuenow', leftPanel.offsetWidth);
    handle.setAttribute('tabindex', '0');
    handle.setAttribute('aria-label', 'Resize panels');
  }
  
  /**
   * Save layout state to localStorage
   */
  saveLayoutState() {
    const leftPanel = document.getElementById('editorContainer');
    
    if (!leftPanel) return;
    
    const state = {
      leftWidth: leftPanel.offsetWidth
    };
    
    localStorage.setItem('resizable-layout-state', JSON.stringify(state));
  }
  
  /**
   * Load layout state from localStorage
   */
  loadLayoutState() {
    const container = document.querySelector('.editor-preview-container');
    const leftPanel = document.getElementById('editorContainer');
    const handle = document.getElementById('resizeHandle');
    
    if (!container || !leftPanel || !handle) return;
    
    const savedState = localStorage.getItem('resizable-layout-state');
    
    if (savedState) {
      try {
        const state = JSON.parse(savedState);
        const containerWidth = container.offsetWidth;
        const handleWidth = handle.offsetWidth;
        const minWidth = 200;
        const maxWidth = containerWidth - minWidth - handleWidth;
        
        // Apply saved width with constraints
        if (state.leftWidth) {
          const validWidth = Math.max(minWidth, Math.min(maxWidth, state.leftWidth));
          leftPanel.style.width = `${validWidth}px`;
        } else {
          // Default to 50/50 split
          leftPanel.style.width = `${Math.floor(containerWidth / 2)}px`;
        }
      } catch (error) {
        console.error('Error loading layout state:', error);
        // Default to 50/50 split
        leftPanel.style.width = `${Math.floor(container.offsetWidth / 2)}px`;
      }
    } else {
      // Default to 50/50 split
      leftPanel.style.width = `${Math.floor(container.offsetWidth / 2)}px`;
    }
  }
  
  /**
   * Initialize state variables
   */
  initState() {
    this.currentComponent = null;
    this.currentTab = 'html';
    this.htmlCode = `<div class="container">
  <header>
    <h1>Interactive Component</h1>
    <div class="controls">
      <button id="resetBtn">Reset</button>
    </div>
  </header>
  
  <div class="main-content">
    <!-- Interactive Content Container -->
    <div class="interactive-container">
      <div id="content">
        <p>Your content goes here</p>
      </div>
    </div>
    
    <!-- Information Panel with Tabs -->
    <div class="info-panel" id="infoPanel">
      <!-- Tab Navigation -->
      <div class="tab-buttons">
        <button class="tab-button active" data-tab="overview">Overview</button>
        <button class="tab-button" data-tab="instructions">Instructions</button>
      </div>
      
      <!-- Tab Content Areas -->
      <div class="tab-content active" id="overview">
        <h2>Overview</h2>
        <p>This interactive component allows you to explore and interact with the content.</p>
      </div>
      
      <div class="tab-content" id="instructions">
        <h2>Instructions</h2>
        <ol>
          <li>Use the controls to interact with the visualization</li>
          <li>Observe how changes affect the results</li>
          <li>Click the reset button to return to the initial state</li>
        </ol>
      </div>
    </div>
  </div>
</div>`;
    this.cssCode = `/* Basic styling for layout components */
body {
  margin: 0;
  padding: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f7f9fc;
  color: #333;
  overflow: hidden;
}

.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 1200px;
  margin: 0 auto;
}

header {
  background-color: #4a148c;
  color: white;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header h1 {
  font-size: 1.5rem;
  margin: 0;
}

.controls {
  display: flex;
  gap: 10px;
}

button {
  background-color: #7b1fa2;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
}

.main-content {
  display: flex;
  flex-grow: 1;
  overflow: hidden;
}

.interactive-container {
  flex-grow: 1;
  padding: 20px;
  overflow: auto;
}

.info-panel {
  width: 30%;
  background-color: white;
  padding: 20px;
  overflow-y: auto;
  border-left: 1px solid #e0e0e0;
}

/* Tab system */
.tab-buttons {
  display: flex;
  margin-bottom: 15px;
  border-bottom: 1px solid #e0e0e0;
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

/* Responsive design */
@media (max-width: 768px) {
  .main-content {
    flex-direction: column;
  }
  
  .info-panel {
    width: 100%;
    height: 40%;
    border-left: none;
    border-top: 1px solid #e0e0e0;
  }
}`;
    this.jsCode = `// Initialize component when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('Component initialized');
  setupEventHandlers();
  
  // Listen for messages from parent window
  window.addEventListener('message', function(event) {
    // Verify origin in production
    // if (event.origin !== 'https://trusted-domain.com') return;
    
    console.log('Received message from parent:', event.data);
    
    // Process messages based on type
    if (event.data && event.data.type) {
      switch(event.data.type) {
        case 'command':
          handleCommand(event.data, event.origin);
          break;
        case 'config':
          updateConfig(event.data.config);
          break;
      }
    }
  });
});

/**
 * Set up event handlers for UI elements
 */
function setupEventHandlers() {
  // Reset button
  const resetBtn = document.getElementById('resetBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', function() {
      console.log('Reset button clicked');
      // Reset the component to its initial state
      
      // Notify parent that reset was clicked
      sendMessageToParent({
        type: 'event',
        action: 'reset',
        data: { timestamp: new Date().toISOString() }
      });
    });
  }
  
  // Tab switching
  const tabButtons = document.querySelectorAll('.tab-button');
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons and content
      tabButtons.forEach(btn => btn.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
      });
      
      // Add active class to clicked button and corresponding content
      this.classList.add('active');
      const tabId = this.getAttribute('data-tab');
      document.getElementById(tabId).classList.add('active');
    });
  });
}

/**
 * Handle commands from parent window
 * @param {Object} data - Command data
 * @param {string} origin - Origin of the message
 */
function handleCommand(data, origin) {
  console.log('Handling command:', data.action);
  
  // Example command handling
  switch(data.action) {
    case 'getData':
      // Send data back to parent
      sendMessageToParent({
        type: 'response',
        action: 'getData',
        data: { result: 'success', value: 42 }
      }, origin);
      break;
      
    case 'reset':
      // Reset the component
      document.getElementById('resetBtn').click();
      break;
  }
}

/**
 * Update component configuration
 * @param {Object} config - Configuration object
 */
function updateConfig(config) {
  console.log('Updating configuration:', config);
  // Apply configuration to component
}

/**
 * Send message to parent window
 * @param {Object} message - Message to send
 * @param {string} targetOrigin - Target origin (use specific origin in production)
 */
function sendMessageToParent(message, targetOrigin = '*') {
  if (window.parent !== window) {
    window.parent.postMessage(message, targetOrigin);
  }
}`;
    this.editor = null;
    this.isEditorDirty = false;
    this.defaultTemplate = null;
    this.autoSaveInterval = null;
    this.lastSavedTimestamp = Date.now();
    
    // Phase 2 enhancements
    this.realTimePreview = null;
    this.communicationTester = null;
    
    // Phase 3 enhancements
    this.allComponents = [];
    this.filteredComponents = [];
    this.componentToDelete = null;
    this.deleteModalInitialized = false;
  }

  /**
   * Initialize component registry
   */
  async initComponentRegistry() {
    // Check if component registry client is available
    if (window.componentRegistry) {
      try {
        // Initialize registry
        await window.componentRegistry.initialize();
        console.log('Component registry initialized');
        return true;
      } catch (error) {
        console.error('Error initializing component registry:', error);
        this.showToast('error', 'Error', 'Failed to initialize component registry');
        return false;
      }
    } else {
      console.warn('Component registry client not loaded');
      return false;
    }
  }

  /**
   * Initialize CodeMirror editor
   */
  initEditor() {
    this.editor = CodeMirror.fromTextArea(this.codeEditor, {
      mode: 'htmlmixed',
      theme: 'dracula',
      lineNumbers: true,
      indentUnit: 2,
      smartIndent: true,
      tabSize: 2,
      indentWithTabs: false,
      lineWrapping: true,
      matchBrackets: true,
      autoCloseBrackets: true,
      foldGutter: true,
      gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter", "CodeMirror-lint-markers"],
      lint: true,
      extraKeys: {
        'Ctrl-S': () => this.saveComponent(),
        'Cmd-S': () => this.saveComponent(),
        'Ctrl-Enter': () => this.updatePreview(),
        'Cmd-Enter': () => this.updatePreview(),
        'Ctrl-Shift-F': () => this.formatCode(),
        'Cmd-Shift-F': () => this.formatCode()
      }
    });
    
    this.editor.on('change', () => {
      this.isEditorDirty = true;
      this.updateStatusMessage('Changes not saved');
      this.lastSavedTimestamp = Date.now();
    });
    
    // Load default template
    this.loadDefaultTemplate();
    
    // Try to load from localStorage first
    this.tryLoadFromLocalStorage();
    
    // Set up auto-save
    this.setupAutoSave();
  }
  
  /**
   * Initialize real-time preview functionality
   */
  initRealTimePreview() {
    // Check if RealTimePreview class is available
    if (window.RealTimePreview) {
      this.realTimePreview = new RealTimePreview(
        this.editor, 
        () => this.updatePreview(),
        {
          debounceTime: 1000, // 1 second debounce
          enabled: true,      // Enabled by default
          autoSave: true      // Auto-save to localStorage
        }
      );
    } else {
      console.warn('RealTimePreview module not loaded');
    }
  }
  
  /**
   * Initialize iframe communication tester
   */
  initIframeCommunicationTester() {
    // Check if IframeCommunicationTester class is available
    if (window.IframeCommunicationTester) {
      this.communicationTester = new IframeCommunicationTester(this.previewFrame);
    } else {
      console.warn('IframeCommunicationTester module not loaded');
    }
  }
  
  /**
   * Set up auto-save functionality
   */
  setupAutoSave() {
    // Auto-save every 30 seconds
    this.autoSaveInterval = setInterval(() => {
      if (this.isEditorDirty && this.currentComponent) {
        this.saveToLocalStorage();
        this.updateStatusMessage('Auto-saved');
      }
    }, 30000);
    
    // Save when window is closed or refreshed
    window.addEventListener('beforeunload', () => {
      if (this.isEditorDirty && this.currentComponent) {
        this.saveToLocalStorage();
      }
    });
  }
  
  /**
   * Try to load component from localStorage
   */
  tryLoadFromLocalStorage() {
    // Check if there's a last edited component in localStorage
    const lastComponent = localStorage.getItem('lastEditedComponent');
    
    if (lastComponent) {
      try {
        const componentData = JSON.parse(lastComponent);
        this.currentComponent = {
          id: componentData.id,
          name: componentData.name,
          locationType: 'local'
        };
        
        this.htmlCode = componentData.html || this.htmlCode;
        this.cssCode = componentData.css || this.cssCode;
        this.jsCode = componentData.js || this.jsCode;
        
        // Set active tab to HTML by default
        this.setActiveTab('html');
        
        // Update preview
        this.updatePreview();
        
        // Reset dirty flag
        this.isEditorDirty = false;
        this.updateStatusMessage('Component loaded from local storage');
        
        return true;
      } catch (error) {
        console.error('Error loading component from localStorage:', error);
      }
    }
    
    // If no component was loaded from localStorage, set initial content
    this.editor.setValue(this.htmlCode);
    return false;
  }

  /**
   * Load default template
   */
  loadDefaultTemplate() {
    fetch('../components/default-template.html')
      .then(response => response.text())
      .then(html => {
        this.defaultTemplate = html;
      })
      .catch(error => {
        console.error('Error loading default template:', error);
        // Fallback to a simple template if the default template can't be loaded
        this.defaultTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Component</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Interactive Component</h1>
    <div id="content"></div>
  </div>
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      console.log('Component initialized');
      
      // Listen for messages from parent window
      window.addEventListener('message', function(event) {
        // Verify origin in production
        // if (event.origin !== 'https://trusted-domain.com') return;
        
        console.log('Received message:', event.data);
      });
    });
  </script>
</body>
</html>`;
      });
  }

  /**
   * Attach event listeners to UI elements
   */
  attachEventListeners() {
    // Editor tabs
    this.editorTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        this.setActiveTab(tab.getAttribute('data-tab'));
      });
    });
    
    // Device buttons
    this.deviceButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons
        this.deviceButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Update preview frame size
        const width = button.getAttribute('data-width');
        const height = button.getAttribute('data-height');
        
        this.previewFrame.style.width = width;
        this.previewFrame.style.height = height === '100%' ? '100%' : 'auto';
        this.previewFrame.style.maxHeight = height === '100%' ? '100%' : height;
        
        // Update size indicator
        this.sizeIndicator.textContent = `${width} × ${height}`;
      });
    });
    
    // Component filters
    this.locationFilter.addEventListener('change', () => {
      this.filterComponents();
    });
    
    // Component search
    this.componentSearch.addEventListener('input', () => {
      this.filterComponents();
    });
    
    // Refresh component list
    this.refreshListBtn.addEventListener('click', () => {
      // Reinitialize registry and reload component list
      this.initComponentRegistry().then(() => {
        this.loadComponentList();
      });
    });
    
    // Refresh preview frame
    this.refreshFrameBtn.addEventListener('click', () => this.updatePreview());
    
    // Open in new window
    this.openNewWindowBtn.addEventListener('click', () => this.openInNewWindow());
    
    // Run button
    this.runBtn.addEventListener('click', () => this.updatePreview());
    
    // Format button
    this.formatBtn.addEventListener('click', () => this.formatCode());
    
    // Save button
    this.saveBtn.addEventListener('click', () => this.saveComponent());
    
    // New component button
    this.newComponentBtn.addEventListener('click', () => {
      this.openModal(this.newComponentModal);
    });
    
    // Close new component modal
    this.closeNewComponentModal.addEventListener('click', () => {
      this.closeModal(this.newComponentModal);
    });
    
    // Cancel new component
    this.cancelNewComponent.addEventListener('click', () => {
      this.closeModal(this.newComponentModal);
    });
    
    // Create new component
    this.createNewComponent.addEventListener('click', () => this.createComponent());
    
    // Promote button
    this.promoteBtn.addEventListener('click', () => this.promoteComponent());
    
    // Close promote modal
    this.closePromoteModal.addEventListener('click', () => {
      this.closeModal(this.promoteModal);
    });
    
    // Cancel promote
    this.cancelPromote.addEventListener('click', () => {
      this.closeModal(this.promoteModal);
    });
    
    // Confirm promote
    this.confirmPromote.addEventListener('click', () => this.confirmPromotion());
    
    // Promote type change
    this.promoteType.addEventListener('change', () => {
      if (this.promoteType.value === 'course-specific') {
        this.courseSelectorGroup.style.display = 'block';
        this.categorySelectorGroup.style.display = 'none';
      } else {
        this.courseSelectorGroup.style.display = 'none';
        this.categorySelectorGroup.style.display = 'block';
      }
    });
    
    // Toast close button
    this.toastClose.addEventListener('click', () => {
      this.toast.className = 'toast';
    });
  }
  
  /**
   * Load component list from registry
   */
  loadComponentList() {
    // Clear the list first
    this.componentList.innerHTML = '';
    
    // Get components from registry if available
    this.allComponents = [];
    
    if (window.componentRegistry && window.componentRegistry.initialized) {
      // Get components from registry
      this.allComponents = window.componentRegistry.getAllComponents();
    } else {
      // Fallback to hardcoded components
      this.allComponents = [
        { id: 'template', name: 'template.html', title: 'Template', locationType: 'development' },
        { id: 'interactive-graph', name: 'interactive-graph.html', title: 'Interactive Graph', locationType: 'development' },
        { id: 'default-template', name: 'default-template.html', title: 'Default Template', locationType: 'development' }
      ];
      
      // Add components from localStorage
      const localProjects = this.loadProjectsFromLocalStorage();
      
      localProjects.forEach(project => {
        this.allComponents.push({
          id: project.id,
          name: project.name,
          title: project.id.charAt(0).toUpperCase() + project.id.slice(1).replace(/-/g, ' '),
          locationType: 'local',
          lastModified: project.lastModified
        });
      });
    }
    
    // Apply filters
    this.filterComponents();
  }
  
  /**
   * Filter components based on location and search
   */
  filterComponents() {
    const locationFilter = this.locationFilter.value;
    const searchTerm = this.componentSearch.value.toLowerCase();
    
    // Filter by location
    this.filteredComponents = this.allComponents.filter(component => {
      // Apply location filter
      if (locationFilter !== 'all' && component.locationType !== locationFilter) {
        return false;
      }
      
      // Apply search filter
      if (searchTerm) {
        return (
          component.id.toLowerCase().includes(searchTerm) ||
          component.title.toLowerCase().includes(searchTerm) ||
          (component.description && component.description.toLowerCase().includes(searchTerm)) ||
          (component.tags && component.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
        );
      }
      
      return true;
    });
    
    // Sort components by locationType and lastModified
    this.filteredComponents.sort((a, b) => {
      // Sort by locationType (local first, then development, then shared, then course)
      const locationOrder = { local: 0, development: 1, shared: 2, course: 3 };
      const locationDiff = locationOrder[a.locationType] - locationOrder[b.locationType];
      
      if (locationDiff !== 0) return locationDiff;
      
      // If same locationType, sort by lastModified (newest first)
      if (a.lastModified && b.lastModified) {
        return new Date(b.lastModified) - new Date(a.lastModified);
      }
      
      // If no lastModified, keep original order
      return 0;
    });
    
    // Render filtered components
    this.renderComponentList();
  }
  
  /**
   * Render component list
   */
  renderComponentList() {
    // Clear the list first
    this.componentList.innerHTML = '';
    
    // Check if there are any components to display
    if (this.filteredComponents.length === 0) {
      // Show empty state
      const emptyState = document.createElement('div');
      emptyState.className = 'component-empty-state';
      emptyState.innerHTML = `
        <span class="material-icons">search_off</span>
        <p>No components found</p>
      `;
      this.componentList.appendChild(emptyState);
      return;
    }
    
    // Create component list items
    this.filteredComponents.forEach(component => {
      const li = document.createElement('li');
      li.className = 'component-list-item';
      
      const a = document.createElement('a');
      a.href = '#';
      a.className = 'component-list-link';
      a.setAttribute('data-id', component.id);
      a.setAttribute('data-name', component.name);
      a.setAttribute('data-location-type', component.locationType);
      
      // Add icon based on locationType
      let iconName = 'web_asset';
      if (component.locationType === 'local') {
        iconName = 'edit';
      } else if (component.locationType === 'development') {
        iconName = 'code';
      } else if (component.locationType === 'shared') {
        iconName = 'public';
      } else if (component.locationType === 'course') {
        iconName = 'school';
      }
      
      // Add date if available
      const dateInfo = component.lastModified ?
        `<span class="component-date">${new Date(component.lastModified).toLocaleString()}</span>` : '';
      
      // Add location type badge
      const locationBadge = `<span class="component-location-badge ${component.locationType}">${component.locationType}</span>`;
      
      // Add delete button
      const deleteButton = `<button class="component-delete-btn" title="Delete component" data-id="${component.id}">
        <span class="material-icons">delete</span>
      </button>`;
      
      a.innerHTML = `
        <span class="material-icons component-icon">${iconName}</span>
        <div class="component-info">
          <span class="component-name">${component.title}</span>
          ${locationBadge}
          ${dateInfo}
        </div>
        ${deleteButton}
      `;
      
      // Add click event for component
      a.addEventListener('click', (e) => {
        // Check if delete button was clicked
        const deleteBtn = e.target.closest('.component-delete-btn');
        if (deleteBtn) {
          e.preventDefault();
          e.stopPropagation();
          this.confirmDeleteComponent(component);
          return;
        }
        
        // Otherwise handle component selection
        e.preventDefault();
        
        if (this.isEditorDirty) {
          if (!confirm('You have unsaved changes. Load new component anyway?')) {
            return;
          }
        }
        
        // Remove active class from all links
        document.querySelectorAll('.component-list-link').forEach(link => {
          link.classList.remove('active');
        });
        
        // Add active class to clicked link
        a.classList.add('active');
        
        // Load component based on location type
        this.loadComponentByType(component);
      });
      
      // Highlight current component if any
      if (this.currentComponent && this.currentComponent.id === component.id) {
        a.classList.add('active');
      }
      
      li.appendChild(a);
      this.componentList.appendChild(li);
    });
  }
  
  /**
   * Load component based on its location type
   * @param {Object} component - Component data
   */
  loadComponentByType(component) {
    this.currentComponent = {
      id: component.id,
      name: component.name,
      locationType: component.locationType,
      path: component.path
    };
    
    // Load component based on location type
    switch (component.locationType) {
      case 'local':
        this.loadComponentFromLocalStorage(component.id);
        break;
      case 'development':
        this.loadComponent(`../components/${component.name}`);
        break;
      case 'shared':
      case 'course':
        // For shared and course-specific components, use the full path
        this.loadComponent(`/${component.path}`);
        break;
      default:
        this.loadComponent(`../components/${component.name}`);
    }
  }
  
  /**
   * Load component from localStorage
   * @param {string} id - Component ID
   */
  loadComponentFromLocalStorage(id) {
    try {
      const componentData = localStorage.getItem(`component_${id}`);
      
      if (!componentData) {
        this.showToast('error', 'Error', 'Component not found in local storage');
        return;
      }
      
      const data = JSON.parse(componentData);
      
      this.currentComponent = {
        id: data.id,
        name: data.name,
        locationType: 'local'
      };
      
      this.htmlCode = data.html || '';
      this.cssCode = data.css || '';
      this.jsCode = data.js || '';
      
      // Set active tab to HTML by default
      this.setActiveTab('html');
      
      // Update preview
      this.updatePreview();
      
      // Reset dirty flag
      this.isEditorDirty = false;
      this.updateStatusMessage('Component loaded from local storage');
      
    } catch (error) {
      console.error('Error loading component from localStorage:', error);
      this.showToast('error', 'Error', 'Failed to load component from local storage');
    }
  }

  /**
   * Load component from URL
   * @param {string} url - Component URL
   */
  loadComponent(url) {
    // Fetch component content
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to load component: ${response.status} ${response.statusText}`);
        }
        return response.text();
      })
      .then(html => {
        // Parse HTML, CSS, and JS from the component
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        // Extract HTML - get the body content without the script tag
        const bodyContent = doc.body.innerHTML;
        
        // Remove script tags from HTML content
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = bodyContent;
        const scripts = tempDiv.querySelectorAll('script');
        scripts.forEach(script => script.remove());
        this.htmlCode = tempDiv.innerHTML;
        
        // Extract CSS
        const styleTag = doc.querySelector('style');
        this.cssCode = styleTag ? styleTag.textContent : '';
        
        // Extract JS
        const scriptTag = doc.querySelector('script');
        this.jsCode = scriptTag ? scriptTag.textContent : '';
        
        // Set active tab to HTML by default
        this.setActiveTab('html');
        
        // Update preview
        this.updatePreview();
        
        // Reset dirty flag
        this.isEditorDirty = false;
        this.updateStatusMessage(`Component loaded from ${this.currentComponent.locationType}`);
      })
      .catch(error => {
        console.error('Error loading component:', error);
        this.showToast('error', 'Error', `Failed to load component: ${error.message}`);
      });
  }

  /**
   * Set active editor tab
   * @param {string} tab - Tab name (html, css, js)
   */
  setActiveTab(tab) {
    // Save current tab content before switching
    this.saveCurrentTabContent();
    
    this.currentTab = tab;
    
    // Update tab UI
    this.editorTabs.forEach(tabEl => {
      if (tabEl.getAttribute('data-tab') === tab) {
        tabEl.classList.add('active');
      } else {
        tabEl.classList.remove('active');
      }
    });
    
    // Update editor content and mode
    switch (tab) {
      case 'html':
        this.editor.setValue(this.htmlCode);
        this.editor.setOption('mode', 'htmlmixed');
        break;
      case 'css':
        this.editor.setValue(this.cssCode);
        this.editor.setOption('mode', 'css');
        break;
      case 'js':
        this.editor.setValue(this.jsCode);
        this.editor.setOption('mode', 'javascript');
        break;
    }
    
    // Focus editor
    setTimeout(() => this.editor.focus(), 0);
  }

  /**
   * Save current tab content
   */
  saveCurrentTabContent() {
    if (!this.currentTab) return;
    
    switch (this.currentTab) {
      case 'html':
        this.htmlCode = this.editor.getValue();
        break;
      case 'css':
        this.cssCode = this.editor.getValue();
        break;
      case 'js':
        this.jsCode = this.editor.getValue();
        break;
    }
  }

  /**
   * Update preview
   */
  updatePreview() {
    // Save current tab content
    this.saveCurrentTabContent();
    
    // Combine HTML, CSS, and JS
    const combinedHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${this.currentComponent ? this.currentComponent.id : 'Component Preview'}</title>
  <style>
${this.cssCode}
  </style>
</head>
<body>
${this.htmlCode}
  <script>
${this.jsCode}
  </script>
</body>
</html>`;
    
    // Update preview
    const blob = new Blob([combinedHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    this.previewFrame.src = url;
    
    this.updateStatusMessage('Preview updated');
  }

  /**
   * Save component
   */
  saveComponent() {
    if (!this.currentComponent) {
      this.showToast('error', 'Error', 'No component selected');
      return;
    }
    
    // Save current tab content
    this.saveCurrentTabContent();
    
    // Save to localStorage
    this.saveToLocalStorage();
    
    // Combine HTML, CSS, and JS for server-side saving
    const combinedHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${this.currentComponent.id}</title>
  <style>
${this.cssCode}
  </style>
</head>
<body>
${this.htmlCode}
  <script>
${this.jsCode}
  </script>
</body>
</html>`;
    
    // Save to server based on location type
    if (this.currentComponent.locationType === 'local' || this.currentComponent.locationType === 'development') {
      // For local and development components, just show success message
      this.showToast('success', 'Saved', `Component ${this.currentComponent.name} saved to localStorage`);
      this.isEditorDirty = false;
      this.updateStatusMessage('Component saved to localStorage');
    } else {
      // For shared and course-specific components, save to server
      fetch('/api/save-component', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: this.currentComponent.id,
          name: this.currentComponent.name,
          locationType: this.currentComponent.locationType,
          path: this.currentComponent.path,
          content: combinedHTML
        })
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          this.showToast('success', 'Saved', `Component ${this.currentComponent.name} saved successfully`);
          this.isEditorDirty = false;
          this.updateStatusMessage('Component saved');
        } else {
          this.showToast('error', 'Error', data.message || 'Failed to save component');
        }
      })
      .catch(error => {
        console.error('Error saving component:', error);
        this.showToast('error', 'Error', 'Failed to save component');
      });
    }
  }
  
  /**
   * Save component to localStorage
   */
  saveToLocalStorage() {
    if (!this.currentComponent) return;
    
    try {
      // Create component data object
      const componentData = {
        id: this.currentComponent.id,
        name: this.currentComponent.name,
        html: this.htmlCode,
        css: this.cssCode,
        js: this.jsCode,
        lastModified: new Date().toISOString()
      };
      
      // Save to localStorage
      localStorage.setItem(`component_${this.currentComponent.id}`, JSON.stringify(componentData));
      
      // Also save as last edited component
      localStorage.setItem('lastEditedComponent', JSON.stringify(componentData));
      
      // Update projects list in localStorage
      this.updateProjectsList(componentData);
      
      return true;
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      this.showToast('error', 'Error', 'Failed to save to local storage');
      return false;
    }
  }
  
  /**
   * Update projects list in localStorage
   * @param {Object} componentData - Component data to add/update in the list
   */
  updateProjectsList(componentData) {
    try {
      // Get existing projects list
      let projectsList = [];
      const storedProjects = localStorage.getItem('projectsList');
      
      if (storedProjects) {
        projectsList = JSON.parse(storedProjects);
      }
      
      // Check if project already exists in the list
      const existingIndex = projectsList.findIndex(p => p.id === componentData.id);
      
      if (existingIndex >= 0) {
        // Update existing project
        projectsList[existingIndex] = {
          id: componentData.id,
          name: componentData.name,
          lastModified: componentData.lastModified
        };
      } else {
        // Add new project
        projectsList.push({
          id: componentData.id,
          name: componentData.name,
          lastModified: componentData.lastModified
        });
      }
      
      // Sort by last modified (newest first)
      projectsList.sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified));
      
      // Save updated list
      localStorage.setItem('projectsList', JSON.stringify(projectsList));
    } catch (error) {
      console.error('Error updating projects list:', error);
    }
  }
  
  /**
   * Load projects from localStorage
   * @returns {Array} Array of project objects
   */
  loadProjectsFromLocalStorage() {
    try {
      // Get projects list
      const storedProjects = localStorage.getItem('projectsList');
      
      if (storedProjects) {
        return JSON.parse(storedProjects);
      }
    } catch (error) {
      console.error('Error loading projects from localStorage:', error);
    }
    
    return [];
  }

  /**
   * Format code
   */
  formatCode() {
    let formattedCode = '';
    
    switch (this.currentTab) {
      case 'html':
        formattedCode = html_beautify(this.editor.getValue(), {
          indent_size: 2,
          wrap_line_length: 80,
          unformatted: ['code', 'pre']
        });
        break;
      case 'css':
        formattedCode = css_beautify(this.editor.getValue(), {
          indent_size: 2
        });
        break;
      case 'js':
        formattedCode = js_beautify(this.editor.getValue(), {
          indent_size: 2,
          space_in_empty_paren: true
        });
        break;
    }
    
    this.editor.setValue(formattedCode);
    this.showToast('info', 'Formatted', 'Code formatted successfully');
  }

  /**
   * Open component in new window
   */
  openInNewWindow() {
    // Save current tab content
    this.saveCurrentTabContent();
    
    // Combine HTML, CSS, and JS
    const combinedHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${this.currentComponent ? this.currentComponent.id : 'Component Preview'}</title>
  <style>
${this.cssCode}
  </style>
</head>
<body>
${this.htmlCode}
  <script>
${this.jsCode}
  </script>
</body>
</html>`;
    
    // Create blob and open in new window
    const blob = new Blob([combinedHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  }

  /**
   * Create new component
   */
  createComponent() {
    const name = this.componentName.value.trim();
    const title = this.componentTitle.value.trim();
    const template = this.componentTemplate.value;
    
    if (!name) {
      this.showToast('error', 'Error', 'Component name is required');
      return;
    }
    
    if (!title) {
      this.showToast('error', 'Error', 'Component title is required');
      return;
    }
    
    // Validate component name (lowercase, numbers, hyphens only)
    if (!/^[a-z0-9-]+$/.test(name)) {
      this.showToast('error', 'Error', 'Component name can only contain lowercase letters, numbers, and hyphens');
      return;
    }
    
    // Add .html extension if not provided
    const fileName = name.endsWith('.html') ? name : `${name}.html`;
    
    // Get template content
    let templateContent = this.defaultTemplate;
    
    // Replace title
    templateContent = templateContent.replace(/<title>.*?<\/title>/, `<title>${title}</title>`);
    templateContent = templateContent.replace(/<h1>.*?<\/h1>/, `<h1>${title}</h1>`);
    
    // Create component via API
    fetch('/api/create-component', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: name,
        name: fileName,
        title: title,
        template: template,
        content: templateContent,
        locationType: 'development'
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        this.showToast('success', 'Created', `Component ${fileName} created successfully`);
        this.closeModal(this.newComponentModal);
        
        // Reset form
        this.componentName.value = '';
        this.componentTitle.value = '';
        this.componentTemplate.value = 'default';
        
        // Refresh component list and load the new component
        this.initComponentRegistry().then(() => {
          this.loadComponentList();
          
          // Load the new component
          if (window.componentRegistry) {
            const component = window.componentRegistry.getComponentById(name);
            if (component) {
              this.loadComponentByType(component);
            }
          }
        });
      } else {
        this.showToast('error', 'Error', data.message || 'Failed to create component');
      }
    })
    .catch(error => {
      console.error('Error creating component:', error);
      this.showToast('error', 'Error', 'Failed to create component');
      
      // Fallback to localStorage
      this.createComponentInLocalStorage(name, fileName, title, templateContent);
    });
  }
  
  /**
   * Create component in localStorage (fallback)
   */
  createComponentInLocalStorage(id, name, title, content) {
    try {
      // Parse HTML, CSS, and JS from the template
      const parser = new DOMParser();
      const doc = parser.parseFromString(content, 'text/html');
      
      // Extract HTML
      const bodyContent = doc.body.innerHTML;
      
      // Remove script tags from HTML content
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = bodyContent;
      const scripts = tempDiv.querySelectorAll('script');
      scripts.forEach(script => script.remove());
      const htmlCode = tempDiv.innerHTML;
      
      // Extract CSS
      const styleTag = doc.querySelector('style');
      const cssCode = styleTag ? styleTag.textContent : '';
      
      // Extract JS
      const scriptTag = doc.querySelector('script');
      const jsCode = scriptTag ? scriptTag.textContent : '';
      
      // Create component data
      const componentData = {
        id: id,
        name: name,
        title: title,
        html: htmlCode,
        css: cssCode,
        js: jsCode,
        lastModified: new Date().toISOString()
      };
      
      // Save to localStorage
      localStorage.setItem(`component_${id}`, JSON.stringify(componentData));
      
      // Update projects list
      this.updateProjectsList(componentData);
      
      // Show success message
      this.showToast('success', 'Created', `Component ${name} created in localStorage`);
      this.closeModal(this.newComponentModal);
      
      // Reset form
      this.componentName.value = '';
      this.componentTitle.value = '';
      this.componentTemplate.value = 'default';
      
      // Refresh component list
      this.loadComponentList();
      
      // Load the new component
      this.loadComponentFromLocalStorage(id);
    } catch (error) {
      console.error('Error creating component in localStorage:', error);
      this.showToast('error', 'Error', 'Failed to create component in localStorage');
    }
  }

  /**
   * Promote component to production
   */
  promoteComponent() {
    if (!this.currentComponent) {
      this.showToast('error', 'Error', 'No component selected');
      return;
    }
    
    // Show promote modal
    this.openModal(this.promoteModal);
  }

  /**
   * Confirm promotion
   */
  confirmPromotion() {
    const type = this.promoteType.value;
    const description = document.getElementById('componentDescription').value.trim();
    const tags = document.getElementById('componentTags').value.trim();
    
    if (!description) {
      this.showToast('error', 'Error', 'Description is required');
      return;
    }
    
    if (!tags) {
      this.showToast('error', 'Error', 'Tags are required');
      return;
    }
    
    // Save current tab content
    this.saveCurrentTabContent();
    
    // Get additional fields based on type
    let additionalInfo = {};
    
    if (type === 'course-specific') {
      const courseId = document.getElementById('courseSelector').value;
      additionalInfo.courseId = courseId;
    } else {
      const category = document.getElementById('categorySelector').value;
      additionalInfo.category = category;
    }
    
    // Combine HTML, CSS, and JS
    const combinedHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${this.currentComponent.id}</title>
  <style>
${this.cssCode}
  </style>
</head>
<body>
${this.htmlCode}
  <script>
${this.jsCode}
  </script>
</body>
</html>`;
    
    // Promote component via API
    fetch('/api/promote-component', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: this.currentComponent.id,
        name: this.currentComponent.name,
        type: type,
        description: description,
        tags: tags.split(',').map(tag => tag.trim()),
        additionalInfo: additionalInfo,
        content: combinedHTML
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        this.showToast('success', 'Promoted', `Component ${this.currentComponent.name} promoted to production`);
        this.closeModal(this.promoteModal);
        
        // Reset form
        document.getElementById('componentDescription').value = '';
        document.getElementById('componentTags').value = '';
        this.promoteType.value = 'shared';
        document.getElementById('courseSelector').value = 'math-a151';
        document.getElementById('categorySelector').value = 'general';
        
        // Refresh component list
        this.initComponentRegistry().then(() => {
          this.loadComponentList();
        });
      } else {
        this.showToast('error', 'Error', data.message || 'Failed to promote component');
      }
    })
    .catch(error => {
      console.error('Error promoting component:', error);
      this.showToast('error', 'Error', 'Failed to promote component');
    });
  }

  /**
   * Show toast notification
   * @param {string} type - Toast type (success, error, info, warning)
   * @param {string} title - Toast title
   * @param {string} message - Toast message
   */
  showToast(type, title, message) {
    this.toast.className = `toast active toast-${type}`;
    this.toastTitle.textContent = title;
    this.toastMessage.textContent = message;
    
    switch (type) {
      case 'success':
        this.toastIcon.textContent = 'check_circle';
        break;
      case 'error':
        this.toastIcon.textContent = 'error';
        break;
      case 'info':
        this.toastIcon.textContent = 'info';
        break;
      case 'warning':
        this.toastIcon.textContent = 'warning';
        break;
    }
    
    setTimeout(() => {
      this.toast.className = 'toast';
    }, 3000);
  }

  /**
   * Open modal
   * @param {HTMLElement} modal - Modal element
   */
  openModal(modal) {
    modal.classList.add('active');
  }

  /**
   * Close modal
   * @param {HTMLElement} modal - Modal element
   */
  closeModal(modal) {
    modal.classList.remove('active');
  }

  /**
   * Confirm component deletion
   * @param {Object} component - Component to delete
   */
  confirmDeleteComponent(component) {
    // Get delete modal elements
    const deleteModal = document.getElementById('deleteModal');
    const deleteComponentName = document.getElementById('deleteComponentName');
    
    if (!deleteModal || !deleteComponentName) {
      console.warn('Delete modal elements not found');
      return;
    }
    
    // Store component to delete
    this.componentToDelete = component;
    
    // Set component name in modal
    deleteComponentName.textContent = component.title || component.name || component.id;
    
    // Show modal
    this.openModal(deleteModal);
    
    // Add event listeners if not already added
    if (!this.deleteModalInitialized) {
      const closeDeleteModal = document.getElementById('closeDeleteModal');
      const cancelDelete = document.getElementById('cancelDelete');
      const confirmDelete = document.getElementById('confirmDelete');
      
      if (closeDeleteModal) {
        closeDeleteModal.addEventListener('click', () => {
          this.closeModal(deleteModal);
        });
      }
      
      if (cancelDelete) {
        cancelDelete.addEventListener('click', () => {
          this.closeModal(deleteModal);
        });
      }
      
      if (confirmDelete) {
        confirmDelete.addEventListener('click', () => {
          this.deleteComponent(this.componentToDelete);
          this.closeModal(deleteModal);
        });
      }
      
      this.deleteModalInitialized = true;
    }
  }
  
  /**
   * Delete component
   * @param {Object} component - Component to delete
   */
  deleteComponent(component) {
    if (!component) return;
    
    try {
      // For local components, remove from localStorage
      if (component.locationType === 'local') {
        localStorage.removeItem(`component_${component.id}`);
        
        // Update projects list
        const storedProjects = localStorage.getItem('projectsList');
        if (storedProjects) {
          const projects = JSON.parse(storedProjects);
          const updatedProjects = projects.filter(p => p.id !== component.id);
          localStorage.setItem('projectsList', JSON.stringify(updatedProjects));
        }
        
        // Show success message
        this.showToast('success', 'Deleted', `Component ${component.title || component.name} deleted successfully`);
        
        // If the deleted component is the current component, clear editor
        if (this.currentComponent && this.currentComponent.id === component.id) {
          this.currentComponent = null;
          this.htmlCode = '';
          this.cssCode = '';
          this.jsCode = '';
          this.editor.setValue('');
          this.updateStatusMessage('Component deleted');
        }
        
        // Refresh component list
        this.loadComponentList();
        return;
      }
      
      // For other components, call the API
      fetch(`/api/components/${component.id}`, {
        method: 'DELETE'
      })
      .then(response => {
        if (response.ok) {
          // Show success message
          this.showToast('success', 'Deleted', `Component ${component.title || component.name} deleted successfully`);
          
          // If the deleted component is the current component, clear editor
          if (this.currentComponent && this.currentComponent.id === component.id) {
            this.currentComponent = null;
            this.htmlCode = '';
            this.cssCode = '';
            this.jsCode = '';
            this.editor.setValue('');
            this.updateStatusMessage('Component deleted');
          }
          
          // Refresh component list
          this.loadComponentList();
        } else {
          this.showToast('error', 'Error', `Failed to delete component ${component.title || component.name}`);
        }
      })
      .catch(error => {
        console.error('Error deleting component:', error);
        this.showToast('error', 'Error', `Error deleting component: ${error.message}`);
      });
    } catch (error) {
      console.error('Error deleting component:', error);
      this.showToast('error', 'Error', `Error deleting component: ${error.message}`);
    }
  }
  
  /**
   * Update status message
   * @param {string} message - Status message
   */
  updateStatusMessage(message) {
    this.statusMessage.textContent = message;
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.devPreview = new DevPreview();
});