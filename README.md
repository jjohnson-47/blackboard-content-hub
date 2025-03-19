<div align="center">
  <img src="assets/images/blackboard-content-hub-logo.svg" alt="Blackboard Content Hub" width="800">
  <p><em>Interactive educational components with seamless documentation for Blackboard LMS</em></p>
  <hr style="width: 50%; border-color: #FF007F; margin: 20px auto;">
</div>

<h1 align="center" style="color: #FF007F;">Blackboard Content Hub</h1>

<p align="center">A comprehensive platform for creating, hosting, and documenting interactive educational content as iframes for embedding in Blackboard LMS.</p>

<div align="center">
  <a href="https://jjohnson-47.github.io/blackboard-content-hub/" style="display: inline-block; background-color: #2c3899; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 10px;">View Documentation</a>
  <a href="https://jjohnson-47.github.io/blackboard-content-hub/component-browser/" style="display: inline-block; background-color: #FF007F; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 10px;">Browse Components</a>
</div>

## ✨ Overview

The Blackboard Content Hub provides a structured framework for developing and hosting interactive educational components that can be embedded in Blackboard courses. Built with the "Nascent Digital Dawn" design theme, it combines deep indigo backgrounds with electric magenta accents for a modern, engaging experience.

The project is designed to:

- 🏢 Organize content by category (general, research, courses)
- 🔄 Support both shared and course-specific components
- 📚 Provide comprehensive documentation
- 🚀 Optimize for GitHub Pages hosting
- 🔌 Facilitate easy embedding in Blackboard
- 🎨 Deliver a consistent, visually appealing experience

## 🗂️ Project Structure

```
blackboard-content-hub/
├── .agent/                  # AI assistant knowledge base
│   ├── issues/              # Documented issues and solutions
│   ├── knowledge-base/      # Reusable solutions and patterns
│   └── templates/           # Templates for tracking issues
├── assets/                  # Static assets
│   ├── images/              # Images for components
│   │   └── banner/          # Banner animation images
│   ├── fonts/               # Custom fonts
│   ├── css/                 # CSS for animations
│   ├── js/                  # JavaScript for animations
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
│   └── courses/             # Course-specific pages
├── shared/                  # Shared resources
│   ├── components/          # Shared components
│   ├── libraries/           # Shared libraries
│   ├── scripts/             # Shared JavaScript
│   └── styles/              # Shared CSS
└── tools/                   # Development tools
```

## 📖 Documentation

Comprehensive documentation is available at: [https://jjohnson-47.github.io/blackboard-content-hub/](https://jjohnson-47.github.io/blackboard-content-hub/)

The documentation features our "Nascent Digital Dawn" design theme with animated ember particles and wireframe surfaces, creating an immersive, digital landscape experience.

<table>
  <tr>
    <th style="background-color: #2c3899; color: white;">Section</th>
    <th style="background-color: #2c3899; color: white;">Description</th>
  </tr>
  <tr>
    <td><a href="https://jjohnson-47.github.io/blackboard-content-hub/user-guide/"><strong>User Guide</strong></a></td>
    <td>Instructions for creating and embedding components</td>
  </tr>
  <tr>
    <td><a href="https://jjohnson-47.github.io/blackboard-content-hub/developer-guide/"><strong>Developer Guide</strong></a></td>
    <td>Technical documentation for developers</td>
  </tr>
  <tr>
    <td><a href="https://jjohnson-47.github.io/blackboard-content-hub/component-browser/"><strong>Component Browser</strong></a></td>
    <td>Interactive browser for all available components</td>
  </tr>
  <tr>
    <td><a href="https://jjohnson-47.github.io/blackboard-content-hub/courses/"><strong>Courses</strong></a></td>
    <td>Course-specific components</td>
  </tr>
  <tr>
    <td><a href="https://jjohnson-47.github.io/blackboard-content-hub/troubleshooting/"><strong>Troubleshooting</strong></a></td>
    <td>Solutions to common issues</td>
  </tr>
</table>

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v8 or higher)
- Git
- Ruby and Jekyll (for local documentation development)

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

3. Start the documentation site locally:
   ```bash
   npm run serve
   ```

### Creating a New Component

Use the component creation tool:

```bash
npm run new:component
```

Follow the prompts to create either a shared or course-specific component.

### Creating a New Course

Use the course creation tool:

```bash
npm run new:course
```

This will create the necessary directory structure and configuration files for a new course.

### Building and Deploying

#### Local Development

For local development and testing:

```bash
# Build the project
npm run build

# Serve the documentation site locally
npm run serve

# Preview components in development mode
npm run preview
```

#### Deployment

Deploy to GitHub Pages with a single command:

```bash
npm run deploy
```

This script will:
1. Build the Jekyll documentation site
2. Process and prepare all iframe components
3. Deploy everything to the gh-pages branch
4. GitHub Pages will automatically serve the content

## 📂 Deployment Architecture

The project uses a two-branch deployment strategy:

- **`main` branch**: Source code repository
  - Contains all source files, development code, and documentation source
  - Used for development and version control

- **`gh-pages` branch**: Deployment branch
  - Contains only built/processed files ready for serving
  - Automatically updated by the deployment script
  - Served as GitHub Pages

This approach provides:
- Clean separation between source and built files
- Optimized serving of only necessary files
- Full control over the build process
- Version integrity with main branch as the single source of truth

## 🎨 Design System

The Blackboard Content Hub uses the "Nascent Digital Dawn" design system, featuring:

- **Deep indigo backgrounds** (#08131b) that blend with the animated banner
- **Electric magenta accents** (#FF007F) for interactive elements and highlights
- **Animated ember particles** that create a dynamic, engaging experience
- **Wireframe surface imagery** for a modern, digital aesthetic
- **Clean typography** with Rajdhani for headings and Open Sans for body text

For more details, see the [Nascent Digital Dawn Style Guide](https://jjohnson-47.github.io/blackboard-content-hub/developer-guide/nascent-digital-dawn-style-guide/).

## 🤝 Contributing

Contributions are welcome! Please see the [Contributing Guide](https://jjohnson-47.github.io/blackboard-content-hub/contributing/) for details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
