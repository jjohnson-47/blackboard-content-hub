---
layout: page
title: Iframe Integration Guide
permalink: /developer-guide/iframe-integration/
---

# Iframe Integration Guide for Blackboard Content Hub

This guide provides best practices and implementation details for creating and integrating iframes in the Blackboard Content Hub.

## Overview

Iframes (inline frames) are HTML elements that allow you to embed one HTML document within another. In the Blackboard Content Hub, iframes are used to embed interactive educational components into Blackboard courses.

## Basic Implementation

### HTML Structure

A basic iframe implementation looks like this:

```html
<iframe 
  src="https://yourusername.github.io/blackboard-content-hub/shared/components/your-component.html" 
  width="100%" 
  height="500" 
  frameborder="0" 
  allowfullscreen>
</iframe>
```

### Key Attributes

- **src**: The URL of the component to embed
- **width**: The width of the iframe (use percentage for responsive design)
- **height**: The height of the iframe
- **frameborder**: Set to "0" to remove the border
- **allowfullscreen**: Allows the iframe to be displayed in fullscreen mode

## Security Considerations

### HTTPS

Always use HTTPS for iframe sources to ensure secure communication:

```html
<iframe src="https://yourusername.github.io/blackboard-content-hub/..."></iframe>
```

### Sandbox Attribute

Use the sandbox attribute to restrict iframe capabilities:

```html
<iframe 
  src="..." 
  sandbox="allow-scripts allow-same-origin allow-popups allow-forms">
</iframe>
```

Common sandbox values:
- **allow-scripts**: Allows JavaScript execution
- **allow-same-origin**: Allows the iframe to be treated as same-origin
- **allow-popups**: Allows popups
- **allow-forms**: Allows form submission

### Content Security Policy

Implement Content Security Policy (CSP) headers to restrict resource loading:

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' https://www.geogebra.org; style-src 'self' 'unsafe-inline';">
```

## Performance Optimization

### Lazy Loading

Use the loading attribute to lazy-load iframes:

```html
<iframe src="..." loading="lazy"></iframe>
```

### Proper Dimensions

Set proper width and height to avoid reflow:

```html
<iframe src="..." width="100%" height="500"></iframe>
```

### Minimize Dependencies

Minimize external dependencies to improve loading time:

1. Combine and minify CSS and JavaScript
2. Optimize images and other assets
3. Use shared resources when possible

## Accessibility

### Title Attribute

Use the title attribute to describe the iframe purpose:

```html
<iframe src="..." title="Interactive Calculus Derivative Explorer"></iframe>
```

### Alternative Content

Provide alternative content for when iframes cannot be displayed:

```html
<iframe src="...">
  <p>Your browser does not support iframes. Please visit <a href="...">this link</a> to view the content.</p>
</iframe>
```

### Keyboard Navigation

Ensure keyboard navigation works within iframes:

1. Use proper focus management
2. Implement keyboard shortcuts
3. Ensure all interactive elements are keyboard accessible

## Cross-Origin Communication

### Using postMessage

Use the postMessage API for secure communication between the iframe and the parent page:

**In the parent page:**
```javascript
// Send message to iframe
const iframe = document.getElementById('myIframe');
iframe.contentWindow.postMessage({
  type: 'command',
  action: 'getData',
  params: { id: 123 }
}, 'https://yourusername.github.io');

// Listen for responses
window.addEventListener('message', function(event) {
  // Always verify origin
  if (event.origin !== 'https://yourusername.github.io') return;
  
  console.log('Received data:', event.data);
}, false);
```

**In the iframe:**
```javascript
// Listen for messages from parent
window.addEventListener('message', function(event) {
  // Always verify origin
  if (event.origin !== 'https://parentorigin.com') return;
  
  // Process the message
  if (event.data.type === 'command' && event.data.action === 'getData') {
    // Send response back to parent
    window.parent.postMessage({
      type: 'response',
      data: { result: 'success', value: 42 }
    }, event.origin);
  }
}, false);
```

### Message Structure

Use a consistent message structure:

```javascript
{
  type: 'command' | 'response' | 'event',
  action: 'actionName',
  data: { ... },
  error: { ... } // Optional
}
```

## Responsive Design

### Relative Units

Use relative units for dimensions:

```html
<iframe src="..." width="100%" height="80vh"></iframe>
```

### Aspect Ratio Preservation

Use CSS to preserve aspect ratio:

```html
<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
  <iframe 
    src="..." 
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" 
    frameborder="0" 
    allowfullscreen>
  </iframe>
