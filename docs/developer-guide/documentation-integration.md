---
layout: page
title: Documentation Integration
permalink: /developer-guide/documentation-integration/
---

# Documentation Integration

The Blackboard Content Hub features an integrated documentation system that automatically generates and maintains documentation for components. This guide explains how the documentation system works and how to use it effectively.

## Documentation Generation

When you create a component using the Component Manager, documentation is automatically generated based on the component's metadata. The generated documentation includes:

- Component title and description
- Live preview
- Embedding instructions
- Implementation details
- Educational applications
- Accessibility information
- Browser compatibility
- Version history

## Documentation Structure

Each component's documentation follows a consistent structure:

1. **Header**: Title, version, release date, and description
2. **Preview**: Live interactive preview of the component
3. **Features**: Key features of the component
4. **Usage**: Embedding instructions and recommended settings
5. **Implementation Details**: Technical details and parent-iframe communication
6. **Educational Applications**: Learning objectives, educational levels, and subject areas
7. **Accessibility**: Accessibility features and compliance level
8. **Browser Compatibility**: Supported browsers and versions
9. **Version History**: History of changes across versions

## Documentation Locations

Documentation is stored in different locations based on the component type:

- **Shared Components**: `/docs/examples/{component-id}.md`
- **Course-Specific Components**: `/docs/courses/{course-id}/{component-id}.md`
- **Development Components**: `/docs/development-environment/components/{component-id}.md`

## Customizing Documentation

While documentation is generated automatically, you can customize it to provide more detailed information:

1. Open the generated documentation file
2. Add or modify content as needed
3. Commit your changes

When updating a component's metadata using the Component Manager, the documentation will be updated to reflect the changes while preserving your customizations.

## Documentation Templates

The Component Manager uses templates to generate documentation. The default template includes placeholders for all required sections. You can customize these templates by modifying the `generateDocumentation` function in `tools/component-manager.js`.

## Linking Documentation

Documentation pages are automatically linked from:

- The Component Browser
- Course pages
- Related components

You can also manually link to documentation pages using the following format:

```markdown
[Component Name](/blackboard-content-hub/examples/component-id)
```

## Documentation Preview

You can preview documentation locally by running:

```bash
npm run dev
```

This starts a local Jekyll server that serves the documentation site at `http://localhost:4000/blackboard-content-hub/`.

## Documentation Search

The documentation site includes a search feature that allows users to search for components by:

- Title
- Description
- Tags
- Educational context
- Accessibility features

## Documentation Versioning

When you create a new version of a component, the documentation is automatically updated to include:

- The new version number
- The release date
- Changes in the new version

Previous versions remain in the version history section.

## Documentation Best Practices

### Writing Style

- Use clear, concise language
- Explain technical concepts in simple terms
- Use examples to illustrate usage
- Include screenshots or diagrams where helpful

### Structure

- Use headings to organize content
- Keep paragraphs short and focused
- Use lists for steps or features
- Include code examples with syntax highlighting

### Educational Context

- Clearly state learning objectives
- Explain how the component supports learning
- Suggest classroom activities or assignments
- Provide assessment ideas

### Accessibility

- Document keyboard shortcuts
- Explain screen reader support
- Note any accessibility limitations
- Provide alternative approaches for users with disabilities

## Automatic Documentation Updates

The documentation system automatically updates documentation when:

1. A component is created
2. A component's metadata is updated
3. A new version of a component is created
4. A component is promoted from development to production

## Documentation Integration with GitHub Pages

The documentation site is built and deployed to GitHub Pages automatically when changes are pushed to the main branch. The deployment process:

1. Builds the Jekyll site
2. Copies components to the appropriate locations
3. Deploys the site to the gh-pages branch

## Troubleshooting

### Missing Documentation

If documentation is missing for a component, check:

- The component exists in `component-data.json`
- The documentation file exists in the expected location
- The documentation file has the correct front matter

### Broken Links

If links in the documentation are broken, check:

- The target page exists
- The URL is correct
- The permalink in the front matter matches the expected URL

### Preview Issues

If the live preview in the documentation doesn't work, check:

- The component URL is correct
- The component is accessible
- The iframe has the correct permissions