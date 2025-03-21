---
layout: page
title: The Message
permalink: /examples/the-message
---

# The Message: Derivative Space Adventure

A visual tool for understanding how derivatives and tangent lines work in a 2D coordinate plane through an engaging space-themed scenario. This interactive component helps students visualize the relationship between a curve, its derivative, and tangent lines while solving a practical application problem.

## Features

- Interactive visualization of a parabola (f(x) = x² - 5x + 6)
- Movable "spaceship" point that travels along the curve
- Tangent line visualization that shows the direction the ship is pointing
- Fixed "house" point at (0, 4)
- Slider control for precise positioning of the spaceship
- Real-time feedback on the mathematical relationships
- Visual indication when the solution is found

## Mathematical Concepts

This tool helps students understand:

- The geometric meaning of derivatives as the slope of tangent lines
- How the derivative f'(x) = 2x - 5 relates to the original function f(x) = x² - 5x + 6
- How to find points where a tangent line passes through a specific point
- The application of calculus to solve a practical problem

## Usage

### Basic Embedding

To embed this component in a Blackboard page, use the following iframe code:

```html
<iframe 
  src="https://jjohnson-47.github.io/blackboard-content-hub/shared/components/the-message.html" 
  width="100%" 
  height="600" 
  frameborder="0" 
  allowfullscreen>
</iframe>
```

### Recommended Settings

For optimal viewing experience:
- Minimum width: 800px
- Minimum height: 600px
- Allow fullscreen for better interaction on mobile devices

### Configuration Options

The component accepts the following URL parameters:

- `theme`: Set to `dark` for a space-themed dark mode or `light` for standard mode
- `fontSize`: Set to `small`, `medium`, or `large` to adjust text size

Example with parameters:
```html
<iframe 
  src="https://jjohnson-47.github.io/blackboard-content-hub/shared/components/the-message.html?theme=dark&fontSize=large" 
  width="100%" 
  height="600" 
  frameborder="0" 
  allowfullscreen>
</iframe>
```

## Implementation Details

The component is built using:

- **Desmos Graphing Calculator API v1.10**: For the interactive mathematical visualization
- **HTML/CSS**: For layout and styling
- **JavaScript**: For interactivity and calculations
- **BlackboardComponent**: For iframe communication and configuration

The tool uses the Desmos API to create an interactive graph with a parabola, points, and lines. JavaScript is used to handle the slider control, update the visualization, and provide feedback based on the current position.

## Educational Applications

This component can be used in various educational contexts:

- **Calculus Courses**: Illustrate the concept of derivatives and tangent lines
- **Applied Mathematics**: Demonstrate how calculus can solve real-world problems
- **Physics Classes**: Show how derivatives can represent direction of motion
- **Interactive Homework**: Provide students with a hands-on way to explore mathematical concepts

## Classroom Integration Ideas

1. **Guided Exploration**: Have students use the slider to find the solution points and explain why they work
2. **Extension Questions**: Ask students to modify the equation or house position and predict how it changes the solution
3. **Conceptual Understanding**: Use the visualization to discuss why there are two solution points (±√2)
4. **Problem-Based Learning**: Present the scenario first and have students work out the solution mathematically before using the tool to verify

## Accessibility

The component includes several accessibility features:

- Keyboard navigation support for the slider (arrow keys)
- Clear visual feedback with color changes and text updates
- Text descriptions of mathematical relationships
- Responsive design that works on different devices
- Support for theme preferences (light/dark mode)
- Numerical feedback that doesn't rely solely on visual cues

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Mathematical Solution

For instructors and students interested in the mathematical solution:

1. The ship travels along the parabola f(x) = x² - 5x + 6
2. The derivative is f'(x) = 2x - 5, which gives the slope of the tangent line at any point
3. At position (a, f(a)), the tangent line has equation: y - f(a) = f'(a)(x - a)
4. For the tangent line to pass through (0, 4), we need:
   - 4 - f(a) = f'(a)(0 - a)
   - 4 - (a² - 5a + 6) = (2a - 5)(-a)
   - 4 - a² + 5a - 6 = -2a² + 5a
   - 4 - a² + 5a - 6 + 2a² - 5a = 0
   - a² - 2 = 0
   - a = ±√2

Therefore, the ship will point exactly at the house when x = √2 ≈ 1.414 or x = -√2 ≈ -1.414.
