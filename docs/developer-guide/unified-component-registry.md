---
layout: page
title: Unified Component Registry
permalink: /developer-guide/unified-component-registry/
---

# Unified Component Registry

The Unified Component Registry is a system that integrates the CLI/editor and browser-based component creation workflows, ensuring components created in one environment are accessible in the other.

## Overview

The Blackboard Content Hub includes two primary workflows for creating and managing components:

1. **CLI/Editor Workflow**: Using command-line tools to create components directly in production directories
2. **Browser Preview Workflow**: Using the browser-based Development Studio to create and edit components

Previously, these workflows operated independently, with components created in one not automatically visible in the other. The Unified Component Registry solves this problem by providing a central registry that indexes components from all locations.

## Key Features

- **Cross-Workflow Visibility**: Components created in any workflow are visible and accessible in all workflows
- **Location-Based Organization**: Components are organized by location type (local, development, shared, course-specific)
- **Filtering and Search**: Easily find components by location type or search terms
- **Visual Indicators**: Clear visual cues show where each component is stored
- **Seamless Promotion**: Promote components from development to production with metadata preservation

## Component Locations

The registry tracks components in four primary locations:

| Location Type | Description | Directory |
|---------------|-------------|-----------|
| `local` | Components stored in browser localStorage | N/A (browser storage) |
| `development` | Development components for testing | `dev/components/` |
| `shared` | Shared production components | `shared/components/` |
| `course` | Course-specific production components | `courses/{courseId}/` |

## Using the Registry

### In the Browser Preview

The Development Studio now includes enhanced features for working with components from all locations:

1. **Location Filter**: Use the dropdown at the top of the component list to filter by location type
2. **Search Box**: Search for components by name, title, description, or tags
3. **Location Badges**: Each component displays a badge indicating its location type
4. **Component Actions**:
   - Edit any component regardless of its location
   - Save changes to the appropriate location
   - Promote development components to production

### In the CLI

The CLI tools have been updated to work with the registry:

1. **Component Creation**: `tools/create-component.js` registers new components with the registry
2. **Development Components**: `tools/dev-component.js` manages development components
3. **Component Listing**: Use `tools/dev-component.js list` to see components from all locations
4. **Component Promotion**: Use `tools/dev-component.js promote` to promote components to production

## Technical Implementation

The registry is implemented as a Node.js module with a browser-compatible client:

### Server-Side Registry

The `shared/scripts/component-registry.js` module provides:

- Component indexing across all locations
- Registry initialization and scanning
- Component registration and metadata management
- Integration with `component-data.json`

### Browser-Side Client

The `dev/preview/js/component-registry-client.js` provides:

- API for accessing the registry from the browser
- Fallback to localStorage when the server is unavailable
- Component filtering and search functionality
- Integration with the Development Studio UI

## Development Server

The `tools/dev-server.js` script provides:

- Live server for development
- API endpoints for the component registry
- Component creation and promotion endpoints
- Integration between the CLI and browser workflows

## Workflow Examples

### Creating a Component in the CLI and Editing in the Browser

1. Create a component using the CLI tool:
   ```bash
   node tools/create-component.js
   ```

2. Open the Development Studio at http://localhost:8080/dev/preview/

3. Find your component in the list (it will have a "shared" or "course" badge)

4. Click on the component to load it in the editor

5. Make changes and save

### Creating a Component in the Browser and Using in Production

1. Open the Development Studio at http://localhost:8080/dev/preview/

2. Click the "+" button to create a new component

3. Fill in the details and click "Create"

4. Edit the component in the browser

5. Click "Promote to Production" to move it to a production directory

6. The component is now available in both workflows

## Best Practices

1. **Use the Right Workflow for the Task**:
   - Browser Preview for visual design and quick iterations
   - CLI/Editor for complex components or when working with version control

2. **Component Organization**:
   - Use development components for testing and experimentation
   - Use shared components for reusable, general-purpose content
   - Use course-specific components for content tied to a particular course

3. **Promotion Process**:
   - Test components thoroughly in development before promotion
   - Provide detailed descriptions and relevant tags
   - Choose the appropriate location type (shared vs. course-specific)

4. **Collaborative Development**:
   - Use version control for production components
   - Use the development environment for work-in-progress components
   - Document component purpose and usage

## Troubleshooting

### Component Not Appearing in Registry

If a component doesn't appear in the registry:

1. Click the "Refresh" button in the Development Studio
2. Check that the component file exists in the expected location
3. Verify that the component has the correct file extension (.html)
4. Restart the development server

### Changes Not Saving

If changes to a component aren't being saved:

1. Check the browser console for errors
2. Verify that you have write permissions to the component location
3. For production components, ensure the server has appropriate permissions
4. Try saving to localStorage as a fallback

### Registry Synchronization Issues

If the registry seems out of sync:

1. Restart the development server
2. Clear browser localStorage if working with local components
3. Manually refresh the component list
4. Check for file system errors in the server logs