#!/usr/bin/env node

/**
 * Development Server
 * 
 * This script provides a robust development server for the Blackboard Content Hub,
 * specifically designed to serve the development preview environment with live reloading.
 */

const express = require('express');
const path = require('path');
const livereload = require('livereload');
const connectLivereload = require('connect-livereload');
const fs = require('fs');

// Configuration
const PORT = process.env.PORT || 3000;
const ROOT_DIR = path.join(__dirname, '..');
const DEV_PREVIEW_DIR = path.join(ROOT_DIR, 'dev', 'preview');

// Create Express app
const app = express();

// Set up livereload server
const liveReloadServer = livereload.createServer({
  exts: ['html', 'css', 'js', 'png', 'jpg', 'gif', 'svg'],
  debug: false
});

// Watch directories for changes
liveReloadServer.watch([
  path.join(ROOT_DIR, 'dev'),
  path.join(ROOT_DIR, 'shared')
]);

// Inject livereload script
app.use(connectLivereload());

// Serve static files from the root directory
app.use(express.static(ROOT_DIR));

// Redirect root to the development preview
app.get('/', (req, res) => {
  res.redirect('/dev/preview/');
});

// Special handling for the development preview
app.get('/dev/preview/', (req, res) => {
  res.sendFile(path.join(DEV_PREVIEW_DIR, 'index.html'));
});

// API routes for component management
app.get('/api/components', (req, res) => {
  // List components in dev/components directory
  const componentsDir = path.join(ROOT_DIR, 'dev', 'components');
  
  try {
    const files = fs.readdirSync(componentsDir)
      .filter(file => file.endsWith('.html'))
      .map(file => {
        const id = file.replace('.html', '');
        return {
          id,
          name: file,
          title: id.charAt(0).toUpperCase() + id.slice(1).replace(/-/g, ' '),
          url: `/dev/components/${file}`
        };
      });
    
    res.json(files);
  } catch (error) {
    console.error('Error reading components directory:', error);
    res.status(500).json({ error: 'Failed to read components' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════════════╗
║                                                                ║
║   Blackboard Content Hub - Development Server                  ║
║                                                                ║
║   Development Preview: http://localhost:${PORT}/dev/preview/       ║
║   Components Directory: http://localhost:${PORT}/dev/components/   ║
║   Shared Resources: http://localhost:${PORT}/shared/              ║
║                                                                ║
║   Press Ctrl+C to stop the server                              ║
║                                                                ║
╚════════════════════════════════════════════════════════════════╝
  `);
});

// Handle server shutdown
process.on('SIGINT', () => {
  console.log('\nShutting down development server...');
  process.exit(0);
});