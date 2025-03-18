# Iframe Best Practices

## Security Considerations
- Always use HTTPS for iframe sources
- Set appropriate sandbox attributes
- Implement Content-Security-Policy headers
- Consider using allow/allowfullscreen attributes selectively

## Performance Optimization
- Lazy load iframes when possible
- Set proper width/height to avoid reflow
- Consider using srcdoc for small content
- Minimize iframe content size and dependencies

## Accessibility
- Ensure iframe content is accessible
- Provide alternative content when iframes cannot be displayed
- Use title attribute to describe iframe purpose
- Ensure keyboard navigation works within iframes

## Cross-Domain Communication
- Use postMessage for secure communication
- Validate message origin
- Structure message data consistently
- Handle errors gracefully

## Responsive Design
- Use relative units for dimensions (%, vh/vw)
- Consider aspect ratio preservation techniques
- Test on multiple devices and screen sizes
- Implement responsive strategies within iframe content