---
layout: page
title: GeoGebra Apps API Overview
permalink: /developer-guide/geogebra-api/
---

# GeoGebra Apps API Overview

This documentation describes the GeoGebra Apps API to interact with GeoGebra apps. It contains methods and functionality for embedding GeoGebra applets into web pages and controlling them programmatically.

## Contents

1. [Core API Methods](./core-methods.md)
   - Creating objects
   - Setting state of objects
   - Getting state of objects

2. [Construction and UI Controls](./construction-and-ui.md)
   - Construction methods
   - User interface methods

3. [Event Handling](./event-handling.md)
   - Event listeners
   - Client events

4. [File Format and Data Exchange](./file-format-data-exchange.md)
   - XML handling
   - File import/export

5. [File Formats and Scripting](./file-formats-scripting.md)
   - GeoGebra file formats
   - Scripting capabilities

6. [Initialization and API Access](./initialization-and-access.md)
   - Obtaining the API object
   - ES6 module approach

7. [Integration Guide](./integration-guide.md)
   - Step-by-step integration
   - Best practices

8. [Using Reference Materials](./using-reference-materials.md)
   - How to use this documentation
   - Additional resources

## Integration with Blackboard Content Hub

The GeoGebra API is a powerful tool for creating interactive mathematical components for the Blackboard Content Hub. By leveraging this API, you can create rich, interactive educational experiences that can be embedded in Blackboard courses.

For a complete example of GeoGebra integration in the Blackboard Content Hub, see the [Flatland Message component](../../examples/flatland-message.html), which demonstrates:

- Interactive mathematical visualization
- User interaction with mathematical objects
- Real-time feedback based on mathematical conditions
- Responsive design for different screen sizes
- Integration with explanatory content

## Examples

For examples of the GeoGebra Apps API in action, see:

- [Showing & hiding objects with buttons](./integration-guide.md#showing-hiding-objects)
- [Saving & loading state](./file-format-data-exchange.md#saving-loading-state)
- [Listening to update, add, remove events](./event-handling.md#listening-to-events)

## Note on Parameters

Arguments in square brackets can be omitted. For example, in a method signature like `String getValueString(String objName [, boolean useLocalizedInput = true])`, the `useLocalizedInput` parameter is optional and defaults to `true`.

## Getting Started

To get started with GeoGebra integration in your Blackboard Content Hub component:

1. Review the [Integration Guide](./integration-guide.md)
2. Explore the [Core API Methods](./core-methods.md)
3. Learn about [Event Handling](./event-handling.md) for interactive components
4. See the [Flatland Message component](../../examples/flatland-message.html) for a complete example