#!/usr/bin/env node

/**
 * Component Creation Tool
 * 
 * This script creates a new component with the appropriate structure
 * and adds it to the component-data.json file.
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Template for new components
const componentTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{TITLE}}</title>
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
    <h1>{{TITLE}}</h1>
    <div id="interactive-content">
      <!-- Your component's HTML goes here -->
      <p>This is a placeholder for the {{TITLE}} component.</p>
    </div>
  </div>

  <script>
    // Your component's JavaScript goes here
    document.addEventListener('DOMContentLoaded', function() {
      console.log('{{COMPONENT_ID}} loaded');
      
      // Initialize your component
      
    });
  </script>
</body>
</html>`;

// Template for documentation
const documentationTemplate = `---
layout: page
title: {{TITLE}}
permalink: /examples/{{COMPONENT_ID}}
---

# {{TITLE}}

{{DESCRIPTION}}

## Features

- Feature 1
- Feature 2
- Feature 3

## Usage

### Basic Embedding

To embed this component in a Blackboard page, use the following iframe code:

\`\`\`html
<iframe 
  src="https://yourusername.github.io/blackboard-content-hub/{{URL}}" 
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

The {{TITLE}} component is built using HTML, CSS, and JavaScript. It follows best practices for iframe implementation.

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

// Ask questions to configure the component
rl.question('Component type (course-specific or shared): ', (type) => {
  if (type !== 'course-specific' && type !== 'shared') {
    console.error('Type must be either "course-specific" or "shared"');
    rl.close();
    return;
  }

  if (type === 'course-specific') {
    rl.question('Course ID (e.g., math-a251, stat-a253): ', (courseId) => {
      rl.question('Component name (e.g., binary-search-visualization): ', (componentName) => {
        rl.question('Component title: ', (title) => {
          rl.question('Component description: ', (description) => {
            rl.question('Tags (comma-separated): ', (tags) => {
              createComponent('courses/' + courseId, componentName, title, description, tags.split(',').map(tag => tag.trim()), courseId);
            });
          });
        });
      });
    });
  } else {
    rl.question('Component name (e.g., sorting-algorithm-demo): ', (componentName) => {
      rl.question('Component title: ', (title) => {
        rl.question('Component description: ', (description) => {
          rl.question('Category (general, research): ', (category) => {
            rl.question('Tags (comma-separated): ', (tags) => {
              createComponent('shared/components', componentName, title, description, tags.split(',').map(tag => tag.trim()), null, category);
            });
          });
        });
      });
    });
  }
});

function createComponent(directory, componentName, title, description, tags, courseId = null, category = 'general') {
  const rootDir = path.join(__dirname, '..');
  
  // Create directory if it doesn't exist
  const componentDir = path.join(rootDir, directory);
  if (!fs.existsSync(componentDir)) {
    fs.mkdirSync(componentDir, { recursive: true });
  }

  // Create the HTML file
  const filePath = path.join(componentDir, `${componentName}.html`);
  
  let template = componentTemplate;
  template = template.replace(/{{TITLE}}/g, title);
  template = template.replace(/{{COMPONENT_ID}}/g, componentName);
  
  fs.writeFileSync(filePath, template);
  console.log(`Component created at: ${filePath}`);
  
  // Create documentation file
  const docsDir = path.join(rootDir, 'docs', 'examples');
  if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir, { recursive: true });
  }
  
  const docsPath = path.join(docsDir, `${componentName}.md`);
  let docsTemplate = documentationTemplate;
  docsTemplate = docsTemplate.replace(/{{TITLE}}/g, title);
  docsTemplate = docsTemplate.replace(/{{COMPONENT_ID}}/g, componentName);
  docsTemplate = docsTemplate.replace(/{{DESCRIPTION}}/g, description);
  docsTemplate = docsTemplate.replace(/{{URL}}/g, directory + '/' + componentName + '.html');
  
  fs.writeFileSync(docsPath, docsTemplate);
  console.log(`Documentation created at: ${docsPath}`);
  
  // Add to component-data.json
  const dataPath = path.join(rootDir, 'docs', 'component-data.json');
  let components = [];
  
  if (fs.existsSync(dataPath)) {
    const data = fs.readFileSync(dataPath, 'utf8');
    components = JSON.parse(data);
  }
  
  const newComponent = {
    id: componentName,
    title: title,
    category: category,
    type: courseId ? 'course-specific' : 'shared',
    description: description,
    url: `/blackboard-content-hub/${directory}/${componentName}.html`,
    documentationUrl: `/blackboard-content-hub/examples/${componentName}.html`,
    tags: tags
  };
  
  if (courseId) {
    newComponent.courseId = courseId;
  }
  
  components.push(newComponent);
  
  fs.writeFileSync(dataPath, JSON.stringify(components, null, 2));
  console.log(`Component added to component-data.json`);
  
  console.log(`\nComponent URL will be: https://yourusername.github.io/blackboard-content-hub/${directory}/${componentName}.html`);
  
  rl.close();
}