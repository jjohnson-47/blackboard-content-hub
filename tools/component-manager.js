#!/usr/bin/env node

/**
 * Component Manager
 * 
 * Enhanced component management system for the Blackboard Content Hub.
 * This tool provides functionality for creating, updating, versioning,
 * and promoting components with improved metadata and dependency tracking.
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { execSync } = require('child_process');

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Define paths
const rootDir = path.join(__dirname, '..');
const devComponentsDir = path.join(rootDir, 'dev', 'components');
const sharedComponentsDir = path.join(rootDir, 'shared', 'components');
const coursesDir = path.join(rootDir, 'courses');
const docsDir = path.join(rootDir, 'docs');
const componentDataPath = path.join(docsDir, 'component-data.json');
const componentSchemaPath = path.join(docsDir, 'component-schema.json');

// Ensure directories exist
[devComponentsDir, sharedComponentsDir, coursesDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Command line arguments
const args = process.argv.slice(2);
const command = args[0];

// Show help if no command is provided
if (!command) {
  showHelp();
  rl.close();
  return;
}

// Process commands
switch (command) {
  case 'create':
    createComponent();
    break;
  case 'update':
    updateComponent(args[1]);
    break;
  case 'version':
    versionComponent(args[1]);
    break;
  case 'promote':
    promoteComponent(args[1]);
    break;
  case 'list':
    listComponents(args[1]);
    break;
  case 'info':
    showComponentInfo(args[1]);
    break;
  case 'validate':
    validateComponent(args[1]);
    break;
  case 'help':
  default:
    showHelp();
    rl.close();
    break;
}

/**
 * Create a new component with enhanced metadata
 */
function createComponent() {
  console.log('\nCreate New Component');
  console.log('===================\n');

  rl.question('Component type (shared, course-specific, development): ', (type) => {
    if (!['shared', 'course-specific', 'development'].includes(type)) {
      console.error('Error: Type must be "shared", "course-specific", or "development"');
      rl.close();
      return;
    }

    const questions = [
      { prompt: 'Component ID (e.g., binary-search-visualization): ', field: 'id' },
      { prompt: 'Component title: ', field: 'title' },
      { prompt: 'Version (e.g., 1.0.0): ', field: 'version', default: '1.0.0' },
      { prompt: 'Description: ', field: 'description' },
      { prompt: 'Category (general, research, visualization, etc.): ', field: 'category', default: 'general' },
      { prompt: 'Subcategory (optional): ', field: 'subcategory' },
      { prompt: 'Tags (comma-separated): ', field: 'tags', transform: val => val.split(',').map(tag => tag.trim()) }
    ];

    // Add course-specific question if needed
    if (type === 'course-specific') {
      questions.splice(5, 0, { prompt: 'Course ID (e.g., math-a251): ', field: 'courseId' });
    }

    // Add educational context questions
    const educationalQuestions = [
      { 
        prompt: 'Learning objectives (comma-separated): ', 
        field: 'learningObjectives', 
        transform: val => val.split(',').map(obj => obj.trim()) 
      },
      { 
        prompt: 'Educational levels (comma-separated, e.g., K-12, Undergraduate): ', 
        field: 'educationalLevel', 
        transform: val => val.split(',').map(level => level.trim()) 
      },
      { 
        prompt: 'Subject areas (comma-separated): ', 
        field: 'subjectAreas', 
        transform: val => val.split(',').map(area => area.trim()) 
      }
    ];

    // Add accessibility questions
    const accessibilityQuestions = [
      { prompt: 'WCAG compliance level (A, AA, AAA): ', field: 'wcag', default: 'AA' },
      { 
        prompt: 'Accessibility features (comma-separated): ', 
        field: 'features', 
        transform: val => val.split(',').map(feature => feature.trim()) 
      }
    ];

    // Add browser support questions
    const browserQuestions = [
      { prompt: 'Minimum Chrome version: ', field: 'chrome', default: 'latest' },
      { prompt: 'Minimum Firefox version: ', field: 'firefox', default: 'latest' },
      { prompt: 'Minimum Safari version: ', field: 'safari', default: 'latest' },
      { prompt: 'Minimum Edge version: ', field: 'edge', default: 'latest' }
    ];

    // Add author questions
    const authorQuestions = [
      { prompt: 'Author name: ', field: 'name' },
      { prompt: 'Author email (optional): ', field: 'email' },
      { prompt: 'Author role (optional): ', field: 'role' }
    ];

    // Collect basic component data
    collectAnswers(questions, {})
      .then(componentData => {
        // Add release date
        componentData.releaseDate = new Date().toISOString().split('T')[0];
        
        // Collect educational context data
        console.log('\nEducational Context');
        console.log('-------------------');
        return collectAnswers(educationalQuestions, {})
          .then(educationalData => {
            componentData.educationalContext = educationalData;
            
            // Collect accessibility data
            console.log('\nAccessibility');
            console.log('-------------');
            return collectAnswers(accessibilityQuestions, {});
          })
          .then(accessibilityData => {
            componentData.accessibility = accessibilityData;
            
            // Collect browser support data
            console.log('\nBrowser Support');
            console.log('--------------');
            return collectAnswers(browserQuestions, {});
          })
          .then(browserData => {
            componentData.browserSupport = browserData;
            
            // Collect author data
            console.log('\nAuthor Information');
            console.log('-----------------');
            return collectAnswers(authorQuestions, {});
          })
          .then(authorData => {
            componentData.authors = [authorData];
            
            // Initialize version history
            componentData.versionHistory = [{
              version: componentData.version,
              date: componentData.releaseDate,
              changes: ['Initial release']
            }];
            
            // Set component type
            componentData.type = type;
            
            // Set URLs based on type
            if (type === 'development') {
              componentData.url = `/blackboard-content-hub/dev/components/${componentData.id}.html`;
              componentData.documentationUrl = `/blackboard-content-hub/docs/development-environment/components/${componentData.id}.html`;
            } else if (type === 'shared') {
              componentData.url = `/blackboard-content-hub/shared/components/${componentData.id}.html`;
              componentData.documentationUrl = `/blackboard-content-hub/docs/examples/${componentData.id}.html`;
            } else if (type === 'course-specific') {
              componentData.url = `/blackboard-content-hub/courses/${componentData.courseId}/${componentData.id}.html`;
              componentData.documentationUrl = `/blackboard-content-hub/docs/courses/${componentData.courseId}/${componentData.id}.html`;
            }
            
            // Create component files
            createComponentFiles(componentData, type);
            
            return componentData;
          });
      })
      .catch(error => {
        console.error('Error creating component:', error);
        rl.close();
      });
  });
}

