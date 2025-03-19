I'll create a structured and organized version of the Desmos API documentation optimized for Claude and the Roo agent. I'll start by structuring one API at a time, beginning with the 3D API v1.11, then move on to the Standard API v1.10, and finally the Geometry API v1.10.

Let's begin with creating the master index document followed by the API-specific documentation.

# Desmos API Documentation - Master Index

This master index provides quick navigation to all Desmos API documentation optimized for Claude and the Roo agent.

## API Versions

1. [Desmos 3D API v1.11](#desmos-3d-api-v111)
2. [Desmos Standard API v1.10](#desmos-standard-api-v110)
3. [Desmos Geometry API v1.10](#desmos-geometry-api-v110)

## Query Templates for Roo Agent

### Function Lookup
```
<query>
  <api_version>[1.10|1.11]</api_version>
  <api_type>[3D|Standard|Geometry]</api_type>
  <function>[function_name]</function>
  <aspect>[syntax|parameters|returns|examples|errors|all]</aspect>
</query>
```

### Domain Lookup
```
<query>
  <api_version>[1.10|1.11]</api_version>
  <api_type>[3D|Standard|Geometry]</api_type>
  <domain>[domain_name]</domain>
  <action>[create|read|update|delete]</action>
</query>
```

### Implementation Guide
```
<query>
  <api_version>[1.10|1.11]</api_version>
  <api_type>[3D|Standard|Geometry]</api_type>
  <task>[task_description]</task>
  <format>[step_by_step|code_only|explanation_with_code]</format>
</query>
```

### Error Resolution
```
<query>
  <api_version>[1.10|1.11]</api_version>
  <api_type>[3D|Standard|Geometry]</api_type>
  <error>[error_description]</error>
</query>
```

---

# Desmos 3D API v1.11

## Overview

The Desmos 3D API v1.11 enables embedding an interactive 3D graphing calculator in web applications. This API is designed to display and manipulate 3D mathematical visualizations with a consistent interface similar to the 2D Graphing Calculator.

## Quick Start

```javascript
// Include the Desmos API script
<script src="https://www.desmos.com/api/v1.11/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6"></script>

// Add a container element
<div id="calculator" style="width: 600px; height: 400px;"></div>

// Instantiate the 3D calculator
var elt = document.getElementById('calculator');
var calculator = Desmos.Calculator3D(elt);
```

## Function Index by Domain

### Core Functions
- [Calculator3D](#calculator3d) - Create a 3D calculator instance
- [destroy](#destroy) - Remove calculator and free resources
- [getState](#getstate) - Get calculator state
- [setState](#setstate) - Restore calculator state
- [setBlank](#setblank) - Clear calculator to blank state

### Expression Management
- [setExpression](#setexpression) - Add or update an expression
- [setExpressions](#setexpressions) - Add or update multiple expressions
- [removeExpression](#removeexpression) - Remove an expression
- [removeExpressions](#removeexpressions) - Remove multiple expressions
- [getExpressions](#getexpressions) - Get all expressions
- [expressionAnalysis](#expressionanalysis) - Get analysis of expressions

### Event Handling
- [observeEvent](#observeevent) - Register event callback
- [unobserveEvent](#unobserveevent) - Remove event callback
- [observe](#observe) - Observe property changes
- [unobserve](#unobserve) - Stop observing property

### Viewport Management
- [setMathBounds](#setmathbounds) - Set visible region
- [mathToPixels](#mathtopixels) - Convert math to pixel coordinates
- [pixelsToMath](#pixelstomath) - Convert pixel to math coordinates
- [graphpaperBounds](#graphpaperbounds) - Get current bounds

### UI Interaction
- [updateSettings](#updatesettings) - Change calculator settings
- [focusFirstExpression](#focusfirstexpression) - Focus first expression
- [openKeypad](#openkeypad) - Open on-screen keypad

### History Management
- [undo](#undo) - Undo last action
- [redo](#redo) - Redo previously undone action
- [clearHistory](#clearhistory) - Clear undo/redo history
- [withHistoryReplacement](#withhistoryreplacement) - Merge multiple changes

### Image Capture
- [screenshot](#screenshot) - Capture calculator image
- [asyncScreenshot](#asyncscreenshot) - Capture calculator image asynchronously