# Development Area

This directory contains components that are in development and not yet ready for production. Use this area for testing and experimenting with new iframe components before moving them to the shared or course-specific directories.

## Structure

```
dev/
├── components/       # Development components
├── preview/          # Preview UI for testing components
└── README.md         # This file
```

## Example Components

The following example components are available for reference:

| Component | Description | Documentation |
|-----------|-------------|---------------|
| [design-principles-demo.html](./components/design-principles-demo.html) | Interactive canvas tool demonstrating game-inspired design principles | [Documentation](./components/design-principles-demo.md) |
| [template.html](./components/template.html) | Basic template for new components | - |
| [default-template.html](./components/default-template.html) | Default template with common features | - |

These examples demonstrate best practices for component design and implementation.

## Usage

1. Create your development components in the `dev/components/` directory
2. Use the development server to preview your components in real-time
3. When a component is ready, use the component creation tool to move it to production

See the [Development Guide](../docs/developer-guide/development-workflow.md) for more details.

## Testing Design Principles

To see the design principles in action, open the [design-principles-demo.html](./components/design-principles-demo.html) component in the preview UI. This component demonstrates:

- Clear layout organization with canvas and controls
- Intuitive user interface with grouped controls
- Interactive feedback mechanisms
- Responsive design for different screen sizes
- Loading states and error handling

For more information on design principles, see the [Design Principles Guide](../docs/developer-guide/design-principles.md).