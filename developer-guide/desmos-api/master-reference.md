# Desmos API Master Reference

This document serves as a central index for all Desmos API references optimized for Claude AI and the Roo agent in VSCode. This reference covers three main API variants:

1. [Desmos Standard API v1.10](#desmos-standard-api-v110)
2. [Desmos Geometry API v1.10](#desmos-geometry-api-v110)
3. [Desmos 3D API v1.11](#desmos-3d-api-v111)

## Query Examples for Roo Agent

To effectively query this documentation through the Roo agent, use the following structured query formats:

### Function Lookup
```xml
<query>
  <api_version>1.10</api_version>
  <api_type>Standard|Geometry|3D</api_type>
  <function>functionName</function>
  <aspect>syntax|parameters|returns|examples|errors|all</aspect>
</query>
```

### Domain Lookup
```xml
<query>
  <api_version>1.10</api_version>
  <api_type>Standard|Geometry|3D</api_type>
  <domain>expressions|state|viewport|etc</domain>
</query>
```

### Implementation Question
```xml
<query>
  <api_version>1.10</api_version>
  <api_type>Standard|Geometry|3D</api_type>
  <task>Description of what you want to accomplish</task>
</query>
```

### Error Resolution
```xml
<query>
  <api_version>1.10</api_version>
  <api_type>Standard|Geometry|3D</api_type>
  <error>Error description or message</error>
</query>
```

## Desmos Standard API v1.10

The Desmos Standard API allows you to embed and control an interactive 2D graphing calculator in web applications.

### Quick Start

```javascript
// Include the Desmos API script 
<script src="https://www.desmos.com/api/v1.10/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6"></script>

// Add a container element
<div id="calculator" style="width: 600px; height: 400px;"></div>

// Instantiate the calculator
var elt = document.getElementById('calculator');
var calculator = Desmos.GraphingCalculator(elt);

// Add an expression
calculator.setExpression({id: 'graph1', latex: 'y=x^2'});
```

### Core Features

- Interactive 2D graphing
- Expression management (equations, points, tables, text)
- State saving and loading
- Viewport control
- Event observation
- Image capture

[View the complete Standard API Reference](desmos-standard-api.md)

## Desmos Geometry API v1.10

The Desmos Geometry API enables embedding an interactive geometric construction tool in web applications.

### Quick Start

```javascript
// Include the Desmos API script 
<script src="https://www.desmos.com/api/v1.10/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6"></script>

// Add a container element
<div id="geometry" style="width: 600px; height: 400px;"></div>

// Instantiate the geometry tool
var elt = document.getElementById('geometry');
var geometry = Desmos.Geometry(elt);
```

### Core Features

- Interactive geometric constructions
- State saving and loading
- Image capture
- Author features for customized tool availability

[View the complete Geometry API Reference](desmos-geometry-api.md)

## Desmos 3D API v1.11

The Desmos 3D API v1.11 enables embedding an interactive 3D graphing calculator in web applications.

### Quick Start

```javascript
// Include the Desmos API script
<script src="https://www.desmos.com/api/v1.11/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6"></script>

// Add a container element
<div id="calculator" style="width: 600px; height: 400px;"></div>

// Instantiate the 3D calculator
var elt = document.getElementById('calculator');
var calculator = Desmos.Calculator3D(elt);
```

### Core Features

- Interactive 3D graphing
- Expression management (surfaces, points, etc.)
- State saving and loading
- Viewport control
- Event observation
- Image capture

[View the complete 3D API Reference](desmos-3d-api.md)

## Common Integration Patterns

### Combining Multiple Calculator Types

You can create different calculator types on the same page, but typically not in the same container element. Here's an example of toggling between different calculator types:

```javascript
var container = document.getElementById('calculator-container');
var currentCalculator = null;

function createStandardCalculator() {
  if (currentCalculator) {
    currentCalculator.destroy();
  }
  currentCalculator = Desmos.GraphingCalculator(container);
  return currentCalculator;
}

function createGeometryCalculator() {
  if (currentCalculator) {
    currentCalculator.destroy();
  }
  currentCalculator = Desmos.Geometry(container);
  return currentCalculator;
}

function create3DCalculator() {
  if (currentCalculator) {
    currentCalculator.destroy();
  }
  currentCalculator = Desmos.Calculator3D(container);
  return currentCalculator;
}

// Button event handlers
document.getElementById('standard-button').addEventListener('click', createStandardCalculator);
document.getElementById('geometry-button').addEventListener('click', createGeometryCalculator);
document.getElementById('3d-button').addEventListener('click', create3DCalculator);

// Initialize with standard calculator
createStandardCalculator();
```

### Saving and Loading States

All calculator types have similar state management methods:

```javascript
// Get current state
var state = calculator.getState();
var stateJSON = JSON.stringify(state);

// Save state to localStorage
localStorage.setItem('calculatorState', stateJSON);

// Load state from localStorage
var savedStateJSON = localStorage.getItem('calculatorState');
if (savedStateJSON) {
  try {
    var savedState = JSON.parse(savedStateJSON);
    calculator.setState(savedState);
  } catch (e) {
    console.error('Error loading saved state:', e);
  }
}
```

### Auto-Saving with Change Events

All calculator types support change events for implementing auto-save functionality:

```javascript
// Auto-save state when the calculator changes
calculator.observeEvent('change', function(event) {
  // Only save user-initiated changes to avoid saving programmatic changes
  if (event.isUserInitiated) {
    localStorage.setItem('calculatorState', JSON.stringify(calculator.getState()));
  }
});
```

### Taking and Using Screenshots

All calculator types support capturing images of the current content:

```javascript
// Basic screenshot
var imageData = calculator.screenshot();
document.getElementById('preview-image').src = imageData;

// High-resolution screenshot
var hiResImage = calculator.screenshot({
  width: 600,
  height: 400,
  targetPixelRatio: 2 // 2x resolution for retina displays
});

// Asynchronous screenshot (better for large images)
calculator.asyncScreenshot({
  width: 1200,
  height: 800
}, function(err, data) {
  if (!err) {
    // Save or display the image
    var link = document.createElement('a');
    link.href = data;
    link.download = 'desmos-screenshot.png';
    link.click();
  }
});
```

## Cross-Version Compatibility

While the APIs for all calculator types follow similar patterns, they are not completely interchangeable. Specific notes:

1. **State objects** are specific to each calculator type and are not interchangeable between Standard, Geometry, and 3D calculators.

2. **Version migrations** - When upgrading API versions (e.g., v1.9 to v1.10), state objects are generally forward compatible but not backward compatible. Always test state loading when upgrading.

3. **Feature availability** - Some features are specific to certain calculator types or versions. Always check the specific API reference for feature support.

## Best Practices

1. **Always destroy instances** when removing them from the page to prevent memory leaks.

2. **Use the correct API version** in your script URL to ensure predictable behavior.

3. **Set a default state** with `setDefaultState()` for interactive activities to give users a reset point.

4. **Use `allowUndo: true`** with `setState()` when you want to preserve undo history when loading states.

5. **Consider mobile usage** by implementing responsive container sizing and possibly showing the keypad automatically.

6. **Check for errors** when loading states, especially if they come from user-provided sources or storage.

7. **Obtain a production API key** for production applications rather than using the demo key.