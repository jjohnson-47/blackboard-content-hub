# Blackboard Content Hub Structure

This document outlines the optimal structure for organizing iframe implementations and their documentation in the Blackboard Content Hub project.

## Directory Structure

```
blackboard-content-hub/
├── .agent/                  # AI assistant knowledge base
│   ├── issues/              # Documented issues and solutions
│   ├── knowledge-base/      # Reusable solutions and patterns
│   └── templates/           # Templates for tracking issues
├── assets/                  # Static assets
│   ├── images/              # Images for components
│   ├── fonts/               # Custom fonts
│   └── documents/           # PDF and other documents
├── build/                   # Build scripts and configuration
├── courses/                 # Course-specific components
│   ├── math-a151/           # College Algebra
│   ├── math-a152/           # Trigonometry
│   ├── math-a221/           # Applied Calculus
│   ├── math-a251/           # Calculus I
│   ├── math-a252/           # Calculus II
│   ├── math-a253/           # Calculus III
│   └── stat-a253/           # Applied Statistics
├── docs/                    # Documentation (Jekyll site)
│   ├── user-guide/          # End-user documentation
│   ├── developer-guide/     # Technical documentation
│   ├── troubleshooting/     # Common issues and solutions
│   ├── component-browser/   # Interactive component browser
│   ├── courses/             # Course-specific pages
│   └── examples/            # Component documentation
├── shared/                  # Shared resources
│   ├── components/          # Shared components
│   ├── libraries/           # Shared libraries
│   ├── scripts/             # Shared JavaScript
│   └── styles/              # Shared CSS
└── tools/                   # Development tools
```

## Component Organization

### Shared vs. Course-Specific Components

Components are organized into two main categories:

1. **Shared Components**: Located in `shared/components/`. These are general-purpose components that can be used across multiple courses.

2. **Course-Specific Components**: Located in `courses/[course-id]/`. These are components designed specifically for a particular course.

### Course Naming Convention

Course directories follow the university's Blackboard naming convention:

- `math-a151`: College Algebra
- `math-a152`: Trigonometry
- `math-a221`: Applied Calculus
- `math-a251`: Calculus I
- `math-a252`: Calculus II
- `math-a253`: Calculus III
- `stat-a253`: Applied Statistics
- `general`: General components that don't fit into specific courses

## Documentation Structure

### Component Documentation

Each component has a corresponding documentation file in `docs/examples/[component-name].md`. This documentation includes:

- Overview of the component
- Features
- Usage instructions with iframe embedding code
- Implementation details
- Educational applications
- Accessibility features
- Browser compatibility
- Troubleshooting information

### Course Documentation

Each course has a dedicated page at `docs/courses/[course-id]/index.md` that lists all components available for that course.

### Component Browser

The component browser at `docs/component-browser/index.md` provides an interactive interface for browsing all available components, with filtering options by category, course, and type.

## Component Data

Component metadata is stored in `docs/component-data.json` with the following structure:

```json
{
  "id": "component-id",
  "title": "Component Title",
  "category": "general|research|courses",
  "type": "shared|course-specific",
  "description": "Component description",
  "url": "/blackboard-content-hub/path/to/component.html",
  "documentationUrl": "/blackboard-content-hub/examples/component-id.html",
  "tags": ["tag1", "tag2"]
}
```

For course-specific components, an additional `courseId` field is included.

## Development Tools

### Component Creation

The `tools/create-component.js` script automates the creation of new components:

1. Creates the component HTML file with appropriate template
2. Creates the documentation file
3. Updates the component-data.json file

### Course Creation

The `tools/create-course.js` script automates the creation of new courses:

1. Creates the course directory structure
2. Creates a README.md file for the course
3. Creates the course index page in the docs directory
4. Updates the courses list in the docs

## Build and Deploy Process

The build process:

1. Builds the Jekyll site from the docs directory
2. Copies components from shared/components and courses directories
3. Copies shared resources (styles, scripts, libraries)
4. Optimizes assets

Deployment is handled through GitHub Actions, which:

1. Builds the project
2. Deploys to the gh-pages branch

## Best Practices for Iframe Implementation

### Security

- Always use HTTPS for iframe sources
- Set appropriate sandbox attributes
- Implement Content-Security-Policy headers
- Consider using allow/allowfullscreen attributes selectively

### Performance

- Lazy load iframes when possible
- Set proper width/height to avoid reflow
- Consider using srcdoc for small content
- Minimize iframe content size and dependencies

### Accessibility

- Ensure iframe content is accessible
- Provide alternative content when iframes cannot be displayed
- Use title attribute to describe iframe purpose
- Ensure keyboard navigation works within iframes

### Cross-Domain Communication

- Use postMessage for secure communication
- Validate message origin
- Structure message data consistently
- Handle errors gracefully

### Responsive Design

- Use relative units for dimensions (%, vh/vw)
- Consider aspect ratio preservation techniques
- Test on multiple devices and screen sizes
- Implement responsive strategies within iframe content

## Lessons Learned from Flatland Message Component

The Flatland Message component implementation provided several insights:

1. **External Libraries Integration**: GeoGebra integration requires specific initialization parameters and event handling.

2. **Interactive Mathematical Visualizations**: Mathematical problems can be effectively visualized using interactive components with real-time feedback.

3. **Tabbed Interface Design**: Using tabs for different content sections (Problem, Solution, Guide) provides a clean and organized user experience.

4. **Status Feedback**: Providing real-time status updates enhances the educational experience by guiding users toward the solution.

5. **Responsive Layout Considerations**: Components with complex layouts require special attention to responsive design, particularly for the side panel and main visualization area.

6. **Visual Feedback**: Using color changes and animations to indicate correct solutions provides immediate feedback to users.

7. **Mathematical Notation**: Special consideration is needed for displaying mathematical notation and formulas in a visually appealing way.