/**
 * Collect answers to a series of questions
 * @param {Array} questions - Array of question objects
 * @param {Object} answers - Object to store answers
 * @returns {Promise} Promise resolving to answers object
 */
function collectAnswers(questions, answers = {}) {
  return new Promise((resolve, reject) => {
    if (questions.length === 0) {
      resolve(answers);
      return;
    }
    
    const question = questions[0];
    const remainingQuestions = questions.slice(1);
    
    rl.question(`${question.prompt}${question.default ? ` (${question.default})` : ''} `, (answer) => {
      // Use default value if answer is empty
      if (!answer && question.default) {
        answer = question.default;
      }
      
      // Transform answer if needed
      if (question.transform && answer) {
        answer = question.transform(answer);
      }
      
      // Store answer
      answers[question.field] = answer;
      
      // Collect remaining answers
      collectAnswers(remainingQuestions, answers)
        .then(resolve)
        .catch(reject);
    });
  });
}

/**
 * Create component files based on component data
 * @param {Object} componentData - Component data
 * @param {string} type - Component type
 */
function createComponentFiles(componentData, type) {
  // Determine component directory
  let componentDir;
  if (type === 'development') {
    componentDir = devComponentsDir;
  } else if (type === 'shared') {
    componentDir = sharedComponentsDir;
  } else if (type === 'course-specific') {
    componentDir = path.join(coursesDir, componentData.courseId);
    // Create course directory if it doesn't exist
    if (!fs.existsSync(componentDir)) {
      fs.mkdirSync(componentDir, { recursive: true });
    }
  }
  
  // Create component HTML file
  const componentPath = path.join(componentDir, `${componentData.id}.html`);
  const componentContent = generateComponentHTML(componentData);
  fs.writeFileSync(componentPath, componentContent);
  console.log(`\nComponent HTML file created: ${componentPath}`);
  
  // Create documentation file
  let docsPath;
  if (type === 'development') {
    docsPath = path.join(docsDir, 'development-environment', 'components');
  } else if (type === 'shared') {
    docsPath = path.join(docsDir, 'examples');
  } else if (type === 'course-specific') {
    docsPath = path.join(docsDir, 'courses', componentData.courseId);
  }
  
  // Create documentation directory if it doesn't exist
  if (!fs.existsSync(docsPath)) {
    fs.mkdirSync(docsPath, { recursive: true });
  }
  
  // Create documentation file
  const docFilePath = path.join(docsPath, `${componentData.id}.md`);
  const docContent = generateDocumentation(componentData);
  fs.writeFileSync(docFilePath, docContent);
  console.log(`Documentation file created: ${docFilePath}`);
  
  // Update component-data.json
  updateComponentData(componentData);
  
  console.log('\nComponent created successfully!');
  console.log(`\nComponent URL: https://jjohnson-47.github.io${componentData.url}`);
  console.log(`Documentation URL: https://jjohnson-47.github.io${componentData.documentationUrl}`);
  
  rl.close();
}

/**
 * Generate HTML content for component
 * @param {Object} componentData - Component data
 * @returns {string} HTML content
 */
function generateComponentHTML(componentData) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${componentData.title}</title>
  <meta name="description" content="${componentData.description}">
  <meta name="version" content="${componentData.version}">
  <meta name="author" content="${componentData.authors[0].name}">
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f7f9fc;
      color: #333;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    
    h1 {
      color: #4a148c;
      margin-top: 0;
      font-size: 1.8rem;
      border-bottom: 2px solid #e0e0e0;
      padding-bottom: 10px;
    }
    
    /* Add your component-specific styles here */
  </style>
