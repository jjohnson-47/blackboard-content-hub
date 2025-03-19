# Desmos Geometry API v1.10 Reference

## Overview

The Desmos Geometry API v1.10 provides functionality for embedding an interactive geometry tool in web applications. It allows programmatic control over geometric constructions, states, and appearance.

## Quick Start

```javascript
// Include the Desmos API script 
<script src="https://www.desmos.com/api/v1.10/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6"></script>

// Add a container element
<div id="geometry" style="width: 600px; height: 400px;"></div>

// Instantiate the geometry tool
var elt = document.getElementById('geometry');
var geometry = Desmos.Geometry(elt);
```

## Function Index by Domain

### Core Functions
- [Geometry](#geometry) - Create a geometry instance
- [destroy](#destroy) - Clean up geometry resources
- [getState](#getstate) - Get geometry state
- [setState](#setstate) - Restore geometry state
- [setBlank](#setblank) - Clear geometry to blank state
- [setDefaultState](#setdefaultstate) - Set default state for resets

### Image Capture
- [screenshot](#screenshot) - Capture geometry image
- [asyncScreenshot](#asyncscreenshot) - Capture geometry image asynchronously

### Layout
- [resize](#resize) - Resize the geometry view

## Detailed API Documentation

<desmos_api version="1.10" type="Geometry">
  <function name="Geometry">
    <importance>Core</importance>
    <description>Construct a new Geometry instance in the given DOM element. The interactive geometry view will attach to that element. You may create a Geometry with an element not yet in the DOM, but it will not render until the element is added. By default, the instance will auto-detect container resizing and visibility changes at runtime (small performance cost per frame). To manage resizing manually, pass `{autosize: false}` and call `geometry.resize()` on DOM changes. When finished, call `geometry.destroy()` to release resources.</description>
    <parameters>
      <parameter name="element" type="HTMLElement" required="true">
        The container element in which to embed the geometry tool.
      </parameter>
      <parameter name="options" type="Object" required="false">
        Configuration options for the instance. Any GraphingCalculator option can be used (e.g., `expressions`, `settingsMenu`, `border`, etc.), as well as Geometry-specific options like a custom color palette via `colors` or enabling authoring features via `authorFeatures`.
      </parameter>
    </parameters>
    <returns>
      <type>Desmos.Geometry</type>
      <description>A Geometry API instance object used to control the embedded geometry view.</description>
    </returns>
    <examples>
      <example name="basic">
        <code>
// Basic instantiation
var elt = document.getElementById('my-geometry');
var geometry = Desmos.Geometry(elt);
        </code>
        <description>Creating a basic geometry instance with default settings.</description>
      </example>
      <example name="advanced">
        <code>
// Creating an instance before adding to DOM
var tempElt = document.createElement('div');
var tempGeometry = Desmos.Geometry(tempElt);
// Later, append the element to display the geometry
document.body.appendChild(tempElt);
// ... and destroy when done
tempGeometry.destroy();
        </code>
        <description>Creating a geometry instance before adding its element to the DOM.</description>
      </example>
      <example name="options">
        <code>
// Create with custom options
var geometry = Desmos.Geometry(elt, {
  authorFeatures: true,  // Enable advanced authoring tools
  border: false,         // Hide border
  lockViewport: true     // Prevent panning/zooming
});
        </code>
        <description>Creating a geometry instance with specific configuration options.</description>
      </example>
    </examples>
    <errors>
      <e>If `element` is null or not provided, the constructor will fail to initialize properly (the returned object may be undefined or throw an error). Ensure a valid DOM element is passed.</e>
      <e>If the element is not in the DOM at creation, no error is thrown, but the geometry remains invisible until the element is added to document.</e>
      <e>If `autosize` is false and `geometry.resize()` is not called after resizing or showing the element, the viewport may not update (no explicit error, but the content will appear misaligned or blank).</e>
    </errors>
    <related_functions>
      <function>destroy</function>
      <function>resize</function>
    </related_functions>
    <tags>
      <tag>initialization</tag>
      <tag>constructor</tag>
      <tag>geometry</tag>
    </tags>
    <domain>initialization</domain>
    <action>create</action>
    <object>geometry</object>
  </function>

  <function name="destroy">
    <importance>Common</importance>
    <description>Destroys the geometry instance, freeing all listeners and resources associated with it. After calling destroy, the `geometry` object should not be used.</description>
    <parameters></parameters>
    <returns>
      <type>void</type>
      <description>No return value. The instance becomes inert after destruction.</description>
    </returns>
    <examples>
      <example name="basic">
        <code>
// Remove a geometry instance from the DOM and destroy it
geometryElement.remove();
geometry.destroy();
        </code>
        <description>Properly cleaning up a geometry instance when it's no longer needed.</description>
      </example>
    </examples>
    <errors>
      <e>Calling `destroy()` more than once on the same instance has no effect (the instance is already destroyed).</e>
      <e>Failing to call `destroy()` when removing an instance (or on page unload) can lead to memory leaks (no immediate error, but potential performance issues).</e>
    </errors>
    <related_functions>
      <function>Geometry</function>
    </related_functions>
    <tags>
      <tag>cleanup</tag>
      <tag>disposal</tag>
      <tag>memory</tag>
    </tags>
    <domain>initialization</domain>
    <action>delete</action>
    <object>geometry</object>
  </function>

  <function name="getState">
    <importance>Common</importance>
    <description>Returns a JavaScript object representing the current state of the geometry construction. This state can be later used with `Geometry.setState()` to restore the construction. The returned object can be serialized (e.g., via `JSON.stringify`) for storage or transmission. **Note:** The state object should be treated as opaque; modifying it directly may result in an invalid state that cannot be reloaded.</description>
    <parameters></parameters>
    <returns>
      <type>Object</type>
      <description>A JSON-serializable object encapsulating the entire geometry state (construction, tool settings, etc.).</description>
    </returns>
    <examples>
      <example name="basic">
        <code>
// Save the current state of the geometry
var state = geometry.getState();
// e.g., send the state to a server
$.post('/saveState', JSON.stringify(state));
        </code>
        <description>Saving the geometry state for later restoration.</description>
      </example>
      <example name="localStorage">
        <code>
// Save the current state to local storage
function saveGeometryState() {
  var state = geometry.getState();
  localStorage.setItem('geometryState', JSON.stringify(state));
  console.log('Geometry state saved');
}

// Button to trigger save
document.getElementById('save-button').addEventListener('click', saveGeometryState);
        </code>
        <description>Saving the geometry state to browser local storage.</description>
      </example>
    </examples>
    <errors>
      <e>No error is thrown by `getState()`. However, if the state object is later modified by hand, it may become unloadable by `setState()`.</e>
      <e>State objects are version-specific; a state from a different API version might not load correctly in v1.10 (no explicit error, but undefined behavior).</e>
    </errors>
    <related_functions>
      <function>setState</function>
      <function>setBlank</function>
      <function>setDefaultState</function>
    </related_functions>
    <tags>
      <tag>state</tag>
      <tag>save</tag>
      <tag>serialization</tag>
    </tags>
    <domain>state</domain>
    <action>read</action>
    <object>state</object>
  </function>

  <function name="setState">
    <importance>Common</importance>
    <description>Loads a state previously obtained from `Geometry.getState()`, restoring the geometry to that state. This completely replaces the current construction with the given state. An optional options object can control how the state is set.</description>
    <parameters>
      <parameter name="obj" type="Object" required="true">
        A state object as returned by `getState` to load into the geometry.
      </parameter>
      <parameter name="options" type="Object" required="false">
        Options for setting the state. Supported property: `allowUndo` (Boolean, default `false`). If `allowUndo: true`, the action of setting the state will be added to the undo history, allowing the user to undo the state change.
      </parameter>
    </parameters>
    <returns>
      <type>void</type>
      <description>No return value. The geometry is updated to the new state.</description>
    </returns>
    <examples>
      <example name="basic">
        <code>
// Restore a previously saved state
geometry.setState(savedState);
        </code>
        <description>Loading a previously saved geometry state.</description>
      </example>
      <example name="withUndo">
        <code>
// Restore state without clearing undo history
geometry.setState(savedState, { allowUndo: true });
        </code>
        <description>Loading a state while preserving the ability to undo the load operation.</description>
      </example>
      <example name="fromStorage">
        <code>
// Load state from local storage
function loadGeometryState() {
  var stateString = localStorage.getItem('geometryState');
  if (stateString) {
    try {
      var state = JSON.parse(stateString);
      geometry.setState(state);
      console.log('Geometry state loaded');
    } catch (e) {
      console.error('Failed to load geometry state:', e);
    }
  }
}

// Button to trigger load
document.getElementById('load-button').addEventListener('click', loadGeometryState);
        </code>
        <description>Loading a geometry state from browser local storage.</description>
      </example>
    </examples>
    <errors>
      <e>If the provided state object is invalid or from an incompatible source, the geometry may fail to load it (the construction remains unchanged). Make sure to use state objects from the same Geometry API (and version).</e>
      <e>No error is thrown for an invalid state; the tool will simply not reflect the new state if it cannot be applied.</e>
    </errors>
    <related_functions>
      <function>getState</function>
      <function>setBlank</function>
      <function>setDefaultState</function>
    </related_functions>
    <tags>
      <tag>state</tag>
      <tag>load</tag>
      <tag>restore</tag>
    </tags>
    <domain>state</domain>
    <action>update</action>
    <object>state</object>
  </function>

  <function name="setBlank">
    <importance>Common</importance>
    <description>Resets the geometry to a blank state (clears all constructions). This is equivalent to loading an empty state. If an options object is provided, the `allowUndo` option functions the same as in `setState`: if `true`, the clearing action can be undone by the user.</description>
    <parameters>
      <parameter name="options" type="Object" required="false">
        `{ allowUndo: false }` by default. If `allowUndo: true`, the blank reset will be added to undo history (allowing undo).
      </parameter>
    </parameters>
    <returns>
      <type>void</type>
      <description>No return value. The geometry is now empty.</description>
    </returns>
    <examples>
      <example name="basic">
        <code>
// Reset the geometry to an empty state
geometry.setBlank();
        </code>
        <description>Clearing all constructions from the geometry.</description>
      </example>
      <example name="withUndo">
        <code>
// Reset while preserving undo history
geometry.setBlank({ allowUndo: true });
        </code>
        <description>Clearing the geometry while preserving the ability to undo.</description>
      </example>
    </examples>
    <errors>
      <e>Calling `setBlank()` when the construction is already blank will have no effect (no error).</e>
      <e>As with `setState`, an invalid option (non-boolean allowUndo) is ignored.</e>
    </errors>
    <related_functions>
      <function>setState</function>
      <function>getState</function>
      <function>setDefaultState</function>
    </related_functions>
    <tags>
      <tag>state</tag>
      <tag>clear</tag>
      <tag>reset</tag>
    </tags>
    <domain>state</domain>
    <action>update</action>
    <object>geometry</object>
  </function>

  <function name="setDefaultState">
    <importance>Specialized</importance>
    <description>Sets a default state for the geometry and adds a reset button in the UI that allows the user to return to this default configuration. Once a default state is set, the user can click the reset button (↺) to restore that state at any time.</description>
    <parameters>
      <parameter name="obj" type="Object" required="true">
        A state object (from `getState`) to set as the default state.
      </parameter>
    </parameters>
    <returns>
      <type>void</type>
      <description>No return value. The default state is stored internally.</description>
    </returns>
    <examples>
      <example name="basic">
        <code>
// Capture current state and set it as default
var defaultState = geometry.getState();
geometry.setDefaultState(defaultState);
        </code>
        <description>Setting the current state as the default reset point.</description>
      </example>
      <example name="startingPoint">
        <code>
// Create a specific construction, then set it as the default state
geometry.setBlank();
// [Add construction elements programmatically or via user interaction]
// ...
// Once the construction is ready, set it as default
var initialState = geometry.getState();
geometry.setDefaultState(initialState);
// Now users can always return to this state by clicking reset
        </code>
        <description>Setting up a specific construction as the default reset state.</description>
      </example>
    </examples>
    <errors>
      <e>If `obj` is not a valid state, it will not be applied as default (no immediate error).</e>
      <e>Only one default state is active at a time; calling `setDefaultState` again will override the previous default.</e>
    </errors>
    <related_functions>
      <function>getState</function>
      <function>setState</function>
      <function>setBlank</function>
    </related_functions>
    <tags>
      <tag>state</tag>
      <tag>default</tag>
      <tag>reset</tag>
    </tags>
    <domain>state</domain>
    <action>create</action>
    <object>default</object>
  </function>

  <function name="screenshot">
    <importance>Common</importance>
    <description>Captures an image of the current geometry construction and returns it as a PNG data URI string. This allows exporting the drawing as an image. The method can take an optional `opts` object to specify image dimensions and quality.</description>
    <parameters>
      <parameter name="opts" type="Object" required="false">
        Options for screenshot size and quality:
        - **width** (number): Width of the output image in pixels (default: current viewport width).
        - **height** (number): Height of the output image in pixels (default: current viewport height).
        - **targetPixelRatio** (number): Oversampling factor for high-DPI output (default: 1). For example, `2` will generate an image twice the specified width and height, for sharper display on retina screens.
      </parameter>
    </parameters>
    <returns>
      <type>string</type>
      <description>A PNG image encoded as a `data:image/png;base64,...` URI representing the current state of the geometry.</description>
    </returns>
    <examples>
      <example name="basic">
        <code>
// Get a full-size screenshot of the current construction
var imageData = geometry.screenshot();
// imageData is a data URI that can be used as the src of an <img>
        </code>
        <description>Capturing a screenshot at the current size.</description>
      </example>
      <example name="highRes">
        <code>
// Capture a high-resolution thumbnail (200x200 display size, 2x resolution)
var thumbData = geometry.screenshot({ width: 200, height: 200, targetPixelRatio: 2 });
// Create an <img> element to show the thumbnail
var img = document.createElement('img');
img.src = thumbData;
img.width = 200;
img.height = 200;
document.body.appendChild(img);
        </code>
        <description>Creating a high-resolution thumbnail for retina displays.</description>
      </example>
    </examples>
    <errors>
      <e>Large images may be slow or memory-intensive to generate. For very large screenshots, consider using the asynchronous screenshot API to avoid freezing the page.</e>
      <e>If the geometry construction is empty, the screenshot will still produce a valid image (e.g., a blank background) rather than an error.</e>
    </errors>
    <related_functions>
      <function>asyncScreenshot</function>
    </related_functions>
    <tags>
      <tag>image</tag>
      <tag>screenshot</tag>
      <tag>capture</tag>
      <tag>export</tag>
    </tags>
    <domain>export</domain>
    <action>read</action>
    <object>image</object>
  </function>

  <function name="asyncScreenshot">
    <importance>Specialized</importance>
    <description>Captures a screenshot of the geometry asynchronously. Instead of returning the data directly, this method takes a callback that will be invoked when the image is ready (or if an error occurs). Use this for potentially heavy screenshots to avoid blocking the main thread.</description>
    <parameters>
      <parameter name="opts" type="Object" required="false">
        Same options as `screenshot()`: width, height, targetPixelRatio.
      </parameter>
      <parameter name="callback" type="Function" required="true">
        Function to be called when the screenshot is ready. It receives two arguments: an error (null if successful) and the screenshot data (data URI string if successful).
      </parameter>
    </parameters>
    <returns>
      <type>void</type>
      <description>No return value. The result is delivered via the callback.</description>
    </returns>
    <examples>
      <example name="basic">
        <code>
// Capture a large screenshot asynchronously
geometry.asyncScreenshot({ width: 2000, height: 2000 }, function(err, data) {
  if (err) {
    console.error('Screenshot failed:', err);
  } else {
    // Use the data URI
    var img = document.createElement('img');
    img.src = data;
    document.getElementById('screenshot-container').appendChild(img);
  }
});
        </code>
        <description>Asynchronously capturing a large screenshot to avoid freezing the UI.</description>
      </example>
    </examples>
    <errors>
      <e>For extremely large dimensions or on low-memory devices, the screenshot might still fail (the error parameter in the callback will be non-null).</e>
      <e>If calling this method on a geometry that has been destroyed, the callback might never be invoked.</e>
    </errors>
    <related_functions>
      <function>screenshot</function>
    </related_functions>
    <tags>
      <tag>image</tag>
      <tag>screenshot</tag>
      <tag>capture</tag>
      <tag>async</tag>
    </tags>
    <domain>export</domain>
    <action>read</action>
    <object>image</object>
  </function>

  <function name="resize">
    <importance>Specialized</importance>
    <description>Updates the geometry view to match its container's current dimensions. This is only necessary if the instance was created with `autosize: false`, or after changing the visibility or size of the container element in a way that might not trigger automatic resize detection.</description>
    <parameters></parameters>
    <returns>
      <type>void</type>
      <description>No return value. The geometry view is updated to match its container's current size.</description>
    </returns>
    <examples>
      <example name="basic">
        <code>
// After changing the container size, manually trigger resize
geometryContainer.style.width = '800px';
geometryContainer.style.height = '600px';
geometry.resize();
        </code>
        <description>Manually resizing after changing the container dimensions.</description>
      </example>
      <example name="visibility">
        <code>
// When showing a previously hidden element, resize may be needed
document.getElementById('show-geometry').addEventListener('click', function() {
  // Show the container
  document.getElementById('geometry-container').style.display = 'block';
  // Call resize to ensure proper rendering
  geometry.resize();
});
        </code>
        <description>Ensuring proper rendering when making a previously hidden geometry visible.</description>
      </example>
    </examples>
    <errors>
      <e>This method is typically not needed if the geometry was created with `autosize: true` (the default).</e>
      <e>If the container has no dimensions (width or height is 0), the geometry view may not render properly.</e>
    </errors>
    <related_functions>
      <function>Geometry</function>
    </related_functions>
    <tags>
      <tag>layout</tag>
      <tag>resize</tag>
      <tag>render</tag>
    </tags>
    <domain>layout</domain>
    <action>update</action>
    <object>geometry</object>
  </function>
</desmos_api>

## Error Handling

### Common Errors

<desmos_api version="1.10" type="Geometry">
  <error>
    <problem>Missing or invalid API key</problem>
    <description>If the API key is not provided or is incorrect, the Desmos API script may not load, and the Geometry instance will fail to initialize (the global `Desmos` object might be undefined).</description>
    <solution>Include a valid `apiKey` in the script URL. Obtain a production API key from Desmos for your domain and use it instead of the demo key.</solution>
  </error>
  <error>
    <problem>Invalid state object</problem>
    <description>Calling `geometry.setState()` with an object that was not obtained via `getState` (or has been altered) can result in no change to the geometry (the state won't load).</description>
    <solution>Use only untouched state objects returned by `geometry.getState()`. Do not modify state JSON manually. Also ensure the state comes from the same API version.</solution>
  </e>
  <e>
    <problem>Element not attached to DOM</problem>
    <description>If the target element is not in the DOM when `Desmos.Geometry()` is called, the geometry view won't appear.</description>
    <solution>Append the element to the DOM (e.g., using `document.body.appendChild`) before or after instantiating. If using manual sizing (`autosize:false`), call `geometry.resize()` after attaching to render the content.</solution>
  </e>
  <e>
    <problem>Using instance after destroy</problem>
    <description>After `geometry.destroy()` is called, the geometry instance is disposed. Further calls to its methods may throw errors or have no effect.</description>
    <solution>Do not use a geometry object after calling `destroy()`. If needed, create a new `Desmos.Geometry` instance instead.</solution>
  </e>
  <e>
    <problem>Large screenshot failure</problem>
    <description>Requesting an extremely large screenshot (very high `width`/`height` or `targetPixelRatio`) might fail due to browser memory limits. In synchronous mode this could cause a blank result or slow performance.</description>
    <solution>Use the asynchronous screenshot method for large images. For example:
```js
geometry.asyncScreenshot({ width: 5000, height: 5000 }, function(err, data) {
  if (err) {
    console.error('Screenshot failed:', err);
  } else {
    // use data URI
  }
});
```
This non-blocking call will provide an error object if the capture fails.</solution>
  </e>
  <e>
    <problem>Cross-domain embedding</problem>
    <description>If the Geometry tool is embedded in an `<iframe>` from a different origin (domain), the parent page cannot directly call the Geometry API due to the Same-Origin Policy.</description>
    <solution>Use `window.postMessage` to communicate across the boundary. Send messages from the parent to the iframe (and vice versa) and handle them within the iframe to invoke Geometry API calls. Ensure that the target origin is specified in `postMessage` for security. (Alternatively, embed using the API script on the same domain to avoid this issue.)</solution>
  </e>
</desmos_api>

## Integration Context

### Embedding in Iframes

The recommended approach is to embed Desmos Geometry by including the Desmos API script directly in your page (as shown in Quick Start), which runs in the same origin. Direct `<iframe>` embedding of the geometry tool (e.g., an iframe pointing to Desmos) is possible, but you cannot directly call API methods across domains due to browser security.

### Cross-Domain Communication

For cross-domain iframes, use `window.postMessage` to communicate between the parent page and the Desmos iframe. The Geometry API does not have built-in postMessage handlers, so you'll need to implement a message listener inside the iframe that calls the appropriate `geometry` methods. For same-origin (script-embedded) integrations, you can call methods on the `geometry` object directly.

### Responsive Design

By default, the geometry instance auto-resizes with its container. To make the tool responsive, you can set the container's width in relative units (e.g., percentage) and maintain aspect ratio with CSS. If you disable auto-resize (`{autosize: false}`), you **must** call `geometry.resize()` whenever the container's size or visibility changes to update the viewport.

### Multiple Instances

You can create multiple Geometry instances on one page by calling `Desmos.Geometry` on different DOM elements. Each instance runs independently. The performance overhead per instance is minimal, but avoid instantiating extremely many. Remember to call `destroy()` on each instance when removing it to free resources.

### Author Features

To enable advanced authoring tools (e.g., customizing which geometry tools are available), instantiate with `authorFeatures: true` in the options. This exposes UI controls in the settings menu for toggling individual tools. Any custom toolbar configuration made with author features on will be saved in the state and applied when that state is loaded with authorFeatures off (the default). Use this to create activities with a restricted set of tools for end users. If you want the custom toolbar to persist after resets, set a default state with those settings.

## Version Compatibility

Desmos Geometry API v1.10 is the current stable release, built on the same engine as the Graphing Calculator v1.10. Desmos will continue to support API v1.9 (including bug fixes) until v1.11 is released. It is recommended to use the same API version for creating and loading states to ensure compatibility. Always include the version in the API script URL (for example, use `/v1.10/` in the script URL) to avoid breaking changes when upgrading to a new version.