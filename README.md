<div align="center">
  <img src="assets/images/blackboard-content-hub-logo.svg" alt="Blackboard Content Hub" width="800">
  <p><em>Interactive educational components with seamless documentation for Blackboard LMS</em></p>
</div>

# Blackboard Content Hub

A comprehensive platform for creating, hosting, and documenting interactive educational content as iframes for embedding in Blackboard LMS.

## 🎯 Overview

The Blackboard Content Hub provides a structured framework for developing and hosting interactive educational components that can be embedded in Blackboard courses. The project is designed to:

- 🏢 Organize content by category (general, research, courses)
- 🔄 Support both shared and course-specific components
- 📚 Provide comprehensive documentation
- 🚀 Optimize for GitHub Pages hosting
- 🔌 Facilitate easy embedding in Blackboard

## 🗂️ Project Structure

```
blackboard-content-hub/
├── .agent/                  # AI assistant knowledge base
│   ├── issues/              # Documented issues and solutions
│   ├── knowledge-base/      # Reusable solutions and patterns
│   └── templates/           # Templates for tracking issues
├── assets/                  # Static assets
│   ├── images/              # Images for components
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

The documentation includes:

| Section | Description |
|---------|-------------|
| **[User Guide](https://jjohnson-47.github.io/blackboard-content-hub/user-guide/)** | Instructions for creating and embedding components |
| **[Developer Guide](https://jjohnson-47.github.io/blackboard-content-hub/developer-guide/)** | Technical documentation for developers |
| **[Component Browser](https://jjohnson-47.github.io/blackboard-content-hub/component-browser/)** | Interactive browser for all available components |
| **[Courses](https://jjohnson-47.github.io/blackboard-content-hub/courses/)** | Course-specific components |
| **[Troubleshooting](https://jjohnson-47.github.io/blackboard-content-hub/troubleshooting/)** | Solutions to common issues |

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

## 🤝 Contributing

Contributions are welcome! Please see the [Contributing Guide](https://jjohnson-47.github.io/blackboard-content-hub/contributing/) for details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