</head>
<body>
  <div class="container">
    <h1>${componentData.title}</h1>
    <div id="interactive-content">
      <!-- Your component's HTML goes here -->
      <p>This is a placeholder for the ${componentData.title} component.</p>
    </div>
  </div>

  <script>
    // Component metadata
    const componentInfo = {
      id: "${componentData.id}",
      version: "${componentData.version}",
      title: "${componentData.title}"
    };
    
    // Initialize component when DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
      console.log(\`\${componentInfo.title} (v\${componentInfo.version}) initialized\`);
      
      // Set up event handlers
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
      // Add your event handlers here
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
    }
  </script>
</body>
</html>`;
}

/**
 * Generate documentation for component
 * @param {Object} componentData - Component data
 * @returns {string} Documentation content
 */
function generateDocumentation(componentData) {
  // Format learning objectives as list items
  const learningObjectives = componentData.educationalContext.learningObjectives
    ? componentData.educationalContext.learningObjectives.map(obj => `- ${obj}`).join('\n')
    : '- No specific learning objectives defined';
  
  // Format accessibility features as list items
  const accessibilityFeatures = componentData.accessibility.features
    ? componentData.accessibility.features.map(feature => `- ${feature}`).join('\n')
    : '- No specific accessibility features defined';
  
  return `---
layout: page
title: ${componentData.title}
permalink: ${componentData.documentationUrl.replace('/blackboard-content-hub', '')}
---

# ${componentData.title}

**Version:** ${componentData.version} | **Released:** ${componentData.releaseDate}

${componentData.description}

<div class="component-preview">
  <iframe src="${componentData.url}" width="100%" height="500" frameborder="0" allowfullscreen></iframe>
  <div class="preview-controls">
    <button class="resize-btn" data-size="small">Small</button>
    <button class="resize-btn" data-size="medium">Medium</button>
    <button class="resize-btn" data-size="large">Large</button>
    <a href="${componentData.url}" target="_blank">Open in new tab</a>
  </div>
</div>

## Features

- Feature 1
- Feature 2
- Feature 3

## Usage

### Basic Embedding

To embed this component in a Blackboard page, use the following iframe code:

\`\`\`html
<iframe 
  src="https://jjohnson-47.github.io${componentData.url}" 
  width="100%" 
  height="500" 
  frameborder="0" 
  allowfullscreen>
</iframe>
\`\`\`

### Recommended Settings

For optimal viewing experience:
- Minimum width: 800px
- Minimum height: 500px
- Allow fullscreen for better interaction on mobile devices

## Implementation Details

The ${componentData.title} component is built using HTML, CSS, and JavaScript. It follows best practices for iframe implementation.

### Parent-Iframe Communication

This component supports communication with the parent page using the postMessage API. Here's an example of how to send a command to the component:

\`\`\`javascript
// Send command to iframe
const iframe = document.getElementById('component-iframe');
iframe.contentWindow.postMessage({
  type: 'command',
  action: 'getData',
  params: { id: 123 }
}, 'https://jjohnson-47.github.io');

// Listen for responses
window.addEventListener('message', function(event) {
  // Always verify origin in production
  if (event.origin !== 'https://jjohnson-47.github.io') return;
  
  console.log('Received data:', event.data);
}, false);
\`\`\`

## Educational Applications

### Learning Objectives

${learningObjectives}

### Educational Levels

${componentData.educationalContext.educationalLevel 
  ? componentData.educationalContext.educationalLevel.join(', ')
  : 'Not specified'}

### Subject Areas

${componentData.educationalContext.subjectAreas
  ? componentData.educationalContext.subjectAreas.join(', ')
  : 'Not specified'}

## Accessibility

This component is designed to be accessible with WCAG ${componentData.accessibility.wcag || 'AA'} compliance.

### Accessibility Features

${accessibilityFeatures}

## Browser Compatibility

- Chrome: ${componentData.browserSupport.chrome}
- Firefox: ${componentData.browserSupport.firefox}
- Safari: ${componentData.browserSupport.safari}
- Edge: ${componentData.browserSupport.edge}

## Version History

### ${componentData.version} (${componentData.releaseDate})
- Initial release
`;
}

/**
 * Update component-data.json with new component
 * @param {Object} componentData - Component data
 */
function updateComponentData(componentData) {
  let components = [];
  
  // Read existing component data if available
  if (fs.existsSync(componentDataPath)) {
    const data = fs.readFileSync(componentDataPath, 'utf8');
    components = JSON.parse(data);
  }
  
  // Check if component already exists
  const existingIndex = components.findIndex(c => c.id === componentData.id);
  
  if (existingIndex >= 0) {
    // Update existing component
    components[existingIndex] = componentData;
  } else {
    // Add new component
    components.push(componentData);
  }
  
  // Write updated component data
  fs.writeFileSync(componentDataPath, JSON.stringify(components, null, 2));
  console.log('Component data updated in component-data.json');
}

