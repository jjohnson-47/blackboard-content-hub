---
layout: page
title: Development Workflow
permalink: /developer-guide/development-workflow/
---

# Development Workflow

This guide explains how to use the development environment to create and test iframe components before moving them to production.

## Overview

The Blackboard Content Hub includes a dedicated development environment that allows you to:

1. Create and test components in a sandbox environment
2. Preview components in real-time with live reloading
3. Test components at different screen sizes
4. Easily promote development components to production

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v8 or higher)

### Installation

If you haven't already installed the project dependencies, run:

```bash
npm install
```

This will install all required dependencies, including `live-server` for development.

## Development Environment

### Starting the Development Server

To start the development server, run:

```bash
npm run preview
```

This will start a development server on port 8080 with the following features:

- Live reloading when files change
- Component registry API for unified component access
- Browser-based Development Studio

### Accessing the Development Environment

- **Development Studio**: [http://localhost:8080/dev/preview/](http://localhost:8080/dev/preview/)
- **Individual Components**: [http://localhost:8080/dev/components/your-component.html](http://localhost:8080/dev/components/your-component.html)

## Component Creation Workflows

The Blackboard Content Hub supports two complementary workflows for creating and managing components:

### 1. Browser-Based Workflow

The Development Studio provides a professional interface for creating and editing iframe components directly in your browser:

- **Component List**: Browse components from all locations (development, shared, course-specific)
- **Create New Component**: Click the "+" button to create a new component
- **Real-Time Preview**: See changes as you type
- **Device Testing**: Test your component at different screen sizes

### 2. CLI/Editor Workflow

For developers who prefer working in their code editor and command line:

- **Create Components**: Use `node tools/create-component.js` to create new components
- **Develop Components**: Use `node tools/dev-component.js create` to create development components
- **List Components**: Use `node tools/dev-component.js list` to list all development components
- **Promote Components**: Use `node tools/dev-component.js promote` to promote to production

### Unified Component Registry

Both workflows are integrated through the Unified Component Registry, which ensures components created in one workflow are accessible in the other:

- Components created via CLI are visible in the browser Development Studio
- Components created in the browser can be edited in your preferred code editor
- All components are organized by location type (local, development, shared, course-specific)

For more details, see the [Unified Component Registry](unified-component-registry.html) documentation.

## Using the Development Studio

The Development Studio provides a professional interface for creating and editing iframe components. It includes:

### Component Management

- **Component List**: The sidebar shows all available components from all locations
- **Location Filter**: Filter components by location type (local, development, shared, course)
- **Search**: Search for components by name, title, or description
- **Create New Component**: Click the "+" button to create a new component
- **Refresh List**: Update the component list to see newly added components

### Code Editor

The editor supports HTML, CSS, and JavaScript editing with syntax highlighting and code formatting:

- **HTML Tab**: Edit the HTML structure of your component
- **CSS Tab**: Edit the component's styles
- **JavaScript Tab**: Edit the component's interactive behavior
- **Format Button**: Automatically format your code for readability

### Preview Panel

The preview panel shows a live rendering of your component:

- **Render Button**: Update the preview with your latest changes
- **Device Testing**: Test your component at different screen sizes (Desktop, Tablet, Mobile)
- **Open in New Window**: View your component in a separate browser window

### Component Actions

- **Save Button**: Save your changes to the component
- **Promote to Production**: Move a development component to production when it's ready

## Creating a New Component

### Using the Development Studio

1. Click the "+" button in the sidebar
2. Enter a component name (lowercase, hyphens for spaces)
3. Enter a display title for the component
4. Select a template (Default, Blank, GeoGebra, Chart)
5. Click "Create"

The new component will be created with a robust default structure that includes:

- Responsive layout with header and main content area
- Information panel with tabs
- Mobile-friendly design
- Common libraries (GeoGebra, MathJax, Chart.js)

### Using the CLI

1. Run the component creation tool:
   ```bash
   node tools/create-component.js
   ```

2. Follow the prompts to specify:
   - Component type (shared or course-specific)
   - Component name
   - Component title
   - Description
   - Tags

3. For development components, use:
   ```bash
   node tools/dev-component.js create
   ```

### Component Structure

Each component consists of three main parts:

1. **HTML**: The structure of your component
2. **CSS**: The styles for your component
3. **JavaScript**: The interactive behavior of your component

The Development Studio separates these parts for easier editing, but combines them when rendering the preview.

## Default Template

The default template provides a solid foundation for creating new components. It includes:

- Responsive layout that works on all devices
- Header with title and controls
- Main content area for interactive elements
- Information panel with tabs
- GeoGebra integration (optional)
- Chart.js integration (optional)
- MathJax for mathematical notation

You can customize this template to fit your specific needs or start from scratch with the blank template.

## Testing Components

### Device Testing

The Development Studio allows you to test your components at different screen sizes:

- **Desktop**: Full-width view
- **Tablet**: 768px width
- **Mobile**: 375px width

This helps ensure your components work well on all devices.

### Live Preview

The preview updates automatically when you click the "Render" button, showing you exactly how your component will look when embedded.

## Promoting Components to Production

When your component is ready for production:

1. Click the "Promote to Production" button
2. Select the component type (Shared or Course-Specific)
3. For Course-Specific components, select the course
4. For Shared components, select the category
5. Enter a description and tags
6. Click "Promote"

This will move your component to the appropriate production directory and add it to the component registry.

Alternatively, you can use the CLI:

```bash
node tools/dev-component.js promote your-component
```

## Best Practices

### Component Organization

- Keep HTML structure clean and semantic
- Use CSS for styling, not inline styles
- Separate logic in JavaScript for maintainability

### Performance

- Minimize external dependencies
- Optimize images and assets
- Use efficient JavaScript code

### Accessibility

- Include proper ARIA attributes
- Ensure keyboard navigation works
- Provide text alternatives for visual content

### Responsive Design

- Test on multiple device sizes
- Use relative units (%, em, rem) instead of fixed pixels
- Implement appropriate breakpoints for different screen sizes

## Troubleshooting

### Component Not Appearing in Preview

If your component doesn't appear in the preview:

1. Check for JavaScript errors in the browser console
2. Verify your HTML structure is valid
3. Try clicking the "Refresh" button

### Live Reload Not Working

If changes aren't automatically reflected:

1. Ensure the development server is running
2. Try manually refreshing the page
3. Check for file permission issues

### Component Not Appearing in Registry

If a component doesn't appear in the registry:

1. Click the "Refresh" button in the Development Studio
2. Check that the component file exists in the expected location
3. Restart the development server

## Next Steps

- [Unified Component Registry](unified-component-registry.html)
- [Iframe Integration Guide](iframe-integration.html)
- [Component Browser](../component-browser/)
- [GeoGebra API Integration](geogebra-api/integration-guide.html)