# Issue: Cross-Origin Communication Failures

## Description
Iframe content from different origins cannot directly communicate with the parent page due to browser security restrictions.

## Context
- **Date Encountered**: 2025-03-17
- **Component/Area**: Cross-domain iframe communication
- **Severity**: High

## Symptoms
- JavaScript errors in console: "Blocked a frame from accessing a cross-origin frame"
- Unable to access iframe content from parent page or vice versa
- Functions like `iframe.contentWindow.someFunction()` fail

## Root Cause
Same-origin policy security restrictions in browsers prevent direct script access between different origins (domain, protocol, or port).

## Solution
Implement secure cross-origin communication using the postMessage API:

1. In the parent page:
```javascript
// Send message to iframe
const iframe = document.getElementById('myIframe');
iframe.contentWindow.postMessage({
  type: 'command',
  action: 'getData',
  params: { id: 123 }
}, 'https://iframe-origin.com'); // Target origin for security

// Listen for responses
window.addEventListener('message', function(event) {
  // Always verify origin
  if (event.origin !== 'https://iframe-origin.com') return;
  
  console.log('Received data:', event.data);
}, false);
```

2. In the iframe content:
```javascript
// Listen for messages from parent
window.addEventListener('message', function(event) {
  // Always verify origin
  if (event.origin !== 'https://parent-origin.com') return;
  
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

## Prevention
- Always design iframe communication using postMessage from the start
- Document expected message formats for consistency
- Always validate message origins for security
- Use structured message formats with type/action fields

## Related Issues
- .agent/issues/iframe-resize-communication.md
- .agent/knowledge-base/iframe-best-practices.md

## References
- [MDN: Window.postMessage()](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage)
- [HTML Living Standard: Cross-document messaging](https://html.spec.whatwg.org/multipage/web-messaging.html#web-messaging)