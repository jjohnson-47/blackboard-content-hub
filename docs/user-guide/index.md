---
layout: page
title: User Guide
permalink: /user-guide/
---

# User Guide

This guide provides comprehensive instructions for creating, managing, and embedding interactive content components from the Blackboard Content Hub.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Creating Components](#creating-components)
3. [Embedding Components in Blackboard](#embedding-components)
4. [Managing Components](#managing-components)
5. [Best Practices](#best-practices)

## Getting Started {#getting-started}

The Blackboard Content Hub hosts interactive educational content as iframes that can be embedded in Blackboard courses. These components are organized into three main categories:

- **General**: Components for general educational purposes that can be used across disciplines
- **Research**: Components specifically designed for research activities and data analysis
- **Courses**: Components tailored for specific courses (e.g., math221, stat253)

Components can be either:
- **Shared**: Available for use across multiple courses or contexts
- **Course-specific**: Designed for a particular course

### Prerequisites

To create and manage components, you'll need:

- A GitHub account with access to the repository
- Basic knowledge of HTML, CSS, and JavaScript (for creating custom components)
- Access to the Blackboard courses where you want to embed components

## Creating Components {#creating-components}

### Using the Component Creation Tool

The easiest way to create a new component is using our component creation tool:

1. Clone the repository to your local machine
2. Run `npm install` to install dependencies
3. Run `npm run new:component` to start the component creation wizard
4. Follow the prompts to specify:
   - Component type (course-specific or shared)
   - Component category (general, research, or courses)
   - Course ID (if course-specific)
   - Component name and title
   - Basic description

The tool will create the necessary files with boilerplate code that you can customize.

### Manual Component Creation

If you prefer to create components manually:

1. Determine the appropriate location for your component:
   - Shared components: `/shared/components/[component-name].html`
   - Course-specific components: `/courses/[course-id]/[component-name].html`

2. Create an HTML file with the following structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Component Title</title>
  <link rel="stylesheet" href="/shared/styles/main.css">
  <script defer src="/shared/scripts/component.js"></script>
  <style>
    /* Component-specific styles */
    .component-container {
      padding: 20px;
      border-radius: 8px;
      background: #f5f5f5;
    }
  </style>
</head>
<body>
  <div class="component-container">
    <h1>Your Component Title</h1>
    <div id="interactive-content">
      <!-- Your component's HTML goes here -->
    </div>
  </div>

  <script>
    // Component-specific code
    document.addEventListener('DOMContentLoaded', function() {
      // Initialize your component
      console.log('Component loaded');
    });
  </script>
</body>
</html>
```

3. Add your component to the appropriate configuration file:
   - For course-specific components: `/courses/[course-id]/course-config.json`
   - For shared components: `/shared/components/shared-config.json`

### Creating Component Documentation

Each component should have accompanying documentation:

1. Create a documentation file in the appropriate location:
   - `/docs/examples/[component-name].md`

2. Use the following template for your documentation:

```markdown
---
layout: page
title: Component Name Documentation
permalink: /examples/component-name/
---

# Component Name

Brief description of what the component does and its educational purpose.

## Features

- Feature 1
- Feature 2
- Feature 3

## How to Use

Step-by-step instructions on how to use the component.

## Implementation Details

Technical details about how the component works.

## Embedding

Example code for embedding this component:

```html
<iframe src="https://yourusername.github.io/blackboard-content-hub/path/to/component.html" 
  width="100%" height="500" frameborder="0" allowfullscreen></iframe>
```

## Customization Options

Any parameters or options that can be used to customize the component.
```

## Embedding Components in Blackboard {#embedding-components}

To embed a component in Blackboard:

1. Navigate to the [Component Browser](/blackboard-content-hub/component-browser/) to find the component you want to embed
2. Click the "Copy to clipboard" button under the Embed Code section
3. In Blackboard, navigate to your course
4. Edit the content area where you want to add the component
5. Click the "HTML" button in the editor toolbar
6. Paste the iframe code
7. Click "Update" and then "Submit"

### Responsive Embedding

For responsive embedding that works well on all devices, use the following pattern:

```html
<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%;">
  <iframe 
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" 
    src="https://yourusername.github.io/blackboard-content-hub/path/to/component.html" 
    frameborder="0" 
    allowfullscreen>
  </iframe>
</div>
```

This creates a responsive container with a 16:9 aspect ratio. Adjust the padding-bottom percentage to change the aspect ratio:
- 75% for 4:3 aspect ratio
- 100% for 1:1 (square) aspect ratio

## Managing Components {#managing-components}

### Updating Components

To update an existing component:

1. Make your changes to the component HTML file
2. Commit and push your changes to GitHub
3. GitHub Actions will automatically build and deploy the updated component
4. The changes will be reflected in all instances where the component is embedded

### Versioning Components

If you need to maintain multiple versions of a component:

1. Create a new file with a versioned name (e.g., `component-name-v2.html`)
2. Update the documentation to reference both versions
3. Update any course configurations to use the appropriate version

## Best Practices {#best-practices}

### Performance

- Minimize external dependencies
- Optimize images and assets
- Use lazy loading for non-essential resources
- Keep components focused on a single purpose

### Accessibility

- Ensure all interactive elements are keyboard accessible
- Provide alternative text for images
- Use semantic HTML
- Test with screen readers
- Maintain sufficient color contrast

### Security

- Use HTTPS for all external resources
- Validate user input
- Be cautious with third-party libraries
- Set appropriate sandbox attributes for iframes

### Cross-Browser Compatibility

- Test on multiple browsers (Chrome, Firefox, Safari, Edge)
- Use feature detection rather than browser detection
- Provide fallbacks for unsupported features

## Additional Resources

- [Developer Guide](/blackboard-content-hub/developer-guide/)
- [API Reference](/blackboard-content-hub/api-reference/)
- [Troubleshooting](/blackboard-content-hub/troubleshooting/)
- [GitHub Repository](https://github.com/yourusername/blackboard-content-hub)