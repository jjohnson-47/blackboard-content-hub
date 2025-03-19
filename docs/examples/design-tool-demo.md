---
layout: page
title: Design Tool Demo
permalink: /examples/design-tool-demo/
---

# Design Tool Demo

The Design Tool Demo is an interactive component that demonstrates UI design implementation principles for educational tools. It provides a practical example of the concepts outlined in the [UI Design Implementation Guide](/blackboard-content-hub/docs/developer-guide/ui-design-implementation/).

<div class="component-preview">
  <iframe src="/blackboard-content-hub/shared/components/design-tool-demo.html" width="100%" height="600px" frameborder="0"></iframe>
</div>

## Features

- **Interactive Canvas**: Draw and manipulate lines on a canvas
- **Selection Tool**: Select and move objects on the canvas
- **Measurement Tool**: Measure distances between points
- **Layer Management**: Control the stacking order of objects
- **Property Controls**: Adjust size, opacity, and color of objects
- **Grid System**: Optional grid with snap-to-grid functionality
- **Responsive Design**: Works on desktop and mobile devices

## Usage

To embed this component in your Blackboard course, use the following HTML:

```html
<iframe 
  src="https://jjohnson-47.github.io/blackboard-content-hub/shared/components/design-tool-demo.html" 
  width="100%" 
  height="600" 
  frameborder="0">
</iframe>
```

## Implementation Details

The Design Tool Demo implements the principles outlined in the [UI Design Implementation Guide](/blackboard-content-hub/docs/developer-guide/ui-design-implementation/), including:

### 1. Tool Purpose and Requirements

The tool is designed to demonstrate UI design principles for educational tools, with a focus on:

- Canvas management for object placement and manipulation
- Measurement functionality for precise distance calculation
- Layer management for controlling object stacking order
- Interactive controls for adjusting object properties

### 2. Layout Planning

The interface is organized into distinct zones:

- **Header**: Contains the title and global actions (undo, clear)
- **Canvas**: The main interactive area where objects are placed and manipulated
- **Tools Panel**: Contains all the tools and controls, organized into collapsible sections
- **Status Bar**: Displays current tool and cursor coordinates

### 3. Core Functionality

#### Canvas Implementation

The canvas is implemented using the HTML5 Canvas API, with custom drawing and interaction handling:

```javascript
// Canvas setup
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Set canvas size to match container
function resizeCanvas() {
  const container = canvas.parentElement;
  canvas.width = container.clientWidth;
  canvas.height = container.clientHeight;
  drawGrid();
  drawObjects();
}
```

#### Measurement Tool

The measurement tool allows users to measure distances between points on the canvas:

```javascript
function handleMouseDown(e) {
  // ...
  if (currentTool === 'measure') {
    if (!measureStart) {
      measureStart = { x, y };
    } else {
      measureEnd = { x, y };
      displayMeasurement();
    }
  }
  // ...
}

function displayMeasurement() {
  if (!measureStart || !measureEnd) return;
  
  // Calculate distance
  const dx = measureEnd.x - measureStart.x;
  const dy = measureEnd.y - measureStart.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  
  // Update measurement display
  measurementDisplay.style.display = 'block';
  measurementDisplay.style.left = ((measureStart.x + measureEnd.x) / 2) + 'px';
  measurementDisplay.style.top = ((measureStart.y + measureEnd.y) / 2 - 30) + 'px';
  measurementDisplay.textContent = `${Math.round(distance)}px`;
  
  // Reset for next measurement
  measureStart = null;
  measureEnd = null;
}
```

#### Layer Management

The tool includes layer management functionality to control the stacking order of objects:

```javascript
// Layer controls
bringForwardBtn.addEventListener('click', function() {
  if (selectedObject) {
    const index = objects.indexOf(selectedObject);
    if (index < objects.length - 1) {
      // Swap with next object
      [objects[index], objects[index + 1]] = [objects[index + 1], objects[index]];
      drawObjects();
    }
  }
});

sendBackwardBtn.addEventListener('click', function() {
  if (selectedObject) {
    const index = objects.indexOf(selectedObject);
    if (index > 0) {
      // Swap with previous object
      [objects[index], objects[index - 1]] = [objects[index - 1], objects[index]];
      drawObjects();
    }
  }
});
```

### 4. Interactive Controls

The tool includes various interactive controls for adjusting object properties:

#### Sliders

Sliders are used for adjusting numeric values like size and opacity:

```javascript
sizeSlider.addEventListener('input', function() {
  currentSize = parseInt(this.value);
  sizeValue.textContent = currentSize;
  
  if (selectedObject) {
    selectedObject.size = currentSize / 10;
    drawObjects();
  }
});
```

#### Toggle Switches

Toggle switches are used for boolean settings like grid display and snap-to-grid:

```javascript
gridToggle.addEventListener('change', function() {
  showGrid = this.checked;
  drawObjects();
});

snapToggle.addEventListener('change', function() {
  snapToGrid = this.checked;
});
```

#### Color Picker

A simple color picker allows users to select from predefined colors:

```javascript
colorOptions.forEach(option => {
  option.addEventListener('click', function() {
    // Update active color
    colorOptions.forEach(opt => opt.classList.remove('active'));
    this.classList.add('active');
    currentColor = this.getAttribute('data-color');
    
    // Update selected object if any
    if (selectedObject) {
      selectedObject.color = currentColor;
      drawObjects();
    }
  });
});
```

### 5. Responsive Design

The tool is designed to work on both desktop and mobile devices:

```css
/* Responsive design */
@media (max-width: 768px) {
  .main-content {
    flex-direction: column;
  }
  
  .tools-panel {
    width: 100%;
    height: 40%;
    border-left: none;
    border-top: 1px solid #e0e0e0;
  }
}
```

## Educational Applications

This design tool demo can be used in various educational contexts:

1. **UI/UX Design Courses**: Demonstrate principles of interface design and user interaction
2. **Computer Graphics Classes**: Illustrate basic canvas drawing and manipulation
3. **Mathematics Education**: Use the measurement tool to explore geometric concepts
4. **Design Thinking Workshops**: Provide a hands-on tool for sketching and ideation

## Accessibility Considerations

The component includes several accessibility features:

- High contrast colors for visibility
- Keyboard navigation for essential functions
- Clear visual feedback for interactive elements
- Text labels alongside icons for clarity

## Browser Compatibility

The Design Tool Demo is compatible with modern browsers that support the HTML5 Canvas API:

- Chrome 50+
- Firefox 50+
- Safari 10+
- Edge 79+

## Source Code

The full source code for this component is available in the [GitHub repository](https://github.com/jjohnson-47/blackboard-content-hub/blob/main/shared/components/design-tool-demo.html).