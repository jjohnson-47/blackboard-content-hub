#!/usr/bin/env node

/**
 * Script to update all instances of "jjohnson-47" to "jjohnson-47" in source files
 */

const fs = require('fs');
const path = require('path');

// Directories to exclude (generated files)
const excludeDirs = ['_site', 'dist', 'node_modules', '.jekyll-cache'];

// Function to recursively find files
function findFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    // Skip excluded directories
    if (stat.isDirectory()) {
      if (!excludeDirs.includes(file)) {
        findFiles(filePath, fileList);
      }
      return;
    }
    
    // Only process text files
    const ext = path.extname(file).toLowerCase();
    if (['.md', '.html', '.js', '.json', '.yml', '.css'].includes(ext)) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Function to update a file
function updateFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    
    // Replace all instances of jjohnson-47 with jjohnson-47
    content = content.replace(/jjohnson-47/g, 'jjohnson-47');
    
    // Only write if changes were made
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated: ${filePath}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`Error updating ${filePath}: ${error.message}`);
    return false;
  }
}

// Main function
function main() {
  console.log('Searching for files to update...');
  const files = findFiles('.');
  console.log(`Found ${files.length} files to check.`);
  
  let updatedCount = 0;
  
  files.forEach(file => {
    if (updateFile(file)) {
      updatedCount++;
    }
  });
  
  console.log(`\nUpdate complete. Updated ${updatedCount} files.`);
}

main();