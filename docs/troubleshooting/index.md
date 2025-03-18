---
layout: page
title: Troubleshooting
permalink: /troubleshooting/
---

# Troubleshooting Guide

This guide addresses common issues you might encounter when creating, deploying, or embedding components from the Blackboard Content Hub.

## Table of Contents

1. [Component Display Issues](#component-display-issues)
2. [Embedding Problems](#embedding-problems)
3. [Cross-Origin Errors](#cross-origin-errors)
4. [Responsive Design Issues](#responsive-design-issues)
5. [Development Environment Problems](#development-environment-problems)
6. [Deployment Issues](#deployment-issues)
7. [Blackboard Integration Issues](#blackboard-integration-issues)

## Component Display Issues {#component-display-issues}

### Component Not Loading

**Symptoms:**
- Blank iframe
- Loading spinner that never completes
- Error message in iframe

**Possible Causes and Solutions:**

1. **Path Issues**
   - **Problem:** Incorrect URL path to the component
   - **Solution:** Verify the component URL in the iframe src attribute. Make sure it points to the correct location.
   - **Example:** 
     ```html
     <!-- Incorrect -->
     <iframe src="/components/visualization.html"></iframe>
     
     <!-- Correct -->
     <iframe src="/blackboard-content-hub/shared/components/visualization.html"></iframe>
     ```

2. **Missing Files**
   - **Problem:** Referenced CSS, JavaScript, or assets are missing
   - **Solution:** Check browser console for 404 errors and ensure all referenced files exist
   - **Verification:** Open the component URL directly in a browser to see if it loads properly

3. **JavaScript Errors**
   - **Problem:** JavaScript errors preventing component initialization
   - **Solution:** Check browser console for errors and fix the JavaScript code
   - **Common Issues:**
     - Missing libraries
     - Syntax errors
     - Undefined variables
     - Timing issues (trying to access DOM elements before they're loaded)

### Styling Issues

**Symptoms:**
- Component appears unstyled
- Layout is broken
- Elements overlap or display incorrectly

**Possible Causes and Solutions:**

1. **CSS Path Issues**
   - **Problem:** Incorrect paths to CSS files
   - **Solution:** Verify all CSS file paths are correct relative to the component location
   - **Example:**
     ```html
     <!-- Incorrect -->
     <link rel="stylesheet" href="styles/main.css">
     
     <!-- Correct -->
     <link rel="stylesheet" href="/blackboard-content-hub/shared/styles/main.css">
     ```

2. **CSS Conflicts**
   - **Problem:** Styles from the parent page affecting the iframe content
   - **Solution:** Use more specific selectors or reset styles at the component level
   - **Example:**
     ```css
     /* Reset styles at the component level */
     .component-container * {
       box-sizing: border-box;
       margin: 0;
       padding: 0;
       font-family: Arial, sans-serif;
     }
     ```

3. **Responsive Design Issues**
   - **Problem:** Component not adapting to iframe dimensions
   - **Solution:** Use responsive design techniques (see [Responsive Design Issues](#responsive-design-issues))

## Embedding Problems {#embedding-problems}

### Iframe Not Displaying in Blackboard

**Symptoms:**
- Empty space where the iframe should be
- Error message instead of iframe
- Iframe HTML code showing as text

**Possible Causes and Solutions:**

1. **HTML Editor Stripping Iframe**
   - **Problem:** Blackboard's HTML editor removing iframe tags
   - **Solution:** Use the HTML editor button in Blackboard to enter HTML mode before pasting the iframe code
   - **Alternative:** Some Blackboard versions have a specific "Embed Content" option that should be used instead

2. **Content Security Policy (CSP)**
   - **Problem:** Blackboard's CSP blocking the iframe
   - **Solution:** Ensure your GitHub Pages domain is allowed in Blackboard's CSP
   - **Workaround:** If you have admin access, add your GitHub Pages domain to the allowed frame-src directives

3. **HTTPS Required**
   - **Problem:** Trying to embed HTTP content in an HTTPS page
   - **Solution:** Ensure your GitHub Pages site uses HTTPS (this is default for github.io domains)

### Iframe Size Issues

**Symptoms:**
- Iframe too small to display content properly
- Scrollbars appearing unnecessarily
- Content cut off

**Possible Causes and Solutions:**

1. **Fixed Dimensions Too Small**
   - **Problem:** Iframe height or width set too small
   - **Solution:** Increase the iframe dimensions or use percentage-based sizing
   - **Example:**
     ```html
     <!-- Better sizing -->
     <iframe src="..." width="100%" height="500" frameborder="0"></iframe>
     ```

2. **Responsive Container Needed**
   - **Problem:** Iframe not adapting to different screen sizes
   - **Solution:** Use a responsive container technique
   - **Example:**
     ```html
     <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%;">
       <iframe 
         style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" 
         src="..." 
         frameborder="0">
       </iframe>
     </div>
     ```

3. **Content Requires Specific Height**
   - **Problem:** Content height varies based on content or interactions
   - **Solution:** Implement iframe resizing using postMessage communication
   - **See:** [Cross-Origin Communication](#cross-origin-communication) section for implementation details

## Cross-Origin Errors {#cross-origin-errors}

### Security Errors in Console

**Symptoms:**
- Console errors mentioning "cross-origin" or "CORS"
- Component features not working
- Unable to access iframe content from parent page or vice versa

**Possible Causes and Solutions:**

1. **Direct DOM Access Attempts**
   - **Problem:** Trying to directly access iframe DOM from parent page or vice versa
   - **Solution:** Use postMessage for communication between iframe and parent
   - **Example:**
     ```javascript
     // In parent page
     const iframe = document.getElementById('component-iframe');
     iframe.contentWindow.postMessage({
       type: 'command',
       action: 'getData'
     }, 'https://yourusername.github.io');
     
     // In iframe
     window.addEventListener('message', function(event) {
       // Verify origin for security
       if (event.origin !== 'https://blackboard.youruniversity.edu') return;
       
       // Process message
       if (event.data.type === 'command' && event.data.action === 'getData') {
         // Send response back to parent
         window.parent.postMessage({
           type: 'response',
           data: { result: 'success', value: 42 }
         }, event.origin);
       }
     });
     ```

2. **Loading Resources from Different Origins**
   - **Problem:** Component trying to load resources from origins without CORS headers
   - **Solution:** Host resources on the same origin or use sources that provide proper CORS headers
   - **Alternative:** Use proxy services for APIs that don't support CORS

3. **Iframe Sandbox Restrictions**
   - **Problem:** Iframe sandbox attribute restricting necessary features
   - **Solution:** Adjust sandbox attributes to allow required functionality
   - **Example:**
     ```html
     <iframe 
       src="..." 
       sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
       frameborder="0">
     </iframe>
     ```

## Responsive Design Issues {#responsive-design-issues}

### Component Not Adapting to Container Size

**Symptoms:**
- Content overflows iframe
- Layout breaks at certain sizes
- Horizontal scrollbars appear

**Possible Causes and Solutions:**

1. **Fixed Width Elements**
   - **Problem:** Elements with fixed pixel widths
   - **Solution:** Use percentage-based widths or max-width
   - **Example:**
     ```css
     /* Avoid */
     .chart-container {
       width: 800px;
     }
     
     /* Better */
     .chart-container {
       width: 100%;
       max-width: 800px;
       margin: 0 auto;
     }
     ```

2. **No Viewport Meta Tag**
   - **Problem:** Missing or incorrect viewport meta tag
   - **Solution:** Add proper viewport meta tag
   - **Example:**
     ```html
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     ```

3. **No Media Queries**
   - **Problem:** Layout not adapting to different screen sizes
   - **Solution:** Implement media queries for different breakpoints
   - **Example:**
     ```css
     @media (max-width: 768px) {
       .component-grid {
         grid-template-columns: 1fr;
       }
     }
     ```

### Mobile-Specific Issues

**Symptoms:**
- Touch interactions not working properly
- Text too small to read on mobile
- Buttons too small to tap accurately

**Possible Causes and Solutions:**

1. **No Touch Event Handling**
   - **Problem:** Component only handles mouse events
   - **Solution:** Add touch event handling or use libraries that normalize events
   - **Example:**
     ```javascript
     element.addEventListener('touchstart', handleInteraction);
     element.addEventListener('mousedown', handleInteraction);
     ```

2. **Font Size Too Small**
   - **Problem:** Text difficult to read on small screens
   - **Solution:** Use relative font sizes and increase for mobile
   - **Example:**
     ```css
     body {
       font-size: 16px;
     }
     
     @media (max-width: 480px) {
       body {
         font-size: 18px;
       }
     }
     ```

3. **Interactive Elements Too Small**
   - **Problem:** Buttons and controls too small for touch
   - **Solution:** Ensure touch targets are at least 44×44px
   - **Example:**
     ```css
     .button {
       min-width: 44px;
       min-height: 44px;
       padding: 10px 15px;
     }
     ```

## Development Environment Problems {#development-environment-problems}

### Setup Issues

**Symptoms:**
- Error when running npm commands
- Development server won't start
- Build process fails

**Possible Causes and Solutions:**

1. **Node.js Version Mismatch**
   - **Problem:** Using incompatible Node.js version
   - **Solution:** Use Node.js v18 or higher as specified in package.json
   - **Verification:** Check your Node.js version with `node -v`

2. **Missing Dependencies**
   - **Problem:** Dependencies not installed correctly
   - **Solution:** Run `npm ci` to do a clean install of dependencies
   - **Alternative:** Delete node_modules folder and package-lock.json, then run `npm install`

3. **Port Conflicts**
   - **Problem:** Another service using the same port
   - **Solution:** Change the port in the Vite configuration or stop the conflicting service
   - **Example:** Modify vite.config.js to use a different port
     ```javascript
     export default {
       server: {
         port: 3001
       }
     }
     ```

### Build Errors

**Symptoms:**
- Error messages during build process
- Missing files in dist directory
- Incorrect paths in built files

**Possible Causes and Solutions:**

1. **Syntax Errors**
   - **Problem:** JavaScript or CSS syntax errors
   - **Solution:** Check error messages for file and line numbers, then fix the syntax issues

2. **Path Resolution Issues**
   - **Problem:** Incorrect path resolution during build
   - **Solution:** Use absolute paths with the correct base URL
   - **Example:**
     ```javascript
     // In vite.config.js
     export default {
       base: '/blackboard-content-hub/'
     }
     ```

3. **Missing Files**
   - **Problem:** Referenced files not included in build
   - **Solution:** Ensure all required files are properly imported or included in the build configuration

## Deployment Issues {#deployment-issues}

### GitHub Pages Not Updating

**Symptoms:**
- Changes not appearing on the live site
- Old version still showing after deployment
- GitHub Actions workflow failing

**Possible Causes and Solutions:**

1. **Workflow Failures**
   - **Problem:** GitHub Actions workflow failing
   - **Solution:** Check the Actions tab in GitHub for error messages and fix the underlying issues

2. **Branch Issues**
   - **Problem:** Deploying to the wrong branch
   - **Solution:** Ensure the workflow is deploying to the gh-pages branch and GitHub Pages is configured to serve from that branch

3. **Caching Issues**
   - **Problem:** Browser caching old versions
   - **Solution:** Force refresh (Ctrl+F5 or Cmd+Shift+R) or clear browser cache
   - **Prevention:** Add cache control headers or version parameters to resources

### Path Issues in Production

**Symptoms:**
- Resources 404ing in production but working locally
- Links broken on the live site
- Images not loading

**Possible Causes and Solutions:**

1. **Absolute vs. Relative Paths**
   - **Problem:** Using relative paths that work locally but break in production
   - **Solution:** Use absolute paths with the repository name
   - **Example:**
     ```html
     <!-- Incorrect for GitHub Pages -->
     <img src="/images/logo.png">
     
     <!-- Correct for GitHub Pages -->
     <img src="/blackboard-content-hub/images/logo.png">
     ```

2. **Base URL Configuration**
   - **Problem:** Base URL not configured correctly for GitHub Pages
   - **Solution:** Set the correct base URL in build configuration
   - **Example:** In Jekyll's _config.yml:
     ```yaml
     baseurl: "/blackboard-content-hub"
     ```

3. **Case Sensitivity**
   - **Problem:** Incorrect case in file paths (GitHub Pages is case-sensitive)
   - **Solution:** Ensure all file paths use the correct case
   - **Example:** If the file is `Image.jpg`, referencing it as `image.jpg` will fail

## Blackboard Integration Issues {#blackboard-integration-issues}

### Content Not Appearing in Blackboard

**Symptoms:**
- Embedded iframe not showing in Blackboard
- Error messages in Blackboard
- Content blocked by Blackboard security

**Possible Causes and Solutions:**

1. **HTML Filtering**
   - **Problem:** Blackboard filtering out iframe HTML
   - **Solution:** Use the HTML editor mode in Blackboard when embedding iframes
   - **Alternative:** Use Blackboard's built-in "Embed Content" tool if available

2. **Missing Permissions**
   - **Problem:** Insufficient permissions to add embedded content
   - **Solution:** Contact your Blackboard administrator for appropriate permissions

3. **HTTPS Required**
   - **Problem:** Blackboard requires HTTPS content
   - **Solution:** Ensure your GitHub Pages site uses HTTPS (default for github.io domains)

### Iframe Resizing Issues in Blackboard

**Symptoms:**
- Iframe too small in Blackboard
- Scrollbars appearing unnecessarily
- Content cut off

**Possible Causes and Solutions:**

1. **Fixed Height Issues**
   - **Problem:** Content height changes but iframe height is fixed
   - **Solution:** Implement dynamic iframe resizing
   - **Example:** Use the iframe-resizer library
     ```html
     <!-- In Blackboard page -->
     <script src="https://cdn.jsdelivr.net/npm/iframe-resizer@4.3.2/js/iframeResizer.min.js"></script>
     <iframe id="myIframe" src="..." scrolling="no"></iframe>
     <script>
       iFrameResize({ log: false }, '#myIframe');
     </script>
     
     <!-- In your component -->
     <script src="https://cdn.jsdelivr.net/npm/iframe-resizer@4.3.2/js/iframeResizer.contentWindow.min.js"></script>
     ```

2. **Blackboard Theme Conflicts**
   - **Problem:** Blackboard theme affecting iframe content
   - **Solution:** Use a reset CSS in your component to neutralize external styles
   - **Example:**
     ```css
     /* At the top of your component CSS */
     .component-container {
       all: initial;
       font-family: Arial, sans-serif;
       color: #333;
       /* Add other base styles */
     }
     ```

3. **Mobile Responsiveness**
   - **Problem:** Blackboard mobile view breaking iframe layout
   - **Solution:** Test and optimize for Blackboard mobile view
   - **Technique:** Use the responsive container approach mentioned earlier

## Still Need Help?

If you're still experiencing issues after trying these solutions:

1. Check the [GitHub repository issues](https://github.com/yourusername/blackboard-content-hub/issues) to see if others have reported the same problem
2. Search the [developer guide](/blackboard-content-hub/developer-guide/) for more detailed information
3. Create a new issue on GitHub with:
   - Detailed description of the problem
   - Steps to reproduce
   - Expected vs. actual behavior
   - Screenshots if applicable
   - Browser and OS information