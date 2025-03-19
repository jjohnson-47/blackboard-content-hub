---
layout: page
title: Component Organization
permalink: /developer-guide/component-organization/
---

# Component Organization System

The Blackboard Content Hub uses an enhanced component organization system to manage, categorize, and version interactive educational components. This guide explains how the system works and how to use it effectively.

## Component Data Structure

Components in the Blackboard Content Hub follow a standardized data structure that includes:

- **Basic Information**: ID, title, description, type, category
- **Versioning**: Version number, release date, version history
- **Educational Context**: Learning objectives, educational levels, subject areas
- **Accessibility**: WCAG compliance level, accessibility features
- **Browser Support**: Minimum supported browser versions
- **Dependencies**: Other components this component depends on
- **Authors**: Component creators and contributors

The full component schema is defined in `docs/component-schema.json`.

## Component Types

Components are categorized into three types:

1. **Development Components**: Components in the development phase, not yet ready for production use
2. **Shared Components**: Production-ready components that can be used across multiple courses
3. **Course-Specific Components**: Components designed for specific courses

## Component Lifecycle

Components typically follow this lifecycle:

1. **Creation**: Components are created in the development environment
2. **Testing**: Components are tested and refined
3. **Promotion**: Components are promoted to production (shared or course-specific)
4. **Versioning**: Components are updated with new versions as needed

## Component Manager

The Component Manager is a command-line tool that helps manage components throughout their lifecycle. It provides the following commands:

### Creating Components

```bash
node tools/component-manager.js create
```

This command walks you through creating a new component with all necessary metadata. You'll be prompted for:

- Component type (shared, course-specific, development)
- Basic information (ID, title, description, etc.)
- Educational context
- Accessibility information
- Browser support
- Author information

### Updating Components

```bash
node tools/component-manager.js update component-id
```

This command allows you to update an existing component's metadata.

### Versioning Components

```bash
node tools/component-manager.js version component-id
```

This command creates a new version of an existing component. You'll be prompted for:

- New version number
- Changes in this version

### Promoting Components

```bash
node tools/component-manager.js promote component-id
```

This command promotes a development component to production (shared or course-specific).

### Listing Components

```bash
node tools/component-manager.js list [filter]
```

This command lists all components, optionally filtered by type or category.

### Viewing Component Information

```bash
node tools/component-manager.js info component-id
```

This command displays detailed information about a specific component.

### Validating Components

```bash
node tools/component-manager.js validate component-id
```

This command validates a component against the component schema.

## Component Browser

The Component Browser provides a web interface for browsing, filtering, and interacting with components. It offers:

- Advanced filtering by type, category, tags, and more
- Sorting by title, release date, or version
- Grid and list views
- Component previews
- Embed code generation
- Version history viewing

The enhanced Component Browser is available at [/component-browser/enhanced](/blackboard-content-hub/component-browser/enhanced/).

## Best Practices

### Naming Conventions

- **Component IDs**: Use lowercase letters, numbers, and hyphens (e.g., `binary-search-visualization`)
- **Component Titles**: Use title case (e.g., "Binary Search Visualization")
- **Categories**: Use lowercase (e.g., "visualization", "simulation")

### Versioning

Use semantic versioning (MAJOR.MINOR.PATCH):

- **MAJOR**: Incompatible API changes
- **MINOR**: Backwards-compatible functionality additions
- **PATCH**: Backwards-compatible bug fixes

### Documentation

- Always include comprehensive documentation with your components
- Document learning objectives, educational applications, and accessibility features
- Provide usage examples and embedding instructions

### Accessibility

- Aim for WCAG AA compliance at minimum
- Document accessibility features and limitations
- Test with screen readers and keyboard navigation

## Component Organization Structure

The file system organization follows this structure:

```
blackboard-content-hub/
├── dev/
│   └── components/        # Development components
├── shared/
│   └── components/        # Shared components
├── courses/
│   ├── math-a251/         # Course-specific components
│   ├── math-a252/
│   └── ...
└── docs/
    ├── component-data.json    # Component metadata
    ├── component-schema.json  # Component schema
    ├── examples/              # Documentation for shared components
    ├── courses/               # Documentation for course-specific components
    └── development-environment/components/  # Documentation for development components
```

## Migrating Existing Components

To migrate an existing component to the new system:

1. Use the Component Manager to create a new component with the same ID
2. Copy the HTML, CSS, and JavaScript from the existing component
3. Add appropriate metadata (version, educational context, etc.)
4. Update the documentation to follow the new format

## Troubleshooting

### Component Not Found

If a component is not found, check:

- The component ID is correct
- The component exists in the expected location
- The component is included in `component-data.json`

### Validation Errors

If a component fails validation, check:

- All required fields are present
- Field values match the expected types and formats
- Version numbers follow semantic versioning

### Promotion Failures

If component promotion fails, check:

- The component exists in the development environment
- The destination directory exists and is writable
- For course-specific components, the course ID is valid