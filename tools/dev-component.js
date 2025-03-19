#!/usr/bin/env node

/**
 * Development Component Tool
 * 
 * This script helps create and manage development components
 * for testing before moving them to production.
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

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
function copyTemplate(componentPath, componentName) {
  // Read template
  fs.readFile(templatePath, 'utf8', (err, data) => {
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
    fs.writeFile(componentPath, content, (err) => {
      if (err) {
        console.error('Error creating component:', err);
        rl.close();
        return;
      }

      console.log(`Component created: ${componentPath}`);
      console.log(`\nPreview URL: http://localhost:8080/dev/components/${componentName}`);
      console.log(`Preview UI: http://localhost:8080/dev/preview/`);
      rl.close();
    });
  });
}

// List all development components
function listComponents() {
  fs.readdir(devComponentsDir, (err, files) => {
    if (err) {
      console.error('Error reading components directory:', err);
      rl.close();
      return;
    }

    console.log('\nDevelopment Components:');
    console.log('======================');
    
    const htmlFiles = files.filter(file => file.endsWith('.html'));
    
    if (htmlFiles.length === 0) {
      console.log('No development components found');
    } else {
      htmlFiles.forEach(file => {
        console.log(`- ${file}`);
      });
    }
    
    console.log(`\nTotal: ${htmlFiles.length} component(s)`);
    console.log(`\nPreview UI: http://localhost:8080/dev/preview/`);
    rl.close();
  });
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

    // Launch the component creation tool with the appropriate arguments
    console.log(`\nLaunching component creation tool to promote ${componentName}...`);
    console.log('Please follow the prompts to complete the promotion process.');
    console.log('The development component will be used as a starting point.');
    
    // In a real implementation, this would:
    // 1. Read the development component
    // 2. Launch the component creation tool
    // 3. Use the development component as a starting point
    // 4. Optionally delete the development component after promotion
    
    console.log('\nNOTE: In this implementation, you need to manually copy the content');
    console.log('from the development component to the new production component.');
    
    // Execute the component creation tool
    const { execSync } = require('child_process');
    try {
      execSync(`node ${path.join(rootDir, 'tools', 'create-component.js')}`, { 
        stdio: 'inherit' 
      });
      rl.close();
    } catch (error) {
      console.error('Error launching component creation tool:', error);
      rl.close();
    }
  });
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