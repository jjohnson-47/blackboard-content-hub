---
layout: page
title: GeoGebra Integration Guide
permalink: /developer-guide/geogebra-api/integration-guide/
---

# GeoGebra Integration Guide

This guide provides comprehensive information on integrating GeoGebra into web applications and developing custom tools, with specific guidance for the Blackboard Content Hub.

## Table of Contents

1. [Reference Documentation](#reference-documentation)
2. [Implementation Workflow](#implementation-workflow)
3. [Best Practices](#best-practices)
4. [Common Integration Scenarios](#common-integration-scenarios)
5. [Blackboard Content Hub Integration](#blackboard-content-hub-integration)
6. [Troubleshooting](#troubleshooting)

## Reference Documentation

When implementing GeoGebra functionality, refer to these structured reference documents:

- **[GeoGebra API - Overview](./overview.md)**: High-level overview and navigation
- **[GeoGebra Core API Methods](./core-methods.md)**: Creating and manipulating objects
- **[GeoGebra Construction and UI Controls](./construction-and-ui.md)**: Interface and construction management
- **[GeoGebra Event Handling](./event-handling.md)**: Event listeners and client events
- **[GeoGebra File Format and Data Exchange](./file-format-data-exchange.md)**: XML and file operations
- **[GeoGebra Initialization and API Access](./initialization-and-access.md)**: Setup and configuration
- **[GeoGebra File Formats and Scripting](./file-formats-scripting.md)**: File specifications and scripting

## Implementation Workflow

Follow this systematic approach when implementing GeoGebra functionality:

1. **Analysis**: Identify the required functionality (visualization, interaction, calculation)
2. **Setup**: Initialize the GeoGebra applet with appropriate parameters
3. **Implementation**: Develop the required features using the API
4. **Testing**: Validate that the implementation meets requirements
5. **Optimization**: Improve performance and user experience

### Example Implementation Process

```javascript
// 1. Setup parameters
const parameters = {
  "id": "ggb1",
  "width": 800,
  "height": 600,
  "showMenuBar": false,
  "showAlgebraInput": true,
  "showToolBar": true,
  "customToolBar": "0 1 2 3 4 5 6 7 8 9 10 11 || 12 13 14 15",
  "appletOnLoad": function(api) {
    // 2. Store API reference
    window.ggbApplet = api;
    
    // 3. Initialize construction
    api.setCoordSystem(-10, 10, -10, 10);
    api.evalCommand("A = (3, 2)");
    api.evalCommand("B = (5, 7)");
    api.evalCommand("f(x) = sin(x)");
    
    // 4. Set styles
    api.setPointStyle("A", 0); // Filled circle
    api.setPointStyle("B", 0);
    api.setColor("f", 255, 0, 0);
    
    // 5. Add interactivity
    api.registerObjectUpdateListener("A", updateConstruction);
    api.registerObjectUpdateListener("B", updateConstruction);
  }
};

// 6. Initialize the applet
const ggb = new GGBApplet(parameters, true);
window.addEventListener("load", function() {
  ggb.inject('ggb-element');
});

// 7. Define update handler
function updateConstruction() {
  const xA = ggbApplet.getXcoord("A");
  const yA = ggbApplet.getYcoord("A");
  const xB = ggbApplet.getXcoord("B");
  const yB = ggbApplet.getYcoord("B");
  
  // Update dependent construction
  ggbApplet.evalCommand("C = Midpoint(A, B)");
}
```

## Best Practices

### Performance Optimization

1. **Batch Operations**: Disable repainting during multiple operations
   ```javascript
   ggbApplet.setRepaintingActive(false);
   // Perform multiple operations...
   ggbApplet.setRepaintingActive(true);
   ```

2. **Event Listener Management**: Only register necessary listeners and unregister when no longer needed
   ```javascript
   ggbApplet.registerUpdateListener(updateHandler);
   // Later when not needed:
   ggbApplet.unregisterUpdateListener(updateHandler);
   ```

3. **Error Handling**: Implement proper error handling for commands
   ```javascript
   ggbApplet.setErrorDialogsActive(false);
   try {
     const success = ggbApplet.evalCommand("A = (1,2)");
     if (!success) {
       console.log("Command failed");
     }
   } catch (e) {
     console.error("Error executing command:", e);
   }
   ```

### Security Considerations

1. **Input Validation**: Always validate user input before passing to evalCommand
2. **File Loading**: Verify the source of .ggb or .ggt files before loading
3. **JavaScript Execution**: Be cautious when loading files with embedded JavaScript

## Common Integration Scenarios

### Embedding in a Learning Management System (LMS)

```html
<div id="ggb-container"></div>
<script>
  const ggbApp = new GGBApplet({
    "material_id": "abc123",
    "appName": "graphing",
    "width": 800,
    "height": 600,
    "showResetIcon": true,
    "enableLabelDrags": false
  }, true);
  
  window.addEventListener("load", function() {
    ggbApp.inject('ggb-container');
  });
</script>
```

### Creating an Interactive Assessment

```javascript
// Create a GeoGebra-based assessment with automatic checking
function setupAssessment() {
  ggbApplet.evalCommand("A = (0,0)");
  ggbApplet.evalCommand("B = (5,0)");
  ggbApplet.evalCommand("C = Point({(x,y) | x^2 + y^2 = 25})");
  ggbApplet.setPointStyle("C", 0);
  ggbApplet.setColor("C", 255, 0, 0);
  
  // Question text
  document.getElementById("question").textContent = 
    "Position point C so that triangle ABC is equilateral.";
  
  // Check button
  document.getElementById("check-btn").addEventListener("click", function() {
    const xC = ggbApplet.getXcoord("C");
    const yC = ggbApplet.getYcoord("C");
    
    // Check if point C forms an equilateral triangle with A and B
    const distAB = 5;
    const distAC = Math.sqrt(xC*xC + yC*yC);
    const distBC = Math.sqrt((xC-5)*(xC-5) + yC*yC);
    
    const isEquilateral = Math.abs(distAB - distAC) < 0.1 && 
                          Math.abs(distAB - distBC) < 0.1 && 
                          Math.abs(distAC - distBC) < 0.1;
    
    if (isEquilateral) {
      document.getElementById("feedback").textContent = "Correct!";
    } else {
      document.getElementById("feedback").textContent = "Not quite. Try again!";
    }
  });
}
```

## Blackboard Content Hub Integration

When integrating GeoGebra components into the Blackboard Content Hub, follow these specific guidelines:

### Directory Structure

Place your GeoGebra components in the appropriate directory:

- **Shared components**: `shared/components/your-component.html`
- **Course-specific components**: `courses/[course-id]/your-component.html`

### Component Structure

Structure your GeoGebra component HTML file following this pattern:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Component Title</title>
  <script src="https://www.geogebra.org/apps/deployggb.js"></script>
  <style>
    /* Component-specific styles */
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f7f9fc;
      color: #333;
      overflow: hidden;
    }
    
    .container {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100vh;
      max-height: 100vh;
    }
    
    /* Add your component-specific styles here */
  </style>
</head>
<body>
  <div class="container">
    <!-- Component header -->
    <header>
      <h1>Your Component Title</h1>
      <!-- Controls, if needed -->
    </header>
    
    <!-- Main content area -->
    <div class="main-content">
      <!-- GeoGebra applet container -->
      <div id="ggb-element"></div>
      
      <!-- Additional UI elements -->
    </div>
  </div>
  
  <script>
    // GeoGebra initialization
    const parameters = {
      // Your GeoGebra parameters
    };
    
    // Initialize the applet
    const ggb = new GGBApplet(parameters, true);
    window.addEventListener("load", function() {
      ggb.inject('ggb-element');
      window.addEventListener('resize', resizeApplet);
    });
    
    // Responsive sizing
    const resizeApplet = function() {
      const container = document.getElementById('ggb-element');
      if (window.ggbApplet) {
        window.ggbApplet.setWidth(container.clientWidth);
        window.ggbApplet.setHeight(container.clientHeight);
      }
    };
    
    // Your component-specific code
  </script>
</body>
</html>
```

### Documentation

Create documentation for your component in `docs/examples/your-component.md` with:

1. Overview of the component
2. Mathematical concepts demonstrated
3. Usage instructions with iframe embedding code
4. Implementation details
5. Educational applications

### Component Registration

Add your component to `docs/component-data.json`:

```json
{
  "id": "your-component-id",
  "title": "Your Component Title",
  "category": "general",
  "type": "shared",
  "description": "Description of your component",
  "url": "/blackboard-content-hub/shared/components/your-component.html",
  "documentationUrl": "/blackboard-content-hub/examples/your-component.html",
  "tags": ["relevant", "tags", "here"]
}
```

### Example: Flatland Message Component

The [Flatland Message component](../../examples/flatland-message.html) demonstrates effective GeoGebra integration with:

1. **Interactive Problem Solving**: Users interact with a mathematical problem by dragging a point along a parabola.
2. **Real-time Feedback**: The component provides immediate feedback on the user's progress.
3. **Tabbed Interface**: Content is organized into Problem, Solution, and Guide tabs.
4. **Responsive Design**: The layout adapts to different screen sizes.
5. **Visual Enhancements**: Custom styling of GeoGebra objects improves the visual experience.

## Troubleshooting

### Common Issues and Solutions

1. **Applet not loading**
   - Check browser console for errors
   - Verify that deployggb.js is properly loaded
   - Ensure the container element exists and is correctly referenced

2. **Commands not executing**
   - Verify the command syntax using the GeoGebra documentation
   - Check if objects referenced in the command exist
   - Use `evalCommandGetLabels` to get the created object labels for debugging

3. **Performance issues**
   - Limit the number of objects in the construction
   - Use `setRepaintingActive(false)` during batch operations
   - Optimize event listeners to avoid unnecessary recalculations

4. **Compatibility problems**
   - Test with multiple browsers
   - Consider using the HTML5 version instead of Java applet
   - Check for version-specific API differences

### Debugging Techniques

1. **Command Inspection**
   ```javascript
   const xmlString = ggbApplet.getXML("myObject");
   console.log(xmlString);
   ```

2. **State Tracking**
   ```javascript
   ggbApplet.registerUpdateListener(function(objName) {
     console.log(`Object updated: ${objName}`);
     console.log(`Value: ${ggbApplet.getValue(objName)}`);
   });
   ```

3. **Error Capturing**
   ```javascript
   ggbApplet.setErrorDialogsActive(false);
   const success = ggbApplet.evalCommand("InvalidCommand[]");
   console.log(`Command execution success: ${success}`);
   ```

Remember to refer to the specific reference documentation sections for detailed information on method signatures and parameters.