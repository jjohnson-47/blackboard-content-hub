#!/usr/bin/env node

/**
 * Development Server
 * 
 * This script starts a development server with API endpoints
 * for the component registry.
 */

const express = require('express');
const path = require('path');
const liveServer = require('live-server');
const componentRegistry = require('../shared/scripts/component-registry');

// Initialize component registry
componentRegistry.initialize().catch(console.error);

// Create Express app for API endpoints
const app = express();
const PORT = 3000;

// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

// Parse JSON request body
app.use(express.json());

// API endpoint to get all components
app.get('/api/components', async (req, res) => {
  try {
    // Ensure registry is initialized
    if (!componentRegistry.initialized) {
      await componentRegistry.initialize();
    }
    
    // Get all components
    const components = componentRegistry.getAllComponents();
    
    // Return components as JSON
    res.json(components);
  } catch (error) {
    console.error('Error getting components:', error);
    res.status(500).json({ error: 'Failed to get components' });
  }
});

// API endpoint to get component by ID
app.get('/api/components/:id', async (req, res) => {
  try {
    // Ensure registry is initialized
    if (!componentRegistry.initialized) {
      await componentRegistry.initialize();
    }
    
    // Get component by ID
    const component = componentRegistry.getComponentById(req.params.id);
    
    if (component) {
      res.json(component);
    } else {
      res.status(404).json({ error: 'Component not found' });
    }
  } catch (error) {
    console.error('Error getting component:', error);
    res.status(500).json({ error: 'Failed to get component' });
  }
});

// API endpoint to update component
app.put('/api/components/:id', async (req, res) => {
  try {
    // Ensure registry is initialized
    if (!componentRegistry.initialized) {
      await componentRegistry.initialize();
    }
    
    // Update component
    const component = req.body;
    
    if (component.id !== req.params.id) {
      return res.status(400).json({ error: 'Component ID mismatch' });
    }
    
    const updatedComponent = componentRegistry.registerComponent(component);
    res.json(updatedComponent);
  } catch (error) {
    console.error('Error updating component:', error);
    res.status(500).json({ error: 'Failed to update component' });
  }
});

// API endpoint to delete component
app.delete('/api/components/:id', async (req, res) => {
  try {
    // Ensure registry is initialized
    if (!componentRegistry.initialized) {
      await componentRegistry.initialize();
    }
    
    // Delete component
    const success = await componentRegistry.deleteComponent(req.params.id);
    
    if (success) {
      res.json({ success: true, message: `Component ${req.params.id} deleted successfully` });
    } else {
      res.status(404).json({ error: 'Component not found or could not be deleted' });
    }
  } catch (error) {
    console.error('Error deleting component:', error);
    res.status(500).json({ error: 'Failed to delete component' });
  }
});

// Start API server
app.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`);
});

// Configure live-server
const params = {
  port: 8080,
  host: '0.0.0.0',
  root: path.join(__dirname, '..'),
  open: false,
  file: 'index.html',
  wait: 1000,
  logLevel: 2,
  middleware: [
    // Redirect root to dev/preview
    (req, res, next) => {
      // Check if request is for the root path
      if (req.url === '/' || req.url === '/index.html') {
        // Redirect to dev/preview
        res.writeHead(302, {
          'Location': '/dev/preview/'
        });
        res.end();
        return;
      }
      next();
    },
    // Proxy API requests to Express server
    (req, res, next) => {
      if (req.url.startsWith('/api/')) {
        // Rewrite URL to proxy to Express server
        req.url = req.url.replace('/api', '');
        
        // Proxy request to Express server
        const proxyReq = require('http').request({
          hostname: 'localhost',
          port: PORT,
          path: `/api${req.url}`,
          method: req.method,
          headers: req.headers
        }, (proxyRes) => {
          // Copy status code
          res.statusCode = proxyRes.statusCode;
          
          // Copy headers
          Object.keys(proxyRes.headers).forEach(key => {
            res.setHeader(key, proxyRes.headers[key]);
          });
          
          // Pipe response
          proxyRes.pipe(res);
        });
        
        // Handle errors
        proxyReq.on('error', (error) => {
          console.error('Proxy error:', error);
          res.statusCode = 500;
          res.end('Proxy error');
        });
        
        // Pipe request
        req.pipe(proxyReq);
      } else {
        next();
      }
    }
  ]
};

// Start live-server
liveServer.start(params);
console.log(`Live server running at http://localhost:8080`);
console.log(`Development Studio available at http://localhost:8080/dev/preview/`);