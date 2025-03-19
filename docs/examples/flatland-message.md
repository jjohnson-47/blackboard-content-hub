---
layout: iframe-detail
title: Dr. Zee's Flatland Message
permalink: /examples/flatland-message
author: Mathematics Department
version: 1.0.0
last_updated: 2025-03-19
tags: 
  - calculus
  - interactive
  - geogebra
  - visualization
description: An interactive component that presents a mathematical problem in Flatland, where Dr. Zee needs to send a message to a square's house while traveling along a parabolic path with a fixed antenna.
iframe_url: /shared/components/flatland-message.html
usage: |
  <iframe 
    src="https://jjohnson-47.github.io/blackboard-content-hub/shared/components/flatland-message.html" 
    width="100%" 
    height="600" 
    frameborder="0" 
    allowfullscreen>
  </iframe>
parameters:
  - name: width
    type: string
    default: "100%"
    description: Width of the iframe (percentage or pixels)
  - name: height
    type: string
    default: "600"
    description: Height of the iframe in pixels
examples:
  - title: Basic Implementation
    code: |
      <iframe 
        src="https://jjohnson-47.github.io/blackboard-content-hub/shared/components/flatland-message.html" 
        width="100%" 
        height="600" 
        frameborder="0" 
        allowfullscreen>
      </iframe>
    description: Standard implementation with recommended dimensions
  - title: Fixed Width Implementation
    code: |
      <iframe 
        src="https://jjohnson-47.github.io/blackboard-content-hub/shared/components/flatland-message.html" 
        width="800px" 
        height="600" 
        frameborder="0" 
        allowfullscreen>
      </iframe>
    description: Implementation with fixed width for consistent display
related_components:
  - title: Design Tool Demo
    url: /examples/design-tool-demo
    iframe_url: /shared/components/design-tool-demo.html
    description: Interactive design tool demonstrating principles of visual design
    tags:
      - design
      - interactive
---

## Overview

The "Flatland Message" component is an interactive GeoGebra-based visualization that demonstrates the application of calculus in solving a geometric problem. Users can explore how the tangent to a curve (representing the direction the ship is pointing) relates to the line connecting the ship to a fixed point (the house).

## Mathematical Concepts

This component demonstrates several important mathematical concepts:

- Derivatives and tangent lines
- Parametric equations and curves
- Geometric problem-solving
- Applications of calculus in physics

## Educational Applications

This component can be used in various educational contexts:

- **Calculus Courses**: Demonstrating applications of derivatives
- **Physics Courses**: Illustrating motion along curves
- **Problem-Solving Workshops**: Teaching mathematical modeling
- **Interactive Assignments**: Engaging students with visual learning

## Features

- **Interactive Visualization**: Drag the ship along the parabola to see how the tangent line changes
- **Real-time Feedback**: Status panel shows current position, slopes, and guidance
- **Multiple Learning Modes**: Problem statement, step-by-step solution, and interactive guide
- **Responsive Design**: Works on desktop and mobile devices
- **Visual Feedback**: Color changes and animations when the correct solution is found

## Implementation Details

The Flatland Message component is built using:

- **HTML/CSS**: For structure and styling
- **JavaScript**: For interactive functionality
- **GeoGebra API**: For mathematical visualization
- **Responsive Design**: Adapts to different screen sizes

The component follows best practices for iframe implementation:
- Uses HTTPS for secure loading of resources
- Implements responsive design principles
- Provides appropriate error handling
- Ensures keyboard navigation works within the iframe

## Accessibility

The component includes several accessibility features:

- High contrast colors for visual elements
- Keyboard navigation support
- Text alternatives for visual information
- Responsive design for different devices

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

If you encounter issues with this component:

- Ensure JavaScript is enabled in your browser
- Check that GeoGebra resources are not blocked by your network
- Try refreshing the page if the applet doesn't load
- For cross-origin issues, refer to the [Cross-Origin Communication]({{ site.baseurl }}/troubleshooting/cross-origin-communication) troubleshooting guide