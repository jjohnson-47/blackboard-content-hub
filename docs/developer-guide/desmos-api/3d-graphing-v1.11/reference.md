# Desmos 3D API v1.11 Reference

## Core Functions

<desmos_api version="1.11" type="3D">
  <function name="Calculator3D">
    <importance>Core</importance>
    <description>Creates a new 3D graphing calculator instance inside the given DOM element. This is the entry point for embedding a Desmos 3D graph. You can create the calculator before adding the element to the DOM (the graph will render once it's attached). By default the calculator auto-sizes to fill its container, unless overridden by options.</description>
    <parameters>
      <parameter name="element" type="HTMLElement" required="true">
        The HTML container element (typically a `<div>`) in which the 3D calculator will be rendered.
      </parameter>
      <parameter name="options" type="Object" required="false">
        An optional settings object specifying which features to enable or disable. It can include any of the settings available to a 2D Desmos GraphingCalculator (e.g. show/hide UI components, graph configurations).
      </parameter>
    </parameters>
    <returns>
      <type>Calculator3D</type>
      <description>A `Calculator3D` object that provides the API for controlling the embedded 3D calculator.</description>
    </returns>
    <examples>
      <example name="basic">
        <code>
// Basic initialization
var elt = document.getElementById('my-calculator');
var calculator = Desmos.Calculator3D(elt);
        </code>
        <description>Basic initialization of a 3D calculator in an existing element.</description>
      </example>
      <example name="advanced">
        <code>
// Creating a calculator that's initially not in the DOM
var tempElt = document.createElement('div');
var calc = Desmos.Calculator3D(tempElt, { autosize: false });
// ... later, attach it to the DOM
document.body.appendChild(tempElt);
calc.resize(); // manually size since autosize was false
// When finished with this calculator:
calc.destroy();
        </code>
        <description>Creating a calculator with an element not yet in the DOM and manual sizing.</description>
      </example>
    </examples>
    <errors>
      <error>If the `element` is not a valid DOM element or is `null`, the constructor cannot initialize the calculator. Ensure you pass a real element (e.g., result of `document.getElementById`).</error>
      <error>If no graph appears, verify that the container element is inserted into the DOM and has a valid size (width/height). The calculator only renders when attached to the DOM. For manual sizing, use the `autosize: false` option and call `resize()` after changing the element's size or attaching to DOM.</error>
      <error>Remember to call `destroy()` on the Calculator3D instance when you no longer need it. Not doing so can lead to memory leaks (event listeners staying active).</error>
    </errors>
    <related_functions>
      <function>destroy</function>
      <function>resize</function>
      <function>setState</function>
    </related_functions>
    <tags>
      <tag>initialization</tag>
      <tag>constructor</tag>
      <tag>3D</tag>
      <tag>calculator</tag>
    </tags>
    <domain>initialization</domain>
    <action>create</action>
    <object>calculator</object>
  </function>

  <function name="getExpressions">
    <importance>Common</importance>
    <description>Retrieves a list of all current expressions and items in the calculator. It returns an array of objects, where each object is in the same format that would be used to add that expression (with properties like id, latex, etc.).</description>
    <parameters></parameters>
    <returns>
      <type>Array<Object></type>
      <description>An array of expression state objects, representing each item in the expressions list. Each object can be used with `setExpression` to recreate that item.</description>
    </returns>
    <examples>
      <example name="basic">
        <code>
// Get all expressions currently in the calculator
var exprList = calculator.getExpressions();
console.log(exprList);
        </code>
        <description>Retrieving all expressions from the calculator.</description>
      </example>
    </examples>
    <errors>
      <e>This method should not fail under normal conditions. It will return an empty array if there are no expressions.</e>
      <e>If you modify the returned array or its objects, it will not affect the calculator until you pass them back via setExpression(s). The returned array is a snapshot, not a live binding.</e>
    </errors>
    <related_functions>
      <function>setExpression</function>
      <function>setExpressions</function>
      <function>expressionAnalysis</function>
    </related_functions>
    <tags>
      <tag>expression</tag>
      <tag>list</tag>
      <tag>get</tag>
    </tags>
    <domain>expressions</domain>
    <action>read</action>
    <object>expression</object>
  </function>

  <function name="expressionAnalysis">
    <importance>Specialized</importance>
    <description>An object containing analysis information for each expression. It maps each expression's id to details about that expression's current status (e.g., whether it graphs something, whether it has an error, and any numeric evaluation). This property is updated asynchronously as expressions are evaluated.</description>
    <parameters></parameters>
    <returns>
      <type>Object</type>
      <description>Returns an object where keys are expression ids and values are objects with fields: `isGraphable` (boolean), `isError` (boolean), `errorMessage` (string, if there's an error), `evaluation` (object with numeric value(s), if applicable), and `evaluationDisplayed` (boolean). This is an *observable* property.</description>
    </returns>
    <examples>
      <example name="observer">
        <code>
// Observing expressionAnalysis to log errors
calculator.observe('expressionAnalysis', function() {
  for(var id in calculator.expressionAnalysis) {
    var info = calculator.expressionAnalysis[id];
    if(info.isError) {
      console.warn('Expression', id, 'error:', info.errorMessage);
    }
  }
});
        </code>
        <description>Setting up an observer to monitor expression errors.</description>
      </example>
      <example name="direct">
        <code>
// Accessing analysis directly (may be initial or stale if not observed continuously)
var analysis = calculator.expressionAnalysis;
if(analysis['line1'] && analysis['line1'].evaluation) {
  console.log('line1 value =', analysis['line1'].evaluation.value);
}
        </code>
        <description>Directly accessing the analysis information for a specific expression.</description>
      </example>
    </examples>
    <errors>
      <e>Because `expressionAnalysis` updates asynchronously, reading it immediately after setting expressions may not reflect the latest state. If you need up-to-date info, use `calculator.observe('expressionAnalysis', ...)` to react to changes.</e>
      <e>The `errorMessage` strings are localized. They describe issues like syntax errors or undefined variables in the expression.</e>
    </errors>
    <related_functions>
      <function>setExpression</function>
      <function>getExpressions</function>
      <function>observe</function>
    </related_functions>
    <tags>
      <tag>expression</tag>
      <tag>analysis</tag>
      <tag>error</tag>
      <tag>evaluation</tag>
    </tags>
    <domain>expressions</domain>
    <action>read</action>
    <object>analysis</object>
  </function>
</desmos_api>

## Event Handling

<desmos_api version="1.11" type="3D">
  <function name="observeEvent">
    <importance>Common</importance>
    <description>Attaches an event listener for a specific calculator event. The primary event available is `'change'`, which fires whenever the graph state changes (due to user interaction or API calls). Using observeEvent allows you to respond to these changes, such as auto-saving or syncing with other UI.</description>
    <parameters>
      <parameter name="eventName" type="String" required="true">
        The name of the event to observe. Currently supported: `'change'` (also `'change.something'` for namespacing, see examples).
      </parameter>
      <parameter name="callback" type="Function" required="true">
        A function to execute when the event occurs. It receives two arguments: the event name and an event info object. For `'change'` events, the info object has a boolean `isUserInitiated` property indicating if the change came from user interaction (`true`) or from code (`false`).
      </parameter>
    </parameters>
    <returns>
      <type>void</type>
      <description>No return value. The callback is now registered to fire on the specified event.</description>
    </returns>
    <examples>
      <example name="basic">
        <code>
// Log and save state whenever the graph changes
calculator.observeEvent('change', function(eventName, event) {
  console.log('Graph changed');
  if(event.isUserInitiated) {
    saveGraphState(calculator.getState());
  }
});
        </code>
        <description>Setting up a basic change observer.</description>
      </example>
      <example name="namespaced">
        <code>
// Using namespaced events for fine-grained control
calculator.observeEvent('change.autosave', onAutoSave);
calculator.observeEvent('change.analytics', onAnalytics);
// Later, you can remove one set of observers by namespace:
calculator.unobserveEvent('change.autosave');
        </code>
        <description>Using namespaced event observers for better organization.</description>
      </example>
    </examples>
    <errors>
      <e>Using an unsupported event name will have no effect. (No error is thrown, but your callback won't ever be called.) Ensure the event name is correct (`'change'` is the standard event).</e>
      <e>Be careful not to do heavy processing in the callback without throttling or debouncing, as `'change'` can fire frequently (for example, during real-time user input).</e>
    </errors>
    <related_functions>
      <function>unobserveEvent</function>
      <function>observe</function>
    </related_functions>
    <tags>
      <tag>event</tag>
      <tag>observe</tag>
      <tag>listener</tag>
      <tag>callback</tag>
    </tags>
    <domain>events</domain>
    <action>create</action>
    <object>observer</object>
  </function>

  <function name="unobserveEvent">
    <importance>Specialized</importance>
    <description>Removes event listeners that were added via observeEvent. If a namespace was used in the event name, this can remove only those specific listeners. Without a namespace, it removes all listeners for that event.</description>
    <parameters>
      <parameter name="eventName" type="String" required="true">
        The event name whose observers should be removed. Use the same string that was passed to observeEvent. For example, `'change'` to remove all change observers, or `'change.namespace'` to remove only those with a particular namespace.
      </parameter>
    </parameters>
    <returns>
      <type>void</type>
      <description>No return value. The specified observers (if any) are removed.</description>
    </returns>
    <examples>
      <example name="all">
        <code>
// Remove all observers for the 'change' event
calculator.unobserveEvent('change');
        </code>
        <description>Removing all observers for a specific event.</description>
      </example>
      <example name="namespaced">
        <code>
// Remove only observers with the namespace 'autosave'
calculator.unobserveEvent('change.autosave');
        </code>
        <description>Removing only specific namespaced observers.</description>
      </example>
    </examples>
    <errors>
      <e>Calling unobserveEvent for an event that has no listeners or a namespace that doesn't exist will do nothing (no error).</e>
      <e>Be precise with the event string. Using a namespace in unobserveEvent will only remove callbacks that were registered with that same namespace.</e>
    </errors>
    <related_functions>
      <function>observeEvent</function>
    </related_functions>
    <tags>
      <tag>event</tag>
      <tag>observe</tag>
      <tag>remove</tag>
      <tag>listener</tag>
    </tags>
    <domain>events</domain>
    <action>delete</action>
    <object>observer</object>
  </function>

  <function name="observe">
    <importance>Common</importance>
    <description>Observes changes to a specific property of the calculator. When the property's value changes, the provided callback function is called. This is used for watching properties like `graphpaperBounds` or `expressionAnalysis` that change over time.</description>
    <parameters>
      <parameter name="propertyName" type="String" required="true">
        The name of the property to observe (e.g., 'graphpaperBounds', 'expressionAnalysis'). Can include a namespace (e.g., 'graphpaperBounds.viewport').
      </parameter>
      <parameter name="callback" type="Function" required="true">
        Function to be called when the property changes. It receives no arguments, but can access the current property value via the calculator object.
      </parameter>
    </parameters>
    <returns>
      <type>void</type>
      <description>No return value. The callback is registered to be called when the property changes.</description>
    </returns>
    <examples>
      <example name="basic">
        <code>
// Watch for changes to the graph boundaries
calculator.observe('graphpaperBounds', function() {
  var bounds = calculator.graphpaperBounds.mathCoordinates;
  console.log('View changed:', bounds.left, bounds.right, bounds.top, bounds.bottom);
});
        </code>
        <description>Setting up an observer for viewport changes.</description>
      </example>
    </examples>
    <errors>
      <e>If you observe a property that doesn't exist or isn't observable, your callback will never be called (no error is thrown).</e>
      <e>As with events, be careful with computation-heavy callbacks as they can affect performance, especially for frequently-changing properties.</e>
    </errors>
    <related_functions>
      <function>unobserve</function>
      <function>observeEvent</function>
    </related_functions>
    <tags>
      <tag>property</tag>
      <tag>observe</tag>
      <tag>callback</tag>
      <tag>watch</tag>
    </tags>
    <domain>properties</domain>
    <action>create</action>
    <object>observer</object>
  </function>

  <function name="unobserve">
    <importance>Specialized</importance>
    <description>Removes property observers that were previously registered with `observe`. Like `unobserveEvent`, this can target specific namespaced observers or remove all observers for a property.</description>
    <parameters>
      <parameter name="propertyName" type="String" required="true">
        The name of the property to stop observing. Use the same string that was passed to `observe`, including any namespace if applicable.
      </parameter>
    </parameters>
    <returns>
      <type>void</type>
      <description>No return value. The specified observers (if any) are removed.</description>
    </returns>
    <examples>
      <example name="basic">
        <code>
// Stop watching for graphpaper bounds changes
calculator.unobserve('graphpaperBounds');
        </code>
        <description>Removing all observers for a property.</description>
      </example>
      <example name="namespaced">
        <code>
// Only remove observers with the 'viewport' namespace
calculator.unobserve('graphpaperBounds.viewport');
        </code>
        <description>Removing only specific namespaced observers.</description>
      </example>
    </examples>
    <errors>
      <e>Calling unobserve for a property or namespace that has no observers will do nothing (no error).</e>
      <e>As with unobserveEvent, be precise with the property name and namespace to target the specific observers you want to remove.</e>
    </errors>
    <related_functions>
      <function>observe</function>
      <function>unobserveEvent</function>
    </related_functions>
    <tags>
      <tag>property</tag>
      <tag>observe</tag>
      <tag>remove</tag>
      <tag>watch</tag>
    </tags>
    <domain>properties</domain>
    <action>delete</action>
    <object>observer</object>
  </function>
</desmos_api>

## Viewport Management

<desmos_api version="1.11" type="3D">
  <function name="updateSettings">
    <importance>Common</importance>
    <description>Updates one or more calculator settings on the fly. This can show/hide UI components or change graph appearance settings (like axis labels, degree/radian mode, etc.). Only the settings provided in the object will be changed; other settings remain unchanged.</description>
    <parameters>
      <parameter name="settings" type="Object" required="true">
        An object specifying which settings to update and their new values. For example: `{ projectorMode: true, xAxisLabel: 'Time' }`. Any setting available in the constructor options can be changed here.
      </parameter>
    </parameters>
    <returns>
      <type>void</type>
      <description>No return value. The calculator updates to reflect the new settings immediately.</description>
    </returns>
    <examples>
      <example name="ui">
        <code>
// Turn on projector mode (high-contrast)
calculator.updateSettings({ projectorMode: true });

// Change axis labels
calculator.updateSettings({ xAxisLabel: 'x', yAxisLabel: 'f(x)' });
        </code>
        <description>Adjusting display settings for presentation or clarity.</description>
      </example>
      <example name="panels">
        <code>
// Hide the expressions list panel
calculator.updateSettings({ expressions: false });

// Then later show it again
calculator.updateSettings({ expressions: true });
        </code>
        <description>Toggling UI panel visibility.</description>
      </example>
    </examples>
    <errors>
      <e>If a combination of settings is incompatible, the calculator may ignore or adjust some settings to maintain a valid state. (For example, enabling `lockViewport` while `zoomButtons` are true - one will be automatically adjusted.) Check the documentation for incompatible combinations.</e>
      <e>Providing an invalid setting name or value in the object will simply have no effect (no error thrown). Double-check spelling and types of each setting property.</e>
    </errors>
    <related_functions>
      <function>setGraphSettings</function>
      <function>setMathBounds</function>
    </related_functions>
    <tags>
      <tag>settings</tag>
      <tag>configuration</tag>
      <tag>ui</tag>
      <tag>appearance</tag>
    </tags>
    <domain>settings</domain>
    <action>update</action>
    <object>settings</object>
  </function>

  <function name="setGraphSettings">
    <importance>Specialized</importance>
    <description>_**Deprecated.**_ Former method to update graph settings, now replaced by `updateSettings`. It functions similarly to updateSettings by applying provided settings, but using this is no longer recommended.</description>
    <parameters>
      <parameter name="settings" type="Object" required="true">
        Settings object (same as in updateSettings) specifying changes to make. Only included for backward compatibility.
      </parameter>
    </parameters>
    <returns>
      <type>void</type>
      <description>No return value. Settings are updated (with same behavior as updateSettings).</description>
    </returns>
    <examples>
      <example name="deprecated">
        <code>
// (Deprecated usage) Update settings
calculator.setGraphSettings({ xAxisLabel: 'Time' });
        </code>
        <description>Deprecated way to update settings (use updateSettings instead).</description>
      </example>
    </examples>
    <errors>
      <e>This method is deprecated and may be removed in a future release. No specific runtime errors, but prefer `updateSettings` to ensure forward compatibility.</e>
    </errors>
    <related_functions>
      <function>updateSettings</function>
    </related_functions>
    <tags>
      <tag>settings</tag>
      <tag>deprecated</tag>
      <tag>configuration</tag>
    </tags>
    <domain>settings</domain>
    <action>update</action>
    <object>settings</object>
  </function>

  <function name="setMathBounds">
    <importance>Common</importance>
    <description>Programmatically sets the visible region of the graph (the math coordinate bounds of the graphpaper). You provide an object with `left`, `right`, `bottom`, and `top` values specifying the desired view in math coordinates. This is useful to zoom or pan the view to specific ranges.</description>
    <parameters>
      <parameter name="bounds" type="Object" required="true">
        An object with numeric properties `left`, `right`, `top`, and `bottom` defining the math coordinates of the new viewport. For example: `{ left: -10, right: 10, top: 5, bottom: -5 }`.
      </parameter>
    </parameters>
    <returns>
      <type>void</type>
      <description>No return value. The graph viewport is adjusted to the specified bounds.</description>
    </returns>
    <examples>
      <example name="basic">
        <code>
// Set the view to x from 0 to 10, y from 0 to 10 (first quadrant)
calculator.setMathBounds({ left: 0, right: 10, bottom: 0, top: 10 });
        </code>
        <description>Setting the viewport to a specific region.</description>
      </example>
    </examples>
    <errors>
      <e>If the bounds values are invalid (e.g., `right <= left` or `top <= bottom`), the viewport will not change. The API will ignore the call (and may log a warning to the console). Ensure the bounds define a valid rectangle with left < right and bottom < top.</e>
      <e>Bounds must be finite numbers. Passing `Infinity` or `NaN` will be treated as invalid.</e>
    </errors>
    <related_functions>
      <function>graphpaperBounds</function>
      <function>mathToPixels</function>
      <function>pixelsToMath</function>
    </related_functions>
    <tags>
      <tag>viewport</tag>
      <tag>zoom</tag>
      <tag>pan</tag>
      <tag>bounds</tag>
    </tags>
    <domain>viewport</domain>
    <action>update</action>
    <object>viewport</object>
  </function>

  <function name="graphpaperBounds">
    <importance>Specialized</importance>
    <description>An object that reflects the current bounds of the graphpaper in both math and pixel coordinates. It includes the current `left`, `right`, `top`, `bottom` values in math coordinates, as well as the pixel dimensions of the graph area. This property is useful for tracking the viewport or synchronizing external annotations with the graph.</description>
    <parameters></parameters>
    <returns>
      <type>Object</type>
      <description>Returns an object of the form `{ mathCoordinates: {left, right, top, bottom, width, height}, pixelCoordinates: {left, right, top, bottom, width, height} }`. The mathCoordinates describe the current visible math viewport, and pixelCoordinates describe the pixel size and position of that viewport within the page.</description>
    </returns>
    <examples>
      <example name="aspect">
        <code>
// Example: calculate aspect ratio whenever the view changes
calculator.observe('graphpaperBounds', function() {
  var gp = calculator.graphpaperBounds;
  var aspect = (gp.pixelCoordinates.height / gp.pixelCoordinates.width) / (Math.abs(gp.mathCoordinates.top - gp.mathCoordinates.bottom) / Math.abs(gp.mathCoordinates.right - gp.mathCoordinates.left));
  console.log('Aspect ratio (pixel per math unit):', aspect);
});
        </code>
        <description>Monitoring aspect ratio changes in the viewport.</description>
      </example>
    </examples>
    <errors>
      <e>This property is updated dynamically; reading it is always safe. If you need continuous updates, use `calculator.observe('graphpaperBounds', ...)` as shown in the example to get notified of changes.</e>
      <e>Note: `pixelCoordinates` are relative to the top-left of the calculator's container element. Also remember in mathCoordinates, `top` is greater than `bottom` (y-axis increases upward), which is opposite of pixel coordinates (y increases downward).</e>
    </errors>
    <related_functions>
      <function>setMathBounds</function>
      <function>mathToPixels</function>
      <function>pixelsToMath</function>
    </related_functions>
    <tags>
      <tag>viewport</tag>
      <tag>bounds</tag>
      <tag>coordinates</tag>
      <tag>dimensions</tag>
    </tags>
    <domain>viewport</domain>
    <action>read</action>
    <object>viewport</object>
  </function>

  <function name="mathToPixels">
    <importance>Specialized</importance>
    <description>Converts coordinates in math space (graph coordinates) to pixel coordinates relative to the graphpaper. This is useful if you need to align or position HTML elements on top of the graph at specific math coordinates.</description>
    <parameters>
      <parameter name="coords" type="Object" required="true">
        An object with numeric `x` and/or `y` properties representing a point or partial point in math coordinates. You can supply just x, just y, or both.
      </parameter>
    </parameters>
    <returns>
      <type>Object</type>
      <description>An object with `x` and/or `y` (matching the provided keys) giving the pixel coordinate corresponding to the given math coordinate(s). These pixel values are relative to the top-left of the calculator's container.</description>
    </returns>
    <examples>
      <example name="basic">
        <code>
// Get pixel position of the origin (0,0)
var pix = calculator.mathToPixels({ x: 0, y: 0 });
console.log(pix.x, pix.y);
        </code>
        <description>Converting math coordinates to pixel coordinates.</description>
      </example>
      <example name="partial">
        <code>
// If you only give one coordinate, only that axis is converted
var pixY = calculator.mathToPixels({ y: 5 }); // get pixel y for math y=5 (uses current x)
        </code>
        <description>Converting only one coordinate at a time.</description>
      </example>
    </examples>
    <errors>
      <e>Ensure the input object has an `x` or `y` property (or both). If none are provided, the function returns an empty object.</e>
      <e>The conversion depends on the current graphpaper view. If the calculator's bounds change (zoom/pan), the same math point will correspond to different pixel values.</e>
    </errors>
    <related_functions>
      <function>pixelsToMath</function>
      <function>graphpaperBounds</function>
    </related_functions>
    <tags>
      <tag>conversion</tag>
      <tag>coordinates</tag>
      <tag>math</tag>
      <tag>pixels</tag>
    </tags>
    <domain>coordinates</domain>
    <action>calculate</action>
    <object>coordinates</object>
  </function>

  <function name="pixelsToMath">
    <importance>Specialized</importance>
    <description>Converts pixel coordinates (relative to the calculator's container) into math coordinates on the graph. This is effectively the inverse of mathToPixels. Useful for mapping mouse or touch screen positions to math coordinates.</description>
    <parameters>
      <parameter name="coords" type="Object" required="true">
        An object with numeric `x` and/or `y` properties representing coordinates in pixels relative to the top-left corner of the calculator's container element.
      </parameter>
    </parameters>
    <returns>
      <type>Object</type>
      <description>An object with `x` and/or `y` (whichever were provided) representing the corresponding coordinates in the math space of the graph.</description>
    </returns>
    <examples>
      <example name="mouseEvent">
        <code>
// Convert a mouse event's position to math coordinates
var rect = elt.getBoundingClientRect();
document.addEventListener('click', function(e) {
  var mathPoint = calculator.pixelsToMath({
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  });
  console.log('Clicked at math coords:', mathPoint);
});
        </code>
        <description>Converting mouse click positions to math coordinates.</description>
      </example>
    </examples>
    <errors>
      <e>As with mathToPixels, provide at least one of x or y in the input object. If neither is present, the result will be an empty object.</e>
      <e>The accuracy of the conversion depends on the current `graphpaperBounds`. If the graph is resized or zoomed after getting pixel values, reconvert as needed.</e>
    </errors>
    <related_functions>
      <function>mathToPixels</function>
      <function>graphpaperBounds</function>
    </related_functions>
    <tags>
      <tag>conversion</tag>
      <tag>coordinates</tag>
      <tag>math</tag>
      <tag>pixels</tag>
    </tags>
    <domain>coordinates</domain>
    <action>calculate</action>
    <object>coordinates</object>
  </function>
</desmos_api>

## UI Interaction

<desmos_api version="1.11" type="3D">
  <function name="focusFirstExpression">
    <importance>Specialized</importance>
    <description>Sets keyboard focus to the first expression in the expressions list. This causes the first expression to be highlighted and ready for editing (with the onscreen or physical keyboard). If no expressions exist, this may create a blank expression to focus.</description>
    <parameters></parameters>
    <returns>
      <type>void</type>
      <description>No return value. The first expression (if any) is now focused.</description>
    </returns>
    <examples>
      <example name="basic">
        <code>
// Focus the first expression so the user can start typing
calculator.focusFirstExpression();
        </code>
        <description>Setting focus to the first expression for immediate editing.</description>
      </example>
    </examples>
    <errors>
      <e>If the expressions list is empty, focusing will simply result in no effect or the creation of an empty expression depending on internal behavior (no error thrown).</e>
      <e>This method should typically be used in conjunction with user interactions; focusing an expression programmatically might cause the page to scroll if the calculator is out of view.</e>
    </errors>
    <related_functions>
      <function>openKeypad</function>
    </related_functions>
    <tags>
      <tag>focus</tag>
      <tag>expressions</tag>
      <tag>ui</tag>
      <tag>input</tag>
    </tags>
    <domain>ui</domain>
    <action>update</action>
    <object>focus</object>
  </function>

  <function name="openKeypad">
    <importance>Specialized</importance>
    <description>Opens the on-screen keypad of the calculator. This is equivalent to the user clicking the keypad icon. If no expression is currently focused when this is called, it will focus the first expression so that the keypad has a target for input.</description>
    <parameters></parameters>
    <returns>
      <type>void</type>
      <description>No return value. The on-screen keypad is now visible (if it was enabled in settings).</description>
    </returns>
    <examples>
      <example name="basic">
        <code>
// Programmatically open the Desmos keypad
calculator.openKeypad();
        </code>
        <description>Opening the on-screen keypad for user input.</description>
      </example>
    </examples>
    <errors>
      <e>If the calculator was initialized with `keypad: false` (to hide the keypad), calling `openKeypad()` will have no effect (no error, it just won't open).</e>
      <e>The keypad will remain open until manually closed by the user (there is no direct API call to close it). If you need to ensure it's closed, you might update settings to `keypad: false` then back to true as a workaround.</e>
    </errors>
    <related_functions>
      <function>focusFirstExpression</function>
    </related_functions>
    <tags>
      <tag>keypad</tag>
      <tag>keyboard</tag>
      <tag>ui</tag>
      <tag>input</tag>
    </tags>
    <domain>ui</domain>
    <action>update</action>
    <object>keypad</object>
  </function>
</desmos_api>

## Image Capture

<desmos_api version="1.11" type="3D">
  <function name="screenshot">
    <importance>Specialized</importance>
    <description>Captures the current graph display as an image. It returns a PNG image encoded as a data URL (a base64 string representing the image). This is useful for generating a static snapshot of the graph.</description>
    <parameters>
      <parameter name="options" type="Object" required="false">
        Optional screenshot settings. For example, `{ width: 500, height: 500 }` can specify the image dimensions, or `{ mathBounds: {...} }` to capture a specific region. If omitted, defaults to the current graph viewport size and bounds.
      </parameter>
    </parameters>
    <returns>
      <type>String</type>
      <description>A Data URI string containing the PNG image of the graph.</description>
    </returns>
    <examples>
      <example name="basic">
        <code>
// Get an image of the current graph
var imageData = calculator.screenshot();
// You can set this as an <img> src or download it
console.log("Image data URL length:", imageData.length);
        </code>
        <description>Capturing the current graph as a PNG image.</description>
      </example>
    </examples>
    <errors>
      <e>If the graph contains external images or content that violate canvas cross-origin rules, `screenshot()` might fail to produce a result (the browser will block the canvas extraction). Ensure any images added to the graph have appropriate CORS settings (or are from the same domain) to be included in the screenshot.</e>
      <e>Large graphs or high-resolution screenshots can result in very large data URLs or memory usage. If the result is too large, consider using `asyncScreenshot` to avoid blocking the UI.</e>
    </errors>
    <related_functions>
      <function>asyncScreenshot</function>
    </related_functions>
    <tags>
      <tag>image</tag>
      <tag>screenshot</tag>
      <tag>capture</tag>
      <tag>png</tag>
    </tags>
    <domain>export</domain>
    <action>read</action>
    <object>image</object>
  </function>

  <function name="asyncScreenshot">
    <importance>Specialized</importance>
    <description>Generates a screenshot of the current graph asynchronously. Instead of returning the data directly, this method takes a callback that will be invoked when the image is ready (or if an error occurs). Use this for potentially heavy screenshots to avoid blocking the main thread.</description>
    <parameters>
      <parameter name="options" type="Object" required="false">
        Optional screenshot settings (same as in `screenshot` for specifying width, height, mathBounds, etc.).
      </parameter>
      <parameter name="callback" type="Function" required="true">
        A function to call when the screenshot is generated. It will be called with two arguments: an error (if the screenshot failed) and the data URL string (if successful). Only one of those arguments will be non-null.
      </parameter>
    </parameters>
    <returns>
      <type>void</type>
      <description>No return value. The result is delivered via the callback.</description>
    </returns>
    <examples>
      <example name="basic">
        <code>
// Capture screenshot without freezing the UI
calculator.asyncScreenshot({}, function(error, dataUrl) {
  if(error) {
    console.error("Screenshot failed:", error);
  } else {
    // Use the dataUrl (PNG image string)
    var img = document.createElement('img');
    img.src = dataUrl;
    document.body.appendChild(img);
  }
});
        </code>
        <description>Asynchronously capturing a screenshot to prevent UI freezing.</description>
      </example>
    </examples>
    <errors>
      <e>The `callback` will receive an error object or message if the screenshot could not be generated (e.g., due to cross-origin image content or memory issues). Handle this in your callback by checking if the error is present.</e>
      <e>Just like `screenshot()`, cross-origin image content can cause errors (the error argument will be non-null). The same CORS considerations apply.</e>
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
</desmos_api>

## Constants and Utilities

<desmos_api version="1.11" type="3D">
  <function name="Desmos.Colors">
    <importance>Common</importance>
    <description>A collection of predefined color constants for use in expressions. These provide a consistent color palette matching Desmos's standard colors.</description>
    <parameters></parameters>
    <returns>
      <type>Object</type>
      <description>An object containing color constants (as CSS color strings) including: RED, BLUE, GREEN, PURPLE, ORANGE, BLACK, etc.</description>
    </returns>
    <examples>
      <example name="basic">
        <code>
// Use a predefined color for an expression
calculator.setExpression({
  id: 'line1',
  latex: 'y=x',
  color: Desmos.Colors.RED
});
        </code>
        <description>Using a predefined color for an expression.</description>
      </example>
    </examples>
    <errors>
      <e>While not strictly an error, be aware that the actual color values might change in future API versions if Desmos updates their color palette.</e>
    </errors>
    <related_functions>
      <function>setExpression</function>
    </related_functions>
    <tags>
      <tag>colors</tag>
      <tag>constants</tag>
      <tag>styling</tag>
    </tags>
    <domain>styling</domain>
    <action>read</action>
    <object>colors</object>
  </function>

  <function name="Desmos.Styles">
    <importance>Common</importance>
    <description>A collection of predefined constants for line and point styles that can be used when setting expression properties.</description>
    <parameters></parameters>
    <returns>
      <type>Object</type>
      <description>An object containing style constants for lines (SOLID, DASHED, DOTTED) and points (POINT, OPEN, CROSS).</description>
    </returns>
    <examples>
      <example name="basic">
        <code>
// Create a dashed line
calculator.setExpression({
  id: 'dashedLine',
  latex: 'y=2x',
  lineStyle: Desmos.Styles.DASHED
});
        </code>
        <description>Setting a line to use a dashed style.</description>
      </example>
    </examples>
    <errors>
      <e>Note that applying OPEN or CROSS styles to point expressions may require setting the `dragMode` to `Desmos.DragModes.NONE` for them to display correctly (otherwise they default to solid points).</e>
    </errors>
    <related_functions>
      <function>setExpression</function>
      <function>Desmos.DragModes</function>
    </related_functions>
    <tags>
      <tag>styles</tag>
      <tag>constants</tag>
      <tag>lines</tag>
      <tag>points</tag>
    </tags>
    <domain>styling</domain>
    <action>read</action>
    <object>styles</object>
  </function>

  <function name="Desmos.DragModes">
    <importance>Common</importance>
    <description>A collection of constants defining how points can be dragged by users in the graph.</description>
    <parameters></parameters>
    <returns>
      <type>Object</type>
      <description>An object containing drag mode constants: X (horizontal only), Y (vertical only), XY (free movement), NONE (not draggable), and AUTO (calculator decides based on context).</description>
    </returns>
    <examples>
      <example name="basic">
        <code>
// Create a point that can only be dragged horizontally
calculator.setExpression({
  id: 'xSlider',
  latex: '(a,2)', // a is a parameter that will be modified by dragging
  dragMode: Desmos.DragModes.X
});
        </code>
        <description>Creating a point that can only be dragged along the x-axis.</description>
      </example>
    </examples>
    <errors>
      <e>Setting a drag mode may have no effect if the expression is defined in a way that constrains its movement (e.g., a point defined by the formula `(t^2, t)` will move along that parametric curve regardless of the drag mode).</e>
    </errors>
    <related_functions>
      <function>setExpression</function>
      <function>Desmos.Styles</function>
    </related_functions>
    <tags>
      <tag>drag</tag>
      <tag>constants</tag>
      <tag>interaction</tag>
      <tag>points</tag>
    </tags>
    <domain>interaction</domain>
    <action>read</action>
    <object>dragmodes</object>
  </function>
</desmos_api>

## Version Compatibility Notes

The Desmos 3D API v1.11 was introduced to provide 3D graphing capabilities. It shares most of its API with the 2D GraphingCalculator, so applications can transition between 2D and 3D as needed.

Key differences compared to v1.10:
- Addition of the `Desmos.Calculator3D` constructor function
- 3D-specific graph features like surface plots
- Deprecation of `setGraphSettings` (use `updateSettings` instead)
- Introduction of `reportPosition` configuration for accessibility

States saved with v1.11 are generally backward compatible, but 3D-specific features will not render in older versions.

  <function name="destroy">
    <importance>Core</importance>
    <description>Destroys the calculator instance, removing all event listeners and freeing resources. After calling this, the DOM element that hosted the calculator can be removed or reused safely.</description>
    <parameters></parameters>
    <returns>
      <type>void</type>
      <description>No return value.</description>
    </returns>
    <examples>
      <example name="basic">
        <code>
// Initialize and later destroy the calculator
var calc = Desmos.Calculator3D(elt);
// ... use the calculator ...
calc.destroy(); // cleanup when done
        </code>
        <description>Proper cleanup of a calculator instance when it's no longer needed.</description>
      </example>
    </examples>
    <errors>
      <error>Attempting to use any calculator API method after calling `destroy()` will not work (the calculator is no longer active). Always ensure you don't call methods on a destroyed instance.</error>
      <error>Failing to call `destroy()` when removing a calculator can cause hidden event listeners to persist. Always destroy the instance if the embed is removed from the page.</error>
    </errors>
    <related_functions>
      <function>Calculator3D</function>
    </related_functions>
    <tags>
      <tag>cleanup</tag>
      <tag>memory</tag>
      <tag>disposal</tag>
    </tags>
    <domain>initialization</domain>
    <action>delete</action>
    <object>calculator</object>
  </function>

  <function name="getState">
    <importance>Common</importance>
    <description>Returns a JavaScript object representing the current state of the calculator (all expressions, settings, zoom level, etc.). This object can be serialized (e.g. via `JSON.stringify`) and later used to restore the calculator state with `setState`.</description>
    <parameters></parameters>
    <returns>
      <type>Object</type>
      <description>An object encapsulating the entire state of the calculator. Treat this state as an opaque snapshot; its structure may change between API versions.</description>
    </returns>
    <examples>
      <example name="basic">
        <code>
// Save the current state
var state = calculator.getState();
// Convert state to a string for storage (e.g., send to a server)
var stateString = JSON.stringify(state);
        </code>
        <description>Retrieving and serializing the calculator state.</description>
      </example>
    </examples>
    <errors>
      <error>The returned state object should not be modified directly. Altering it may result in an invalid state that cannot be loaded by `setState`.</error>
      <error>States from one API version might not be fully compatible with significantly older versions of the API. If loading across versions, test for any issues.</error>
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
    <description>Restores the calculator to a previous state object (such as one returned by `getState`). This allows you to load a saved graph state. You can optionally control whether this restoration preserves the undo history.</description>
    <parameters>
      <parameter name="state" type="Object" required="true">
        A state object previously obtained from `getState` (and not modified).
      </parameter>
      <parameter name="options" type="Object" required="false">
        Options for setting the state. Currently supports `{ allowUndo: true/false }`. If `allowUndo` is true, the load will not clear the undo/redo history (so the user can undo the state load). By default (false), loading a state resets the undo history.
      </parameter>
    </parameters>
    <returns>
      <type>void</type>
      <description>No return value. The calculator UI updates to reflect the given state.</description>
    </returns>
    <examples>
      <example name="basic">
        <code>
// Assume stateObj was obtained via getState (maybe from storage)
calculator.setState(stateObj);
        </code>
        <description>Loading a previously saved state.</description>
      </example>
      <example name="advanced">
        <code>
// Restore state while preserving undo history
calculator.setState(savedState, { allowUndo: true });
        </code>
        <description>Loading a state while keeping undo history intact.</description>
      </example>
    </examples>
    <errors>
      <error>If the provided state object is not one that was generated by the same or a compatible version of the API, the calculator may not load it correctly. Only use state objects from `getState` and avoid altering them.</error>
      <error>Loading a state with `allowUndo: false` (the default) clears any prior undo history. If preserving user undo is important, use `allowUndo: true`.</error>
    </errors>
    <related_functions>
      <function>getState</function>
      <function>setBlank</function>
    </related_functions>
    <tags>
      <tag>state</tag>
      <tag>restore</tag>
      <tag>load</tag>
    </tags>
    <domain>state</domain>
    <action>update</action>
    <object>state</object>
  </function>

  <function name="setBlank">
    <importance>Common</importance>
    <description>Clears the calculator to a blank state (no expressions, default settings). Optionally, this reset can preserve the undo history if specified.</description>
    <parameters>
      <parameter name="options" type="Object" required="false">
        If `{ allowUndo: true }` is provided, the blanking action will not clear the undo/redo history. By default, undo history is wiped when resetting to blank.
      </parameter>
    </parameters>
    <returns>
      <type>void</type>
      <description>No return value. The calculator is now empty.</description>
    </returns>
    <examples>
      <example name="basic">
        <code>
// Completely clear the calculator
calculator.setBlank();
        </code>
        <description>Resetting to a blank calculator.</description>
      </example>
      <example name="advanced">
        <code>
// Clear the calculator but allow the user to undo the clear
calculator.setBlank({ allowUndo: true });
        </code>
        <description>Clearing while allowing the action to be undone.</description>
      </example>
    </examples>
    <errors>
      <error>As with `setState`, using `allowUndo: false` (default) will clear any history of actions. Use `allowUndo: true` if the blank state should be undoable.</error>
      <error>If the calculator is already blank, calling `setBlank()` has no effect (no error).</error>
    </errors>
    <related_functions>
      <function>setState</function>
      <function>getState</function>
    </related_functions>
    <tags>
      <tag>reset</tag>
      <tag>clear</tag>
      <tag>blank</tag>
    </tags>
    <domain>state</domain>
    <action>update</action>
    <object>calculator</object>
  </function>

  <function name="setDefaultState">
    <importance>Common</importance>
    <description>Defines a default state for the calculator and adds a built-in Reset button. After calling this, users can reset the calculator back to this default state (either via a button on the interface or the "Delete All" menu turning into "Reset").</description>
    <parameters>
      <parameter name="state" type="Object" required="true">
        A state object (from `getState`) representing the desired default graph state.
      </parameter>
    </parameters>
    <returns>
      <type>void</type>
      <description>No return value. The calculator now has a default state stored internally.</description>
    </returns>
    <examples>
      <example name="basic">
        <code>
// Save current state as default
var defaultState = calculator.getState();
calculator.setDefaultState(defaultState);
// Now the calculator's "Delete All" button becomes a "Reset" button to this state.
        </code>
        <description>Setting the current state as the default reset state.</description>
      </example>
    </examples>
    <errors>
      <error>Make sure the state object passed in is a valid state (obtained via `getState`). An invalid or tampered state may not set as default properly.</error>
      <error>If `showResetButtonOnGraphpaper` setting is false (the default), the reset UI will be under the "Edit List" menu rather than on the graph paper. To show a reset icon on the graph, enable this setting.</error>
    </errors>
    <related_functions>
      <function>getState</function>
      <function>setState</function>
    </related_functions>
    <tags>
      <tag>default</tag>
      <tag>reset</tag>
      <tag>state</tag>
    </tags>
    <domain>state</domain>
    <action>create</action>
    <object>default</object>
  </function>

  <function name="undo">
    <importance>Common</importance>
    <description>Reverts the calculator to the previous state in the user's action history (undoes the last action if possible). This is equivalent to the user pressing an 'Undo' button.</description>
    <parameters></parameters>
    <returns>
      <type>void</type>
      <description>No return value. The calculator state changes to the previous state if an undo is available.</description>
    </returns>
    <examples>
      <example name="basic">
        <code>
// Programmatically trigger an undo
calculator.undo();
        </code>
        <description>Undoing the last action.</description>
      </example>
    </examples>
    <errors>
      <error>If there is no action to undo (history is empty or at the initial state), calling `undo()` has no effect (no error is thrown).</error>
    </errors>
    <related_functions>
      <function>redo</function>
      <function>clearHistory</function>
      <function>withHistoryReplacement</function>
    </related_functions>
    <tags>
      <tag>history</tag>
      <tag>undo</tag>
    </tags>
    <domain>history</domain>
    <action>read</action>
    <object>history</object>
  </function>

  <function name="redo">
    <importance>Common</importance>
    <description>Advances the calculator to the next state in the redo history (re-applies an action that was undone, if possible). This is equivalent to an 'Redo' command.</description>
    <parameters></parameters>
    <returns>
      <type>void</type>
      <description>No return value. The calculator returns to a later state if available in the redo stack.</description>
    </returns>
    <examples>
      <example name="basic">
        <code>
// Programmatically trigger a redo
calculator.redo();
        </code>
        <description>Redoing a previously undone action.</description>
      </example>
    </examples>
    <errors>
      <error>If there is no action to redo (either nothing has been undone or we've reached the latest state), calling `redo()` does nothing.</error>
    </errors>
    <related_functions>
      <function>undo</function>
      <function>clearHistory</function>
    </related_functions>
    <tags>
      <tag>history</tag>
      <tag>redo</tag>
    </tags>
    <domain>history</domain>
    <action>read</action>
    <object>history</object>
  </function>

  <function name="clearHistory">
    <importance>Specialized</importance>
    <description>Clears the calculator's undo/redo history. The current state of the calculator remains unchanged, but the user will no longer be able to undo or redo past actions.</description>
    <parameters></parameters>
    <returns>
      <type>void</type>
      <description>No return value. The undo/redo stacks are emptied.</description>
    </returns>
    <examples>
      <example name="basic">
        <code>
// After making programmatic changes, clear history
calculator.clearHistory();
        </code>
        <description>Clearing the undo/redo history.</description>
      </example>
    </examples>
    <errors>
      <error>This function does not produce an error under normal use. It simply wipes the history. If no history exists, it has no effect.</error>
      <error>Use caution: once cleared, users cannot recover previously undoable actions.</error>
    </errors>
    <related_functions>
      <function>undo</function>
      <function>redo</function>
      <function>withHistoryReplacement</function>
    </related_functions>
    <tags>
      <tag>history</tag>
      <tag>clear</tag>
    </tags>
    <domain>history</domain>
    <action>delete</action>
    <object>history</object>
  </function>

  <function name="withHistoryReplacement">
    <importance>Specialized</importance>
    <description>Executes a callback function, merging any changes it makes into a single entry in the undo history. Without this, multiple programmatic changes would each create their own undo steps. This method allows grouping changes as one atomic action from the user's perspective.</description>
    <parameters>
      <parameter name="callback" type="Function" required="true">
        A function that performs a sequence of calculator operations (e.g. setting multiple expressions). All changes within this function call will replace the current top of the undo history rather than create new entries.
      </parameter>
    </parameters>
    <returns>
      <type>void</type>
      <description>No return value. The actions in the callback are executed and compressed into one undo point.</description>
    </returns>
    <examples>
      <example name="basic">
        <code>
// Add two expressions but treat them as one undoable action
calculator.withHistoryReplacement(function(){
  calculator.setExpression({ id: 'a', latex: 'y=x^2' });
  calculator.setExpression({ id: 'b', latex: 'y=2x^2' });
});
// Now, a single undo() will remove both expressions together.
        </code>
        <description>Grouping multiple expression additions as one undoable action.</description>
      </example>
    </examples>
    <errors>
      <error>Ensure the callback is a function that performs the intended operations. If the callback itself throws an error or fails, those changes might not apply to the history as expected.</error>
      <error>Do not call `undo()` or `redo()` inside the callback; this can lead to undefined behavior in the history stack.</error>
    </errors>
    <related_functions>
      <function>undo</function>
      <function>redo</function>
      <function>clearHistory</function>
    </related_functions>
    <tags>
      <tag>history</tag>
      <tag>grouping</tag>
      <tag>batch</tag>
    </tags>
    <domain>history</domain>
    <action>update</action>
    <object>history</object>
  </function>
</desmos_api>

## Expression Management

<desmos_api version="1.11" type="3D">
  <function name="setExpression">
    <importance>Core</importance>
    <description>Creates a new expression or updates an existing one in the graph. This is the primary method to add equations, points, tables, or text to the calculator programmatically. If an expression with the same `id` exists, it will be updated with any new properties provided (other properties will remain unchanged).</description>
    <parameters>
      <parameter name="expression" type="Object" required="true">
        An object describing the expression or item to add/update. It should include an `id` (optional but recommended for updates) and other properties depending on the item type (e.g. `latex` for an equation, or `type: 'table'` for a table).
      </parameter>
    </parameters>
    <returns>
      <type>void</type>
      <description>No return value. The expression is added or updated in the graph's expressions list.</description>
    </returns>
    <examples>
      <example name="basic">
        <code>
// Add a simple expression (line)
calculator.setExpression({ id: 'line1', latex: 'y=2x+1', color: Desmos.Colors.RED });
        </code>
        <description>Adding a basic line equation with a specific color.</description>
      </example>
      <example name="update">
        <code>
// Update an existing expression by id
calculator.setExpression({ id: 'line1', lineStyle: Desmos.Styles.DASHED }); // makes the line dashed
        </code>
        <description>Updating an existing expression to change its line style.</description>
      </example>
      <example name="table">
        <code>
// Add a table of values
calculator.setExpression({
  id: 'table1',
  type: 'table',
  columns: [
    { latex: 'x', values: ['1','2','3','4'] },
    { latex: 'y', values: ['1','4','9','16'] }
  ]
});
        </code>
        <description>Creating a table with x and y values.</description>
      </example>
      <example name="text">
        <code>
// Add a note (text box)
calculator.setExpression({ id: 'note1', type: 'text', text: 'Hello 3D Graph!' });
        </code>
        <description>Adding a text note to the calculator.</description>
      </example>
    </examples>
    <errors>
      <error>If `expression.id` matches an existing item of a different type, the update will not occur. You cannot change the type of an existing expression (e.g., turn a table into an equation); instead remove it first then add a new one.</error>
      <error>If the `expression` object has an invalid format or type (e.g., an unrecognized `type`), the call will be ignored (no expression added or changed). Double-check property names and types.</error>
      <error>If the LaTeX in the expression can't be parsed or evaluated, the expression will still be added but will be marked as an error in the Desmos interface (nothing will graph for that expression). Use `expressionAnalysis` or the calculator UI to debug such cases.</error>
    </errors>
    <related_functions>
      <function>setExpressions</function>
      <function>removeExpression</function>
      <function>getExpressions</function>
      <function>expressionAnalysis</function>
    </related_functions>
    <tags>
      <tag>expression</tag>
      <tag>equation</tag>
      <tag>graph</tag>
    </tags>
    <domain>expressions</domain>
    <action>create</action>
    <action>update</action>
    <object>expression</object>
  </function>

  <function name="setExpressions">
    <importance>Common</importance>
    <description>Adds or updates multiple expressions at once. This method takes an array of expression objects and is functionally equivalent to calling `setExpression` on each of them sequentially.</description>
    <parameters>
      <parameter name="expressions" type="Array<Object>" required="true">
        An array of expression objects. Each object should be in the format accepted by `setExpression`.
      </parameter>
    </parameters>
    <returns>
      <type>void</type>
      <description>No return value. All provided expressions are added/updated.</description>
    </returns>
    <examples>
      <example name="basic">
        <code>
// Add several expressions in one call
calculator.setExpressions([
  { id: 'p1', latex: '(1,2)' },
  { id: 'p2', latex: '(3,4)' },
  { id: 'line', latex: 'y~mx+b' }
]);
        </code>
        <description>Adding multiple expressions in a single call.</description>
      </example>
    </examples>
    <errors>
      <error>Any expression object in the array that is invalid will be skipped (similar to a failed `setExpression` call). The other expressions will still be processed.</error>
      <error>This method does not return errors per se; you should check the results via `getExpressions()` or `expressionAnalysis` if needed. If nothing seems to happen, verify the format of each object in the array.</error>
    </errors>
    <related_functions>
      <function>setExpression</function>
      <function>removeExpressions</function>
    </related_functions>
    <tags>
      <tag>expression</tag>
      <tag>batch</tag>
      <tag>multiple</tag>
    </tags>
    <domain>expressions</domain>
    <action>create</action>
    <action>update</action>
    <object>expression</object>
  </function>

  <function name="removeExpression">
    <importance>Common</importance>
    <description>Removes a single expression from the graph by its id. This deletes the expression from the expressions list, effectively clearing it from the graph display.</description>
    <parameters>
      <parameter name="expr" type="Object" required="true">
        An object with an `id` property identifying which expression to remove. (E.g., `{ id: 'line1' }`)
      </parameter>
    </parameters>
    <returns>
      <type>void</type>
      <description>No return value. The specified expression is removed if it existed.</description>
    </returns>
    <examples>
      <example name="basic">
        <code>
// Remove an expression by id
calculator.removeExpression({ id: 'line1' });
        </code>
        <description>Removing a specific expression by its id.</description>
      </example>
    </examples>
    <errors>
      <error>If the given id does not exist in the expressions list, `removeExpression` does nothing (no error). Double-check the id if the expression remains.</error>
      <error>Make sure to pass an object with an `id` field. Passing a string directly (like 'line1') will not work; it must be in an object as shown.</error>
    </errors>
    <related_functions>
      <function>setExpression</function>
      <function>removeExpressions</function>
      <function>getExpressions</function>
    </related_functions>
    <tags>
      <tag>expression</tag>
      <tag>remove</tag>
      <tag>delete</tag>
    </tags>
    <domain>expressions</domain>
    <action>delete</action>
    <object>expression</object>
  </function>