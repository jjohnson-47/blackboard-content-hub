---
layout: page
title: Iframe Hosting
permalink: /iframe-hosting/
---

# Iframe Hosting on GitHub Pages

This section provides comprehensive information about hosting iframe components on GitHub Pages through the Blackboard Content Hub.

## Overview

The Blackboard Content Hub uses GitHub Pages to host interactive iframe components that can be embedded in Blackboard courses. This approach provides several benefits:

- **Version Control**: All components are version-controlled through Git
- **Automated Deployment**: Changes are automatically deployed through GitHub Actions
- **Free Hosting**: GitHub Pages provides free hosting for your components
- **HTTPS Support**: All components are served over HTTPS for security

## Quick Start

1. **Create your component** using the [Development Environment](/development-environment/)
2. **Promote it to production** when it's ready
3. **Embed it in Blackboard** using the iframe code provided in the [Component Browser](/component-browser/)

## Component Structure

Components in the Blackboard Content Hub follow a standardized directory structure:

```
blackboard-content-hub/
├── shared/
│   └── components/
│       ├── component-name-1.html
│       ├── component-name-2.html
│       └── ...
└── courses/
    ├── course-id-1/
    │   ├── component-name-1.html
    │   ├── component-name-2.html
    │   └── ...
    ├── course-id-2/
    │   └── ...
    └── ...
```

### Shared Components

Shared components are stored in the `shared/components/` directory and can be used across multiple courses. These components are typically general-purpose tools or visualizations that are not specific to any particular course.

[View Shared Components]({{ site.baseurl }}/component-browser/?type=shared)

### Course-Specific Components

Course-specific components are stored in the `courses/[course-id]/` directories and are tailored to specific courses. These components often contain course-specific content or are designed for particular learning objectives within a course.

[View Course-Specific Components]({{ site.baseurl }}/component-browser/?type=course-specific)

## Detailed Documentation

For detailed information about iframe integration, including security considerations, performance optimization, accessibility, cross-origin communication, and responsive design, please refer to the [Iframe Integration Guide]({{ site.baseurl }}/developer-guide/iframe-integration/).

## Related Resources

- [Component Documentation Guide]({{ site.baseurl }}/component-documentation/)
- [Development Environment]({{ site.baseurl }}/development-environment/)
- [Component Browser]({{ site.baseurl }}/component-browser/)