---
layout: default
title: Calculator API v1.10
nav_order: 2
parent: Desmos API
grand_parent: Developer Guide
---

# Desmos Calculator API v1.10

This page provides comprehensive reference documentation for the Desmos Calculator API v1.10, which allows you to embed and interact with the standard Desmos graphing calculator.

## Initialization and Setup

### Loading the API

```html
<script src="https://www.desmos.com/api/v1.10/calculator.js"></script>
```

### Creating a Calculator Instance

```javascript
const calculator = Desmos.GraphingCalculator(element, options);
```

Where:
- `element` is the DOM element where the calculator will be embedded
- `options` is an optional configuration object

### Configuration Options

```javascript
const options = {
  expressions: true,           // Show the expressions panel
  keypad: true,                // Show the keypad
  settingsMenu: true,          // Show the settings menu
  expressionsTopbar: true,     // Show the expressions topbar
  border: true,                // Show a border around the calculator
  lockViewport: false,         // Prevent users from panning/zooming
  zoomButtons: true,           // Show zoom buttons
  expressionsCollapsed: false, // Collapse the expressions panel
  administerSecretFolders: false, // Enable secret folders
  images: true,                // Allow image uploads
  folders: true,               // Allow folders
  notes: true,                 // Allow notes
  sliders: true,               // Allow sliders
  links: true,                 // Allow links
  distributions: true,         // Allow distributions
  restrictedFunctions: [],     // Functions to restrict
  graphpaper: true,            // Show graph paper
  axes: true,                  // Show axes
  labels: true,                // Show labels
  pointsOfInterest: true,      // Show points of interest
  trace: true,                 // Allow tracing
  showGrid: true,              // Show grid
  showXAxis: true,             // Show x-axis
  showYAxis: true,             // Show y-axis
  xAxisNumbers: true,          // Show x-axis numbers
  yAxisNumbers: true,          // Show y-axis numbers
  polarNumbers: true,          // Show polar numbers
  xAxisStep: 1,                // x-axis step size
  yAxisStep: 1,                // y-axis step size
  xAxisArrowMode: Desmos.AxisArrowModes.BOTH, // x-axis arrow mode
  yAxisArrowMode: Desmos.AxisArrowModes.BOTH, // y-axis arrow mode
  xAxisLabel: '',              // x-axis label
  yAxisLabel: '',              // y-axis label
  xAxisMin: undefined,         // x-axis minimum
  xAxisMax: undefined,         // x-axis maximum
  yAxisMin: undefined,         // y-axis minimum
  yAxisMax: undefined,         // y-axis maximum
  fontSize: Desmos.FontSizes.NORMAL, // Font size
