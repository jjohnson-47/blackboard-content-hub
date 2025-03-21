#!/usr/bin/env node

/**
 * Development Component Tool
 * 
 * This script helps create and manage development components
 * for testing before moving them to production.
 * 
 * Enhanced in Phase 3 with:
 * - Component Registry integration
 * - Support for components from all locations
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const componentRegistry = require('../shared/scripts/component-registry');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Define paths
const rootDir = path.join(__dirname, '..');
const devComponentsDir = path.join(rootDir, 'dev', 'components');
const templatePath = path.join(devComponentsDir, 'template.html');

// Ensure dev components directory exists
if (!fs.existsSync(devComponentsDir)) {
  fs.mkdirSync(devComponentsDir, { recursive: true });
}

// Initialize component registry
async function initRegistry() {
  try {
    await componentRegistry.initialize();
    console.log('Component registry initialized');
    return true;
  } catch (error) {
    console.error('Error initializing component registry:', error);
    return false;
  }
}

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
  case 'list':
    listComponents();
    break;
  case 'promote':
    promoteComponent(args[1]);
    break;
  case 'help':
  default:
    showHelp();
    rl.close();
    break;
}

// Create a new development component
function createComponent() {
  rl.question('Component name (without .html extension): ', (componentName) => {
    if (!componentName) {
      console.error('Component name is required');
      rl.close();
      return;
    }

    // Add .html extension if not provided
    if (!componentName.endsWith('.html')) {
      componentName += '.html';
    }

    const componentPath = path.join(devComponentsDir, componentName);

    // Check if component already exists
    if (fs.existsSync(componentPath)) {
      rl.question('Component already exists. Overwrite? (y/n): ', (answer) => {
        if (answer.toLowerCase() !== 'y') {
          console.log('Operation cancelled');
          rl.close();
          return;
        }
        
        copyTemplate(componentPath, componentName);
      });
    } else {
      copyTemplate(componentPath, componentName);
    }
  });
}

// Copy template to new component file
async function copyTemplate(componentPath, componentName) {
  // Read template
  fs.readFile(templatePath, 'utf8', async (err, data) => {
    if (err) {
      console.error('Error reading template:', err);
      rl.close();
      return;
    }

    // Replace template placeholders
    const title = componentName.replace('.html', '').split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');

    const content = data
      .replace(/Development Component Template/g, title)
      .replace(/Development Component/g, title);

    // Write new component file
    fs.writeFile(componentPath, content, async (err) => {
      if (err) {
        console.error('Error creating component:', err);
        rl.close();
        return;
      }

      console.log(`Component created at: ${componentPath}`);
      
      // Register with component registry
      try {
        // Initialize registry if not already initialized
        await initRegistry();
        
        // Register component
        const componentId = componentName.replace('.html', '');
        const registeredComponent = componentRegistry.registerComponent({
          id: componentId,
          name: componentName,
          title: title,
          path: path.relative(rootDir, componentPath),
          fullPath: componentPath,
          locationType: 'development',
          lastModified: new Date().toISOString()
        });
        
        console.log(`Component registered with unified registry`);
      } catch (error) {
        console.error('Error registering component with registry:', error);
      }
      
      console.log(`\nPreview URL: http://localhost:8080/dev/components/${componentName}`);
      console.log(`Preview UI: http://localhost:8080/dev/preview/`);
      rl.close();
    });
  });
}

// List all development components
async function listComponents() {
  // Initialize registry
  await initRegistry();
  
  // Get development components from registry
  const devComponents = componentRegistry.getComponentsByLocation('development');
  
  console.log('\nDevelopment Components:');
  console.log('======================');
  
  if (devComponents.length === 0) {
    console.log('No development components found');
  } else {
    devComponents.forEach(component => {
      console.log(`- ${component.name} (${component.title})`);
    });
  }
  
  console.log(`\nTotal: ${devComponents.length} component(s)`);
  console.log(`\nPreview UI: http://localhost:8080/dev/preview/`);
  rl.close();
}

// Promote a development component to production
function promoteComponent(componentName) {
  if (!componentName) {
    rl.question('Component name to promote (without .html extension): ', (name) => {
      if (!name) {
        console.error('Component name is required');
        rl.close();
        return;
      }

      // Add .html extension if not provided
      if (!name.endsWith('.html')) {
        name += '.html';
      }

      promptForPromotion(name);
    });
  } else {
    // Add .html extension if not provided
    if (!componentName.endsWith('.html')) {
      componentName += '.html';
    }

    promptForPromotion(componentName);
  }
}

// Prompt for promotion details
function promptForPromotion(componentName) {
  const componentPath = path.join(devComponentsDir, componentName);

  // Check if component exists
  if (!fs.existsSync(componentPath)) {
    console.error(`Component not found: ${componentName}`);
    rl.close();
    return;
  }

  rl.question('Promote to (shared or course-specific): ', (type) => {
    if (type !== 'shared' && type !== 'course-specific') {
      console.error('Type must be either "shared" or "course-specific"');
      rl.close();
      return;
    }

    if (type === 'course-specific') {
      rl.question('Course ID (e.g., math-a251, stat-a253): ', (courseId) => {
        rl.question('Component description: ', (description) => {
          rl.question('Tags (comma-separated): ', (tags) => {
            promoteToProduction(componentName, componentPath, type, description, tags.split(',').map(tag => tag.trim()), courseId);
          });
        });
      });
    } else {
      rl.question('Category (general, research): ', (category) => {
        rl.question('Component description: ', (description) => {
          rl.question('Tags (comma-separated): ', (tags) => {
            promoteToProduction(componentName, componentPath, type, description, tags.split(',').map(tag => tag.trim()), null, category);
          });
        });
      });
    }
  });
}

// Promote component to production
async function promoteToProduction(componentName, componentPath, type, description, tags, courseId = null, category = 'general') {
  try {
    // Read component content
    const content = fs.readFileSync(componentPath, 'utf8');
    
    // Determine target directory
    const targetDir = type === 'course-specific' 
      ? path.join(rootDir, 'courses', courseId)
      : path.join(rootDir, 'shared', 'components');
    
    // Create target directory if it doesn't exist
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    
    // Write component to target directory
    const targetPath = path.join(targetDir, componentName);
    fs.writeFileSync(targetPath, content);
    console.log(`Component promoted to: ${targetPath}`);
    
    // Create documentation file
    const componentId = componentName.replace('.html', '');
    const title = componentId.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
    
    const docsDir = path.join(rootDir, 'docs', 'examples');
    if (!fs.existsSync(docsDir)) {
      fs.mkdirSync(docsDir, { recursive: true });
    }
    
    // Create documentation template
    const documentationTemplate = `---
layout: page
title: ${title}
permalink: /examples/${componentId}
---

# ${title}

${description}

## Features

- Feature 1
- Feature 2
- Feature 3

## Usage

### Basic Embedding

To embed this component in a Blackboard page, use the following iframe code:

\`\`\`html
<iframe 
  src="https://jjohnson-47.github.io/blackboard-content-hub/${type === 'course-specific' ? 'courses/' + courseId : 'shared/components'}/${componentName}" 
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

The ${title} component is built using HTML, CSS, and JavaScript. It follows best practices for iframe implementation.

## Educational Applications

This component can be used in various educational contexts:

- Application 1
- Application 2
- Application 3

## Accessibility

The component includes several accessibility features:

- High contrast colors for visual elements
- Keyboard navigation support
- Text alternatives for visual information
- Responsive design for different devices

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
`;
    
    const docsPath = path.join(docsDir, `${componentId}.md`);
    fs.writeFileSync(docsPath, documentationTemplate);
    console.log(`Documentation created at: ${docsPath}`);
    
    // Add to component-data.json
    const dataPath = path.join(rootDir, 'docs', 'component-data.json');
    let components = [];
    
    if (fs.existsSync(dataPath)) {
      const data = fs.readFileSync(dataPath, 'utf8');
      components = JSON.parse(data);
    }
    
    const newComponent = {
      id: componentId,
      title: title,
      category: category,
      type: courseId ? 'course-specific' : 'shared',
      description: description,
      url: `/blackboard-content-hub/${type === 'course-specific' ? 'courses/' + courseId : 'shared/components'}/${componentName}`,
      documentationUrl: `/blackboard-content-hub/examples/${componentId}.html`,
      tags: tags
    };
    
    if (courseId) {
      newComponent.courseId = courseId;
    }
    
    components.push(newComponent);
    fs.writeFileSync(dataPath, JSON.stringify(components, null, 2));
    console.log(`Component added to component-data.json`);
    
    // Register with component registry
    await initRegistry();
    
    // Register component in new location
    const relativePath = type === 'course-specific' 
      ? path.join('courses', courseId, componentName)
      : path.join('shared', 'components', componentName);
    
    componentRegistry.registerComponent({
      id: componentId,
      name: componentName,
      title: title,
      path: relativePath,
      fullPath: targetPath,
      locationType: courseId ? 'course' : 'shared',
      courseId: courseId,
      category: category,
      description: description,
      tags: tags,
      lastModified: new Date().toISOString()
    });
    
    console.log(`Component registered with unified registry`);
    
    // Remove from development directory
    fs.unlinkSync(componentPath);
    console.log(`Removed development component: ${componentPath}`);
    
    console.log(`\nPromotion complete!`);
    console.log(`Component URL: https://jjohnson-47.github.io/blackboard-content-hub/${type === 'course-specific' ? 'courses/' + courseId : 'shared/components'}/${componentName}`);
    console.log(`Documentation URL: https://jjohnson-47.github.io/blackboard-content-hub/examples/${componentId}.html`);
    
  } catch (error) {
    console.error('Error promoting component:', error);
  }
  
  rl.close();
}

// Show help
function showHelp() {
  console.log(`
Development Component Tool
=========================

This tool helps create and manage development components for testing
before moving them to production.

Commands:
  create    Create a new development component
  list      List all development components
  promote   Promote a development component to production
  help      Show this help message

Examples:
  node tools/dev-component.js create
  node tools/dev-component.js list
  node tools/dev-component.js promote my-component
  `);
}