/**
 * Update an existing component
 * @param {string} componentId - Component ID
 */
function updateComponent(componentId) {
  if (!componentId) {
    rl.question('Component ID to update: ', (id) => {
      if (!id) {
        console.error('Error: Component ID is required');
        rl.close();
        return;
      }
      
      performUpdate(id);
    });
  } else {
    performUpdate(componentId);
  }
  
  function performUpdate(id) {
    // Read component data
    if (!fs.existsSync(componentDataPath)) {
      console.error('Error: component-data.json not found');
      rl.close();
      return;
    }
    
    const data = fs.readFileSync(componentDataPath, 'utf8');
    const components = JSON.parse(data);
    
    // Find component
    const componentIndex = components.findIndex(c => c.id === id);
    
    if (componentIndex < 0) {
      console.error(`Error: Component "${id}" not found`);
      rl.close();
      return;
    }
    
    const component = components[componentIndex];
    
    console.log(`\nUpdating Component: ${component.title} (${component.id})`);
    console.log('='.repeat(40));
    console.log('\nLeave fields blank to keep current values\n');
    
    // Fields that can be updated
    const updateableFields = [
      { prompt: `Title (current: ${component.title}): `, field: 'title' },
      { prompt: `Description (current: ${component.description}): `, field: 'description' },
      { prompt: `Category (current: ${component.category}): `, field: 'category' },
      { prompt: `Tags (current: ${component.tags ? component.tags.join(', ') : 'none'}): `, field: 'tags', transform: val => val.split(',').map(tag => tag.trim()) }
    ];
    
    // Collect updated values
    collectUpdates(updateableFields, component)
      .then(updatedComponent => {
        // Update component in array
        components[componentIndex] = updatedComponent;
        
        // Write updated component data
        fs.writeFileSync(componentDataPath, JSON.stringify(components, null, 2));
        console.log('\nComponent updated successfully!');
        
        // Update component files
        updateComponentFiles(updatedComponent);
        
        rl.close();
      })
      .catch(error => {
        console.error('Error updating component:', error);
        rl.close();
      });
  }
}

/**
 * Collect updates for component fields
 * @param {Array} fields - Fields to update
 * @param {Object} component - Current component data
 * @returns {Promise} Promise resolving to updated component
 */
function collectUpdates(fields, component) {
  return new Promise((resolve, reject) => {
    if (fields.length === 0) {
      resolve(component);
      return;
    }
    
    const field = fields[0];
    const remainingFields = fields.slice(1);
    
    rl.question(field.prompt, (answer) => {
      // Update field if answer is provided
      if (answer) {
        // Transform answer if needed
        if (field.transform) {
          answer = field.transform(answer);
        }
        
        component[field.field] = answer;
      }
      
      // Collect remaining updates
      collectUpdates(remainingFields, component)
        .then(resolve)
        .catch(reject);
    });
  });
}

/**
 * Update component files based on updated component data
 * @param {Object} component - Updated component data
 */