</div>
```

### Media Queries

Use media queries to adjust iframe behavior on different screen sizes:

```css
@media (max-width: 768px) {
  iframe {
    height: 300px;
  }
}
```

## Integration with Blackboard Content Hub

### Directory Structure

Place your component files in the appropriate directory:

- **Shared components**: `shared/components/your-component.html`
- **Course-specific components**: `courses/[course-id]/your-component.html`

### Component Registration

Add your component to the component registry in `docs/component-data.json`:

```json
{
  "id": "your-component-id",
  "title": "Your Component Title",
  "category": "general",
  "type": "shared",
  "description": "Description of your component",
  "url": "/blackboard-content-hub/shared/components/your-component.html",
  "documentationUrl": "/blackboard-content-hub/examples/your-component.html",
  "tags": ["relevant", "tags", "here"]
}
```

### Documentation

Create documentation for your component in `docs/examples/your-component.md` with:

1. Overview of the component
2. Usage instructions with iframe embedding code
3. Implementation details
4. Educational applications

### Embedding in Blackboard

To embed your component in Blackboard:

1. In Blackboard, navigate to the content area where you want to add the component
2. Click "Build Content" > "Item"
3. In the content editor, click the HTML button
4. Paste your iframe code
5. Click "Submit"

## Testing and Validation

### Cross-Browser Testing

Test your component in multiple browsers:

- Chrome
- Firefox
- Safari
- Edge

### Responsive Testing

Test your component on different devices and screen sizes:

- Desktop
- Tablet
- Mobile

### Accessibility Testing

Validate accessibility using tools like:

- WAVE (Web Accessibility Evaluation Tool)
- Axe
- Lighthouse

## Troubleshooting

### Common Issues

1. **X-Frame-Options**: If your component doesn't load, check if the server is sending X-Frame-Options headers that prevent embedding.

2. **Mixed Content**: Ensure all resources (scripts, styles, images) are loaded over HTTPS.

3. **Cross-Origin Issues**: Use CORS headers and postMessage for cross-origin communication.

4. **Responsive Issues**: Check that your component adapts properly to different screen sizes.

### Debugging Techniques

1. **Console Logging**: Use console.log to debug issues in the iframe.

2. **Network Monitoring**: Use browser developer tools to monitor network requests.

3. **postMessage Debugging**: Log all postMessage events to debug communication issues.

## Examples

### Basic Component

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Basic Component</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      margin: 0;
      padding: 20px;
    }
    
    .container {
      max-width: 800px;
      margin: 0 auto;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Basic Component</h1>
    <p>This is a basic component for the Blackboard Content Hub.</p>
    <button id="action-button">Click Me</button>
    <div id="result"></div>
  </div>
  
  <script>
    document.getElementById('action-button').addEventListener('click', function() {
      document.getElementById('result').textContent = 'Button clicked at ' + new Date().toLocaleTimeString();
      
      // Notify parent page
      if (window.parent !== window) {
        window.parent.postMessage({
          type: 'event',
          action: 'buttonClicked',
          data: { time: new Date().toISOString() }
        }, '*');
      }
    });
    
    // Listen for messages from parent
    window.addEventListener('message', function(event) {
      if (event.data.type === 'command' && event.data.action === 'reset') {
        document.getElementById('result').textContent = '';
      }
    });
  </script>
</body>
</html>
```

### Embedding Code

```html
<iframe 
  src="https://yourusername.github.io/blackboard-content-hub/shared/components/basic-component.html" 
  width="100%" 
  height="300" 
  frameborder="0" 
  allowfullscreen
  title="Basic Component">
</iframe>

<script>
  // Control the iframe
  document.getElementById('reset-button').addEventListener('click', function() {
    const iframe = document.querySelector('iframe');
    iframe.contentWindow.postMessage({
      type: 'command',
      action: 'reset'
    }, 'https://yourusername.github.io');
  });
  
  // Listen for events from the iframe
  window.addEventListener('message', function(event) {
    if (event.origin !== 'https://yourusername.github.io') return;
    
    if (event.data.type === 'event' && event.data.action === 'buttonClicked') {
      console.log('Button clicked in iframe at:', event.data.data.time);
    }
  });
</script>
```

## Resources

- [MDN Web Docs: iframe](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe)
- [MDN Web Docs: Window.postMessage()](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage)
- [Content Security Policy (CSP)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [Web Accessibility Initiative (WAI)](https://www.w3.org/WAI/)