---
layout: page
title: Development Environment
permalink: /development-environment/
---

# Development Environment

This section provides information about the local development environment for creating and testing iframe components before deploying them to production.

## Overview

The Blackboard Content Hub includes a dedicated development environment that allows you to:

1. Create and test components in a sandbox environment
2. Preview components in real-time with live reloading
3. Test components at different screen sizes
4. Easily promote development components to production

## Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm (v8 or higher)
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/jjohnson-47/blackboard-content-hub.git
   cd blackboard-content-hub
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

This will start a live-server instance on port 8080. The server will automatically reload when you make changes to your files.

### Accessing the Development Environment

- **Development Studio**: [http://localhost:8080/dev/preview/](http://localhost:8080/dev/preview/)
- **Individual Components**: [http://localhost:8080/dev/components/your-component.html](http://localhost:8080/dev/components/your-component.html)

## Development Studio Features

The Development Studio is a professional interface for creating and editing iframe components. It provides a split-screen view with code editor on the left and live preview on the right.

![Development Studio]({{ site.baseurl }}/assets/images/dev-studio.png)

### Key Features

- **Clean, Minimal Interface**: Focused on the iframe code editing experience
- **Split-Screen View**: Editor on the left, live preview on the right
- **Syntax Highlighting**: For HTML, CSS, and JavaScript
- **Device Testing**: Preview components at different screen sizes
- **Version History**: Track changes and revert to previous versions
- **Dark Mode Support**: For comfortable long working sessions

## Detailed Documentation

For detailed information about the development workflow, including component creation, testing, and promotion to production, please refer to the [Development Workflow Guide]({{ site.baseurl }}/developer-guide/development-workflow/).

## Related Resources

- [Iframe Hosting Guide]({{ site.baseurl }}/iframe-hosting/)
- [Component Documentation]({{ site.baseurl }}/component-documentation/)
- [Iframe Integration Guide]({{ site.baseurl }}/developer-guide/iframe-integration/)
- [Component Browser]({{ site.baseurl }}/component-browser/)