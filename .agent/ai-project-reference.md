# AI SELF-REFERENCE: BLACKBOARD CONTENT HUB PROJECT

## PROJECT_STRUCTURE
```
blackboard-content-hub/
├── .agent/                  # AI assistant knowledge base
│   ├── issues/              # Documented issues and solutions
│   ├── knowledge-base/      # Reusable solutions and patterns
│   │   ├── content-hub-structure.md  # Project structure documentation
│   │   └── iframe-best-practices.md  # Iframe best practices
│   └── templates/           # Templates for tracking issues
├── assets/                  # Static assets
│   ├── images/              # Images for components
│   ├── fonts/               # Custom fonts
│   └── documents/           # PDF and other documents
├── build/                   # Build scripts and configuration
│   └── build.js             # Main build script
├── courses/                 # Course-specific components
│   ├── math-a151/           # College Algebra
│   ├── math-a152/           # Trigonometry
│   ├── math-a221/           # Applied Calculus
│   ├── math-a251/           # Calculus I
│   ├── math-a252/           # Calculus II
│   ├── math-a253/           # Calculus III
│   ├── stat-a253/           # Applied Statistics
│   └── general/             # General components
├── docs/                    # Documentation (Jekyll site)
│   ├── _config.yml          # Jekyll configuration
│   ├── component-data.json  # Component metadata
│   ├── index.md             # Main documentation page
│   ├── component-browser/   # Component browser interface
│   ├── courses/             # Course-specific documentation
│   ├── developer-guide/     # Developer documentation
│   │   ├── index.md         # Developer guide overview
│   │   ├── iframe-integration.md # Iframe integration guide
│   │   └── geogebra-api/    # GeoGebra API documentation
│   ├── examples/            # Component documentation
│   ├── troubleshooting/     # Troubleshooting guides
│   └── user-guide/          # End-user documentation
├── shared/                  # Shared resources
│   ├── components/          # Shared components
│   │   └── flatland-message.html # GeoGebra-based component
│   ├── libraries/           # Shared libraries
│   ├── scripts/             # Shared JavaScript
│   │   └── component.js     # Common component functionality
│   └── styles/              # Shared CSS
│       └── main.css         # Main stylesheet
└── tools/                   # Development tools
    ├── create-component.js  # Tool for creating new components
    └── create-course.js     # Tool for creating new courses
```

## KEY_FILES_REFERENCE
- **package.json**: NPM configuration with scripts for building and deploying
- **build/build.js**: Main build script that processes components and documentation
- **.gitignore**: Excludes build artifacts, dependencies, and system files
- **.github/workflows/deploy.yml**: GitHub Actions workflow for automated deployment
- **docs/_config.yml**: Jekyll configuration for the documentation site
- **docs/component-data.json**: Registry of all available components with metadata
- **shared/components/flatland-message.html**: Example GeoGebra-based component
- **shared/scripts/component.js**: Common JavaScript functionality for components
- **shared/styles/main.css**: Common CSS styles for components
- **tools/create-component.js**: Script for creating new components
- **tools/create-course.js**: Script for creating new course directories

## COMPONENT_STRUCTURE
Components are organized into two categories:
1. **Shared Components**: `shared/components/[component-name].html`
2. **Course-Specific Components**: `courses/[course-id]/[component-name].html`

Each component has:
- HTML file with the component implementation
- Documentation in `docs/examples/[component-name].md`
- Entry in `docs/component-data.json`

## COURSE_NAMING_CONVENTION
- **math-a151**: College Algebra
- **math-a152**: Trigonometry
- **math-a221**: Applied Calculus
- **math-a251**: Calculus I
- **math-a252**: Calculus II
- **math-a253**: Calculus III
- **stat-a253**: Applied Statistics
- **general**: General components

## DOCUMENTATION_SYSTEM
- Jekyll-based static site in the `docs/` directory
- Component browser at `docs/component-browser/`
- Developer documentation at `docs/developer-guide/`
- User documentation at `docs/user-guide/`
- Troubleshooting guides at `docs/troubleshooting/`
- Component documentation at `docs/examples/`
- Course-specific documentation at `docs/courses/`

## BUILD_DEPLOY_PROCESS
1. **Build**: `npm run build`
   - Builds Jekyll site from docs directory
   - Copies components from shared/components and courses directories
   - Copies shared resources
   - Optimizes assets
2. **Deploy**: `npm run deploy`
   - Deploys to GitHub Pages

## COMPONENT_CREATION_WORKFLOW
1. Run `npm run new:component`
2. Choose component type (shared or course-specific)
3. Specify component name, title, and description
4. Edit the generated HTML file
5. Update the generated documentation

## COURSE_CREATION_WORKFLOW
1. Run `npm run new:course`
2. Specify course ID, title, and description
3. Course directory and documentation are created automatically

## GEOGEBRA_INTEGRATION
- GeoGebra API documentation in `docs/developer-guide/geogebra-api/`
- Example implementation in `shared/components/flatland-message.html`
- Integration guide at `docs/developer-guide/geogebra-api/integration-guide.md`

## IFRAME_BEST_PRACTICES
- Always use HTTPS for iframe sources
- Set appropriate sandbox attributes
- Implement Content-Security-Policy headers
- Use lazy loading when possible
- Set proper width/height to avoid reflow
- Provide alternative content
- Use postMessage for cross-origin communication
- Use responsive design techniques

## COMPONENT_DATA_SCHEMA
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
For course-specific components, add `"courseId": "course-id"`.

## NPM_SCRIPTS
- **start**: `jekyll serve --source docs`
- **build**: `node build/build.js`
- **deploy**: `gh-pages -d dist`
- **new:component**: `node tools/create-component.js`
- **new:course**: `node tools/create-course.js`

## FLATLAND_MESSAGE_COMPONENT
- GeoGebra-based interactive mathematical visualization
- Located at `shared/components/flatland-message.html`
- Documentation at `docs/examples/flatland-message.md`
- Demonstrates:
  - Interactive problem solving
  - Real-time feedback
  - Tabbed interface
  - Responsive design
  - Visual enhancements

## QUICK_REFERENCE_COMMANDS
```bash
# Create new component
npm run new:component

# Create new course
npm run new:course

# Build project
npm run build

# Deploy to GitHub Pages
npm run deploy

# Start local development server
npm start