function updateComponentFiles(component) {
  // Determine component path
  let componentPath;
  if (component.type === 'development') {
    componentPath = path.join(devComponentsDir, `${component.id}.html`);
  } else if (component.type === 'shared') {
    componentPath = path.join(sharedComponentsDir, `${component.id}.html`);
  } else if (component.type === 'course-specific') {
    componentPath = path.join(coursesDir, component.courseId, `${component.id}.html`);
  }
  
  // Update component HTML file if it exists
  if (fs.existsSync(componentPath)) {
    // Read current file
    const currentContent = fs.readFileSync(componentPath, 'utf8');
    
    // Update title and description
    let updatedContent = currentContent
      .replace(/<title>.*?<\/title>/, `<title>${component.title}</title>`)
      .replace(/<meta name="description" content=".*?">/, `<meta name="description" content="${component.description}">`)
      .replace(/<h1>.*?<\/h1>/, `<h1>${component.title}</h1>`);
    
    // Write updated content
    fs.writeFileSync(componentPath, updatedContent);
    console.log(`Component HTML file updated: ${componentPath}`);
  }
  
  // Determine documentation path
  let docPath;
  if (component.type === 'development') {
    docPath = path.join(docsDir, 'development-environment', 'components', `${component.id}.md`);
  } else if (component.type === 'shared') {
    docPath = path.join(docsDir, 'examples', `${component.id}.md`);
  } else if (component.type === 'course-specific') {
    docPath = path.join(docsDir, 'courses', component.courseId, `${component.id}.md`);
  }
  
  // Update documentation file if it exists
  if (fs.existsSync(docPath)) {
    // Read current file
    const currentContent = fs.readFileSync(docPath, 'utf8');
    
    // Update title and description
    let updatedContent = currentContent
      .replace(/title: .*/, `title: ${component.title}`)
      .replace(/# .*/, `# ${component.title}`)
      .replace(/\n\n.*?\n\n/, `\n\n${component.description}\n\n`);
    
    // Write updated content
    fs.writeFileSync(docPath, updatedContent);
    console.log(`Documentation file updated: ${docPath}`);
  }
}

/**
 * Create a new version of a component
 * @param {string} componentId - Component ID
 */
function versionComponent(componentId) {
  if (!componentId) {
    rl.question('Component ID to version: ', (id) => {
      if (!id) {
        console.error('Error: Component ID is required');
        rl.close();
        return;
      }
      
      performVersioning(id);
    });
  } else {
    performVersioning(componentId);
  }
  
  function performVersioning(id) {
    // Read component data
    if (!fs.existsSync(componentDataPath)) {
      console.error('Error: component-data.json not found');
      rl.close();
      return;
    }
    
    const data = fs.readFileSync(componentDataPath, 'utf8');
    const components = JSON.parse(data);
    
    // Find component
    const componentIndex = components.findIndex(c => c.id === id);
    
    if (componentIndex < 0) {
      console.error(`Error: Component "${id}" not found`);
      rl.close();
      return;
    }
    
    const component = components[componentIndex];
    
    console.log(`\nCreating New Version for: ${component.title} (${component.id})`);
    console.log('='.repeat(50));
    console.log(`Current version: ${component.version}\n`);
    
    // Ask for new version
    rl.question('New version number (e.g., 1.1.0): ', (newVersion) => {
      if (!newVersion) {
        console.error('Error: New version number is required');
        rl.close();
        return;
      }
      
      // Validate version format
      if (!/^\d+\.\d+\.\d+$/.test(newVersion)) {
        console.error('Error: Version must be in format x.y.z (e.g., 1.1.0)');
        rl.close();
        return;
      }
      
      // Ask for changes
      rl.question('Changes in this version (comma-separated): ', (changesInput) => {
        if (!changesInput) {
          console.error('Error: Changes are required');
          rl.close();
          return;
        }
        
        const changes = changesInput.split(',').map(change => change.trim());
        const releaseDate = new Date().toISOString().split('T')[0];
        
        // Update version history
        if (!component.versionHistory) {
          component.versionHistory = [];
        }
        
        component.versionHistory.push({
          version: newVersion,
          date: releaseDate,
          changes
        });
        
        // Update version and release date
        component.version = newVersion;
        component.releaseDate = releaseDate;
        
        // Update component in array
        components[componentIndex] = component;
        
        // Write updated component data
        fs.writeFileSync(componentDataPath, JSON.stringify(components, null, 2));
        console.log('\nComponent version updated successfully!');
        
        // Update component files
        updateComponentVersion(component, newVersion);
        
        rl.close();
      });
    });
  }
}

/**
 * Update component files with new version
 * @param {Object} component - Component data
 * @param {string} newVersion - New version number
 */
function updateComponentVersion(component, newVersion) {
  // Determine component path
  let componentPath;
  if (component.type === 'development') {
    componentPath = path.join(devComponentsDir, `${component.id}.html`);
  } else if (component.type === 'shared') {
    componentPath = path.join(sharedComponentsDir, `${component.id}.html`);
  } else if (component.type === 'course-specific') {
    componentPath = path.join(coursesDir, component.courseId, `${component.id}.html`);
  }
  
  // Update component HTML file if it exists
  if (fs.existsSync(componentPath)) {
    // Read current file
    const currentContent = fs.readFileSync(componentPath, 'utf8');
    
    // Update version
    let updatedContent = currentContent
      .replace(/<meta name="version" content=".*?">/, `<meta name="version" content="${newVersion}">`)
      .replace(/version: ".*?"/, `version: "${newVersion}"`);
    
    // Write updated content
    fs.writeFileSync(componentPath, updatedContent);
    console.log(`Component HTML file updated with new version: ${componentPath}`);
  }
  
  // Determine documentation path
  let docPath;
  if (component.type === 'development') {
    docPath = path.join(docsDir, 'development-environment', 'components', `${component.id}.md`);
  } else if (component.type === 'shared') {
    docPath = path.join(docsDir, 'examples', `${component.id}.md`);
  } else if (component.type === 'course-specific') {
    docPath = path.join(docsDir, 'courses', component.courseId, `${component.id}.md`);
  }
  
  // Update documentation file if it exists
  if (fs.existsSync(docPath)) {
    // Read current file
    const currentContent = fs.readFileSync(docPath, 'utf8');
    
    // Update version
    let updatedContent = currentContent
      .replace(/\*\*Version:\*\* .*? \|/, `**Version:** ${newVersion} |`)
      .replace(/\*\*Released:\*\* .*?/, `**Released:** ${component.releaseDate}`);
    
    // Add new version to version history
    const latestVersion = component.versionHistory[component.versionHistory.length - 1];
    const versionHistoryEntry = `\n### ${latestVersion.version} (${latestVersion.date})
${latestVersion.changes.map(change => `- ${change}`).join('\n')}`;
    
    // Check if version history section exists
    if (updatedContent.includes('## Version History')) {
      // Add new version at the top of the version history section
      updatedContent = updatedContent.replace(/## Version History\n\n/, `## Version History\n\n${versionHistoryEntry}\n\n`);
    } else {
      // Add version history section at the end
      updatedContent += `\n## Version History\n\n${versionHistoryEntry}\n`;
    }
    
    // Write updated content
    fs.writeFileSync(docPath, updatedContent);
    console.log(`Documentation file updated with new version: ${docPath}`);
  }
}

/**
 * Promote a component from development to production
 * @param {string} componentId - Component ID
 */
function promoteComponent(componentId) {
  if (!componentId) {
    rl.question('Component ID to promote: ', (id) => {
      if (!id) {
        console.error('Error: Component ID is required');
        rl.close();
        return;
      }
      
      performPromotion(id);
    });
  } else {
    performPromotion(componentId);
  }
  
  function performPromotion(id) {
    // Read component data
    if (!fs.existsSync(componentDataPath)) {
      console.error('Error: component-data.json not found');
      rl.close();
      return;
    }
    
    const data = fs.readFileSync(componentDataPath, 'utf8');
    const components = JSON.parse(data);
    
    // Find component
    const componentIndex = components.findIndex(c => c.id === id);
    
    if (componentIndex < 0) {
      console.error(`Error: Component "${id}" not found`);
      rl.close();
      return;
    }
    
    const component = components[componentIndex];
    
    // Check if component is already in production
    if (component.type !== 'development') {
      console.error(`Error: Component "${id}" is already in production`);
      rl.close();
      return;
    }
    
    console.log(`\nPromoting Component: ${component.title} (${component.id})`);
    console.log('='.repeat(50));
    
    rl.question('Promote to (shared or course-specific): ', (type) => {
      if (!['shared', 'course-specific'].includes(type)) {
        console.error('Error: Type must be "shared" or "course-specific"');
        rl.close();
        return;
      }
      
      let courseId = '';
      
      const promoteComponent = () => {
        // Source path
        const sourcePath = path.join(devComponentsDir, `${component.id}.html`);
        
        // Destination path
        let destPath;
        if (type === 'shared') {
          destPath = path.join(sharedComponentsDir, `${component.id}.html`);
          component.url = `/blackboard-content-hub/shared/components/${component.id}.html`;
          component.documentationUrl = `/blackboard-content-hub/examples/${component.id}.html`;
        } else {
          destPath = path.join(coursesDir, courseId, `${component.id}.html`);
          component.url = `/blackboard-content-hub/courses/${courseId}/${component.id}.html`;
          component.documentationUrl = `/blackboard-content-hub/docs/courses/${courseId}/${component.id}.html`;
          component.courseId = courseId;
        }
        
        // Create destination directory if it doesn't exist
        const destDir = path.dirname(destPath);
        if (!fs.existsSync(destDir)) {
          fs.mkdirSync(destDir, { recursive: true });
        }
        
        // Copy component file
        fs.copyFileSync(sourcePath, destPath);
        console.log(`Component file copied to: ${destPath}`);
        
        // Source documentation path
        const sourceDocPath = path.join(docsDir, 'development-environment', 'components', `${component.id}.md`);
        
        // Destination documentation path
        let destDocPath;
        if (type === 'shared') {
          destDocPath = path.join(docsDir, 'examples', `${component.id}.md`);
        } else {
          destDocPath = path.join(docsDir, 'courses', courseId, `${component.id}.md`);
        }
        
        // Create destination directory if it doesn't exist
        const destDocDir = path.dirname(destDocPath);
        if (!fs.existsSync(destDocDir)) {
          fs.mkdirSync(destDocDir, { recursive: true });
        }
        
        // Copy documentation file if it exists
        if (fs.existsSync(sourceDocPath)) {
          fs.copyFileSync(sourceDocPath, destDocPath);
          console.log(`Documentation file copied to: ${destDocPath}`);
          
          // Update documentation file with new URLs
          let docContent = fs.readFileSync(destDocPath, 'utf8');
          docContent = docContent
            .replace(/permalink: .*/, `permalink: ${component.documentationUrl.replace('/blackboard-content-hub', '')}`)
            .replace(/src=".*?"/, `src="${component.url}"`);
          
          fs.writeFileSync(destDocPath, docContent);
        }
        
        // Update component type
        component.type = type;
        
        // Update component in array
        components[componentIndex] = component;
        
        // Write updated component data
        fs.writeFileSync(componentDataPath, JSON.stringify(components, null, 2));
        console.log('\nComponent promoted successfully!');
        
        rl.close();
      };
      
      if (type === 'course-specific') {
        rl.question('Course ID (e.g., math-a251): ', (id) => {
          if (!id) {
            console.error('Error: Course ID is required for course-specific components');
            rl.close();
            return;
          }
          
          courseId = id;
          promoteComponent();
        });
      } else {
        promoteComponent();
      }
    });
  }
}

/**
 * List components
 * @param {string} filter - Filter by type or category
 */
function listComponents(filter) {
  // Read component data
  if (!fs.existsSync(componentDataPath)) {
    console.error('Error: component-data.json not found');
    rl.close();
    return;
  }
  
  const data = fs.readFileSync(componentDataPath, 'utf8');
  const components = JSON.parse(data);
  
  console.log('\nComponents');
  console.log('==========\n');
  
  // Filter components if filter is provided
  let filteredComponents = components;
  if (filter) {
    if (['shared', 'course-specific', 'development'].includes(filter)) {
      // Filter by type
      filteredComponents = components.filter(c => c.type === filter);
      console.log(`Showing ${filter} components:\n`);
    } else {
      // Filter by category
      filteredComponents = components.filter(c => c.category === filter);
      console.log(`Showing components in category "${filter}":\n`);
    }
  }
  
  // Group components by type
  const groupedComponents = {
    shared: [],
    'course-specific': [],
    development: []
  };
  
  filteredComponents.forEach(component => {
    if (groupedComponents[component.type]) {
      groupedComponents[component.type].push(component);
    }
  });
  
  // Display components by type
  Object.keys(groupedComponents).forEach(type => {
    if (groupedComponents[type].length > 0) {
      console.log(`${type.charAt(0).toUpperCase() + type.slice(1)} Components:`);
      console.log('-'.repeat(type.length + 11));
      
      groupedComponents[type].forEach(component => {
        console.log(`- ${component.title} (${component.id}) - v${component.version}`);
        console.log(`  ${component.description.substring(0, 80)}${component.description.length > 80 ? '...' : ''}`);
        console.log(`  URL: ${component.url}`);
        console.log();
      });
    }
  });
  
  console.log(`Total: ${filteredComponents.length} component(s)`);
  rl.close();
}

/**
 * Show detailed information about a component
 * @param {string} componentId - Component ID
 */
function showComponentInfo(componentId) {
  if (!componentId) {
    rl.question('Component ID: ', (id) => {
      if (!id) {
        console.error('Error: Component ID is required');
        rl.close();
        return;
      }
      
      displayComponentInfo(id);
    });
  } else {
    displayComponentInfo(componentId);
  }
  
  function displayComponentInfo(id) {
    // Read component data
    if (!fs.existsSync(componentDataPath)) {
      console.error('Error: component-data.json not found');
      rl.close();
      return;
    }
    
    const data = fs.readFileSync(componentDataPath, 'utf8');
    const components = JSON.parse(data);
    
    // Find component
    const component = components.find(c => c.id === id);
    
    if (!component) {
      console.error(`Error: Component "${id}" not found`);
      rl.close();
      return;
    }
    
    console.log(`\nComponent Information: ${component.title}`);
    console.log('='.repeat(30 + component.title.length));
    console.log();
    
    console.log(`ID: ${component.id}`);
    console.log(`Title: ${component.title}`);
    console.log(`Type: ${component.type}`);
    console.log(`Category: ${component.category}`);
    if (component.subcategory) {
      console.log(`Subcategory: ${component.subcategory}`);
    }
    if (component.courseId) {
      console.log(`Course ID: ${component.courseId}`);
    }
    console.log(`Version: ${component.version}`);
    console.log(`Release Date: ${component.releaseDate}`);
    console.log(`Description: ${component.description}`);
    console.log(`URL: ${component.url}`);
    console.log(`Documentation URL: ${component.documentationUrl}`);
    if (component.sourceUrl) {
      console.log(`Source URL: ${component.sourceUrl}`);
    }
    console.log(`Tags: ${component.tags ? component.tags.join(', ') : 'None'}`);
    
    if (component.dependencies && component.dependencies.length > 0) {
      console.log('\nDependencies:');
      component.dependencies.forEach(dep => {
        console.log(`- ${dep.id} (${dep.version})${dep.optional ? ' (optional)' : ''}`);
      });
    }
    
    if (component.authors && component.authors.length > 0) {
      console.log('\nAuthors:');
      component.authors.forEach(author => {
        console.log(`- ${author.name}${author.email ? ` <${author.email}>` : ''}${author.role ? ` (${author.role})` : ''}`);
      });
    }
    
    if (component.accessibility) {
      console.log('\nAccessibility:');
      console.log(`WCAG Compliance: ${component.accessibility.wcag || 'Not specified'}`);
      if (component.accessibility.features && component.accessibility.features.length > 0) {
        console.log('Features:');
        component.accessibility.features.forEach(feature => {
          console.log(`- ${feature}`);
        });
      }
      if (component.accessibility.limitations && component.accessibility.limitations.length > 0) {
        console.log('Limitations:');
        component.accessibility.limitations.forEach(limitation => {
          console.log(`- ${limitation}`);
        });
      }
    }
    
    if (component.browserSupport) {
      console.log('\nBrowser Support:');
      Object.entries(component.browserSupport).forEach(([browser, version]) => {
        console.log(`- ${browser.charAt(0).toUpperCase() + browser.slice(1)}: ${version}`);
      });
    }
    
    if (component.educationalContext) {
      console.log('\nEducational Context:');
      if (component.educationalContext.learningObjectives && component.educationalContext.learningObjectives.length > 0) {
        console.log('Learning Objectives:');
        component.educationalContext.learningObjectives.forEach(objective => {
          console.log(`- ${objective}`);
        });
      }
      if (component.educationalContext.educationalLevel && component.educationalContext.educationalLevel.length > 0) {
        console.log(`Educational Levels: ${component.educationalContext.educationalLevel.join(', ')}`);
      }
      if (component.educationalContext.subjectAreas && component.educationalContext.subjectAreas.length > 0) {
        console.log(`Subject Areas: ${component.educationalContext.subjectAreas.join(', ')}`);
      }
    }
    
    if (component.versionHistory && component.versionHistory.length > 0) {
      console.log('\nVersion History:');
      component.versionHistory.forEach(version => {
        console.log(`\n${version.version} (${version.date}):`);
        version.changes.forEach(change => {
          console.log(`- ${change}`);
        });
      });
    }
    
    rl.close();
  }
}

/**
 * Validate a component against the schema
 * @param {string} componentId - Component ID
 */
function validateComponent(componentId) {
  if (!componentId) {
    rl.question('Component ID to validate: ', (id) => {
      if (!id) {
        console.error('Error: Component ID is required');
        rl.close();
        return;
      }
      
      performValidation(id);
    });
  } else {
    performValidation(componentId);
  }
  
  function performValidation(id) {
    // Read component data
    if (!fs.existsSync(componentDataPath)) {
      console.error('Error: component-data.json not found');
      rl.close();
      return;
    }
    
    const data = fs.readFileSync(componentDataPath, 'utf8');
    const components = JSON.parse(data);
    
    // Find component
    const component = components.find(c => c.id === id);
    
    if (!component) {
      console.error(`Error: Component "${id}" not found`);
      rl.close();
      return;
    }
    
    console.log(`\nValidating Component: ${component.title} (${component.id})`);
    console.log('='.repeat(40));
    
    // Read schema
    if (!fs.existsSync(componentSchemaPath)) {
      console.error('Error: component-schema.json not found');
      rl.close();
      return;
    }
    
    const schemaData = fs.readFileSync(componentSchemaPath, 'utf8');
    const schema = JSON.parse(schemaData);
    
    // Validate required fields
    const requiredFields = schema.required;
    const missingFields = requiredFields.filter(field => !component[field]);
    
    if (missingFields.length > 0) {
      console.log('\nMissing required fields:');
      missingFields.forEach(field => {
        console.log(`- ${field}`);
      });
    } else {
      console.log('\nAll required fields are present.');
    }
    
    // Validate field types
    const fieldErrors = [];
    Object.entries(schema.properties).forEach(([field, definition]) => {
      if (component[field]) {
        // Check type
        if (definition.type === 'string' && typeof component[field] !== 'string') {
          fieldErrors.push(`${field}: Expected string, got ${typeof component[field]}`);
        } else if (definition.type === 'array' && !Array.isArray(component[field])) {
          fieldErrors.push(`${field}: Expected array, got ${typeof component[field]}`);
        } else if (definition.type === 'object' && typeof component[field] !== 'object') {
          fieldErrors.push(`${field}: Expected object, got ${typeof component[field]}`);
        }
        
        // Check pattern
        if (definition.pattern && typeof component[field] === 'string' && !new RegExp(definition.pattern).test(component[field])) {
          fieldErrors.push(`${field}: Value "${component[field]}" does not match pattern ${definition.pattern}`);
        }
        
        // Check enum
        if (definition.enum && !definition.enum.includes(component[field])) {
          fieldErrors.push(`${field}: Value "${component[field]}" is not one of ${definition.enum.join(', ')}`);
        }
      }
    });
    
    if (fieldErrors.length > 0) {
      console.log('\nField validation errors:');
      fieldErrors.forEach(error => {
        console.log(`- ${error}`);
      });
    } else {
      console.log('All fields have valid types and formats.');
    }
    
    // Check for course ID if type is course-specific
    if (component.type === 'course-specific' && !component.courseId) {
      console.log('\nWarning: Course-specific component is missing courseId field.');
    }
    
    // Overall validation result
    if (missingFields.length === 0 && fieldErrors.length === 0) {
      console.log('\nValidation successful! Component is valid.');
    } else {
      console.log('\nValidation failed. Please fix the issues listed above.');
    }
    
    rl.close();
  }
}

/**
 * Show help message
 */
function showHelp() {
  console.log(`
Component Manager
================

Enhanced component management system for the Blackboard Content Hub.

Commands:
  create    Create a new component with enhanced metadata
  update    Update an existing component
  version   Create a new version of a component
  promote   Promote a component from development to production
  list      List components (optionally filter by type or category)
  info      Show detailed information about a component
  validate  Validate a component against the schema
  help      Show this help message

Examples:
  node tools/component-manager.js create
  node tools/component-manager.js update binary-search-visualization
  node tools/component-manager.js version calculus-derivative-explorer
  node tools/component-manager.js promote interactive-graph
  node tools/component-manager.js list shared
  node tools/component-manager.js info flatland-message
  node tools/component-manager.js validate molecule-viewer
  `);
}