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

  <function name="undo">
    <importance>Common</importance>
    <description>Undoes the last action (if any) in the graph, reverting to the previous state.</description>
    <parameters></parameters>
    <returns>
      <type>undefined</type>
      <description>No return value.</description>
    </returns>
    <examples>
      <example name="fixed">
        <code>
// Create a non-draggable point
calculator.setExpression({
  id: 'fixedPoint',
  latex: '(2,3)',
  dragMode: Desmos.DragModes.NONE  // Disable dragging
});
        </code>
        <description>Creating a fixed point that cannot be dragged.</description>
      </example>
      <example name="free">
        <code>
// Create a freely draggable point
calculator.setExpression({
  id: 'freePoint',
  latex: '(0,0)',
  dragMode: Desmos.DragModes.XY  // Allow dragging in any direction
});
        </code>
        <description>Creating a point that can be dragged in any direction.</description>
      </example>
    </examples>
    <errors>
      <e>Setting dragMode may have no effect if the expression is defined in a way that constrains its movement (e.g., a point defined on a curve).</e>
      <e>The AUTO mode behaves differently depending on the context and may not always do what you expect.</e>
    </errors>
    <related_functions>
      <function>setExpression</function>
      <function>Desmos.Styles</function>
    </related_functions>
    <tags>
      <tag>drag</tag>
      <tag>points</tag>
      <tag>interaction</tag>
      <tag>constants</tag>
    </tags>
    <domain>interaction</domain>
    <action>read</action>
    <object>dragmodes</object>
  </function>

  <function name="Desmos.AxisArrowModes">
    <importance>Specialized</importance>
    <description>Constants for axis arrow display modes. Use with graph settings `xAxisArrowMode` and `yAxisArrowMode`. Values: `Desmos.AxisArrowModes.NONE` (no arrows), `Desmos.AxisArrowModes.POSITIVE` (arrow at positive end only), `Desmos.AxisArrowModes.BOTH` (arrows at both ends). Default is NONE on both axes.</description>
    <parameters></parameters>
    <returns>
      <type>Object</type>
      <description>Object containing axis arrow mode constants.</description>
    </returns>
    <examples>
      <example name="basic">
        <code>
// Set arrows on the positive ends of both axes
calculator.updateSettings({
  xAxisArrowMode: Desmos.AxisArrowModes.POSITIVE,
  yAxisArrowMode: Desmos.AxisArrowModes.POSITIVE
});
        </code>
        <description>Adding arrows to the positive ends of both axes.</description>
      </example>
      <example name="both">
        <code>
// Set arrows on both ends of both axes
calculator.updateSettings({
  xAxisArrowMode: Desmos.AxisArrowModes.BOTH,
  yAxisArrowMode: Desmos.AxisArrowModes.BOTH
});
        </code>
        <description>Adding arrows to both ends of both axes.</description>
      </example>
    </examples>
    <errors>
      <e>If the graph settings have `showXAxis: false` or `showYAxis: false`, the corresponding arrow settings will have no visible effect.</e>
    </errors>
    <related_functions>
      <function>updateSettings</function>
    </related_functions>
    <tags>
      <tag>axes</tag>
      <tag>arrows</tag>
      <tag>display</tag>
      <tag>constants</tag>
    </tags>
    <domain>styling</domain>
    <action>read</action>
    <object>axisarrows</object>
  </function>

  <function name="Desmos.LabelOrientations">
    <importance>Specialized</importance>
    <description>Constants for point label orientation positions. Options: `Desmos.LabelOrientations.ABOVE`, `BELOW`, `LEFT`, `RIGHT`, or `DEFAULT` (auto-placement) for a point's label.</description>
    <parameters></parameters>
    <returns>
      <type>Object</type>
      <description>Object containing label orientation constants.</description>
    </returns>
    <examples>
      <example name="basic">
        <code>
// Create a point with a label positioned above
calculator.setExpression({
  id: 'labeledPoint',
  latex: '(1,2)',
  label: 'P',
  showLabel: true,
  labelOrientation: Desmos.LabelOrientations.ABOVE
});
        </code>
        <description>Positioning a point's label above the point.</description>
      </example>
    </examples>
    <errors>
      <e>If `showLabel` is false or no `label` is provided, the `labelOrientation` setting has no visible effect.</e>
    </errors>
    <related_functions>
      <function>setExpression</function>
    </related_functions>
    <tags>
      <tag>labels</tag>
      <tag>points</tag>
      <tag>orientation</tag>
      <tag>constants</tag>
    </tags>
    <domain>styling</domain>
    <action>read</action>
    <object>labelorientations</object>
  </function>

  <function name="Desmos.FontSizes">
    <importance>Specialized</importance>
    <description>Predefined font size constants for calculator text. Values: `Desmos.FontSizes.VERY_SMALL` (9px), `SMALL` (12px), `MEDIUM` (16px), `LARGE` (20px), `VERY_LARGE` (24px). The `fontSize` can also be set to any numeric value via settings, not just these presets.</description>
    <parameters></parameters>
    <returns>
      <type>Object</type>
      <description>Object containing font size constants.</description>
    </returns>
    <examples>
      <example name="basic">
        <code>
// Use the large font size for the calculator
calculator.updateSettings({
  fontSize: Desmos.FontSizes.LARGE
});
        </code>
        <description>Setting the calculator to use a larger font size.</description>
      </example>
      <example name="custom">
        <code>
// You can also set a custom font size (not just the constants)
calculator.updateSettings({
  fontSize: 18  // Custom 18px font size
});
        </code>
        <description>Using a custom font size instead of a preset.</description>
      </example>
    </examples>
    <errors>
      <e>Very small font sizes may make text difficult to read, especially on high-resolution displays.</e>
    </errors>
    <related_functions>
      <function>updateSettings</function>
    </related_functions>
    <tags>
      <tag>font</tag>
      <tag>size</tag>
      <tag>text</tag>
      <tag>constants</tag>
    </tags>
    <domain>styling</domain>
    <action>read</action>
    <object>fontsizes</object>
  </function>
</desmos_api>

## Version Compatibility Notes

The Desmos API v1.10 is a stable release. This means it will not change unexpectedly, and older versions (like 1.9, 1.8) remain available but frozen. It's recommended to use the latest stable (v1.10) for new projects.

Key differences from older versions:
- `columnMode` (in tables) was replaced by separate `points`/`lines` flags in v1.1
- `GraphingCalculator.setGraphSettings` was deprecated in favor of `updateSettings`
- Graph states saved in older versions can generally be loaded in newer versions
- New features in v1.10 (like Action expressions or new functions) won't work in older API versions

Always test your application after upgrading the API version.basic">
        <code>
// Programmatically undo the last action
calculator.undo();
        </code>
        <description>Undoing the last action that modified the calculator.</description>
      </example>
    </examples>
    <errors>
      <e>If there is no action to undo (history is empty or at the initial state), calling `undo()` has no effect (no error is thrown).</e>
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
    <description>Redoes an action that was just undone, if available.</description>
    <parameters></parameters>
    <returns>
      <type>undefined</type>
      <description>No return value.</description>
    </returns>
    <examples>
      <example name="basic">
        <code>
// Programmatically redo the most recently undone action
calculator.redo();
        </code>
        <description>Redoing a previously undone action.</description>
      </example>
    </examples>
    <errors>
      <e>If there is no action to redo (either nothing has been undone or we've reached the latest state), calling `redo()` does nothing.</e>
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
    <description>Clears the undo/redo history without changing the current graph state.</description>
    <parameters></parameters>
    <returns>
      <type>undefined</type>
      <description>No return value.</description>
    </returns>
    <examples>
      <example name="basic">
        <code>
// Clear the undo/redo history
calculator.clearHistory();
        </code>
        <description>Removing the ability to undo/redo previous actions.</description>
      </example>
    </examples>
    <errors>
      <e>This operation cannot be undone - once the history is cleared, those states are permanently gone.</e>
    </errors>
    <related_functions>
      <function>undo</function>
      <function>redo</function>
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
    <description>Executes a function `callback` such that any changes it makes to the calculator state replace the current undo history entry instead of creating a new one. This is useful when making programmatic changes (like loading a preset) that should not be treated as a separate user action in the undo history.</description>
    <parameters>
      <parameter name="callback" type="Function" required="true">
        Function that performs the desired changes. It will be executed immediately.
      </parameter>
    </parameters>
    <returns>
      <type>undefined</type>
      <description>No return value.</description>
    </returns>
    <examples>
      <example name="basic">
        <code>
// Add a temporary expression without creating a new undo step
calculator.withHistoryReplacement(function(){
    calculator.setExpression({ id:'temp', latex:'y=sin(x)' });
});
        </code>
        <description>Making changes that replace the current history entry instead of adding a new one.</description>
      </example>
      <example name="multiple">
        <code>
// Group multiple changes as a single undoable action
calculator.withHistoryReplacement(function() {
  calculator.setExpression({ id: 'eq1', latex: 'y=x^2' });
  calculator.setExpression({ id: 'eq2', latex: 'y=x^3' });
  calculator.setMathBounds({ left: -5, right: 5, bottom: -5, top: 5 });
});
// Now a single undo() will revert all these changes together
        </code>
        <description>Grouping multiple operations into a single undoable step.</description>
      </example>
    </examples>
    <errors>
      <e>Ensure the callback is a function that performs the intended operations. If the callback itself throws an error or fails, those changes might not apply to the history as expected.</e>
      <e>Do not call `undo()` or `redo()` inside the callback; this can lead to undefined behavior in the history stack.</e>
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

  <function name="graphpaperBounds">
    <importance>Specialized</importance>
    <description>An observable property that describes the current visible bounds of the graph in both math and pixel coordinates. Accessible as `calculator.graphpaperBounds`, it has two fields: `.mathCoordinates` and `.pixelCoordinates`, each an object with `left`, `right`, `top`, `bottom` corresponding to the view bounds. To react to changes (e.g. user panning/zooming), use `calculator.observe('graphpaperBounds', ...)`.</description>
    <parameters></parameters>
    <returns>
      <type>Object</type>
      <description>An object with two properties: `mathCoordinates` (containing the math bounds) and `pixelCoordinates` (containing pixel dimensions).</description>
    </returns>
    <examples>
      <example name="read">
        <code>
// Read the current math coordinate boundaries of the visible graph
var bounds = calculator.graphpaperBounds.mathCoordinates;
console.log(bounds.left, bounds.right, bounds.top, bounds.bottom);
        </code>
        <description>Getting the current viewport coordinates.</description>
      </example>
      <example name="observe">
        <code>
// Observe changes to the viewport
calculator.observe('graphpaperBounds', function() {
  var bounds = calculator.graphpaperBounds.mathCoordinates;
  document.getElementById('viewport-info').textContent = 
    'X: ' + bounds.left.toFixed(2) + ' to ' + bounds.right.toFixed(2) + 
    ', Y: ' + bounds.bottom.toFixed(2) + ' to ' + bounds.top.toFixed(2);
});
        </code>
        <description>Watching for changes to the viewport and updating UI accordingly.</description>
      </example>
    </examples>
    <errors>
      <e>This property updates asynchronously; reading it immediately after a viewport change may not reflect the updated state. Use `observe('graphpaperBounds', ...)` for reliable monitoring.</e>
      <e>The coordinate systems differ: in mathCoordinates, the y-axis increases upward (top > bottom), but in pixelCoordinates, y increases downward (top < bottom).</e>
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
    </tags>
    <domain>viewport</domain>
    <action>read</action>
    <object>viewport</object>
  </function>

  <function name="mathToPixels">
    <importance>Specialized</importance>
    <description>Converts math coordinates to pixel coordinates in the graph display. `coords` is an object with an `x` property, a `y` property, or both (numbers in math coordinates). It returns an object with the same properties, giving the corresponding pixel coordinates on the graph canvas.</description>
    <parameters>
      <parameter name="coords" type="Object" required="true">
        Object with numeric `x` and/or `y` (in math coordinates).
      </parameter>
    </parameters>
    <returns>
      <type>Object</type>
      <description>Object with `x` and/or `y` pixel coordinates corresponding to the input.</description>
    </returns>
    <examples>
      <example name="basic">
        <code>
// Get the pixel position of the math point (0,0) (the origin) on screen
var pix = calculator.mathToPixels({ x: 0, y: 0 });
console.log('Origin is at:', pix.x, pix.y);
        </code>
        <description>Converting math coordinates to pixel positions.</description>
      </example>
      <example name="overlay">
        <code>
// Position an HTML element at a specific math point
var point = { x: 2, y: 3 };
var pixelPos = calculator.mathToPixels(point);
var element = document.getElementById('marker');
element.style.left = pixelPos.x + 'px';
element.style.top = pixelPos.y + 'px';
element.style.position = 'absolute';
        </code>
        <description>Positioning an HTML element to overlay a specific point on the graph.</description>
      </example>
    </examples>
    <errors>
      <e>If neither x nor y is provided in the input object, the output will be an empty object.</e>
      <e>The conversion depends on the current viewport; if the graph is panned or zoomed, the pixel coordinates will change.</e>
    </errors>
    <related_functions>
      <function>pixelsToMath</function>
      <function>graphpaperBounds</function>
    </related_functions>
    <tags>
      <tag>conversion</tag>
      <tag>coordinates</tag>
      <tag>pixels</tag>
    </tags>
    <domain>coordinates</domain>
    <action>calculate</action>
    <object>coordinates</object>
  </function>

  <function name="pixelsToMath">
    <importance>Specialized</importance>
    <description>Converts pixel coordinates (from the graph's container) to math coordinates on the graph. This is the inverse of `mathToPixels`. For example, it can be used to get the math coordinate of a mouse event position by providing the pixel offsets within the calculator element.</description>
    <parameters>
      <parameter name="coords" type="Object" required="true">
        Object with numeric `x` and/or `y` in pixel coordinates (relative to the top-left of the graph area).
      </parameter>
    </parameters>
    <returns>
      <type>Object</type>
      <description>Object with corresponding `x`/`y` in math coordinates.</description>
    </returns>
    <examples>
      <example name="mouseClick">
        <code>
// Convert mouse click coordinates to math coordinates
var rect = calculatorElement.getBoundingClientRect();
window.addEventListener('click', function(evt){
    var mathPt = calculator.pixelsToMath({
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    });
    console.log('You clicked at math coords', mathPt);
});
        </code>
        <description>Converting mouse click positions to mathematical coordinates.</description>
      </example>
    </examples>
    <errors>
      <e>If neither x nor y is provided in the input object, the output will be an empty object.</e>
      <e>The conversion depends on the current viewport; if the graph is panned or zoomed, the conversion will give different results for the same pixel coordinates.</e>
    </errors>
    <related_functions>
      <function>mathToPixels</function>
      <function>graphpaperBounds</function>
    </related_functions>
    <tags>
      <tag>conversion</tag>
      <tag>coordinates</tag>
      <tag>pixels</tag>
    </tags>
    <domain>coordinates</domain>
    <action>calculate</action>
    <object>coordinates</object>
  </function>

  <function name="resize">
    <importance>Specialized</importance>
    <description>Forces the calculator to resize and redraw to match its container's current dimensions. This is only necessary if you've disabled the automatic resize detection (by setting `autosize: false` in constructor options) or if the resize detection fails to trigger.</description>
    <parameters></parameters>
    <returns>
      <type>undefined</type>
      <description>No return value.</description>
    </returns>
    <examples>
      <example name="basic">
        <code>
// Manually trigger a resize after changing the container size
calculatorContainer.style.width = '800px';
calculatorContainer.style.height = '600px';
calculator.resize();
        </code>
        <description>Manually resizing the calculator after its container size changes.</description>
      </example>
      <example name="visibility">
        <code>
// Resize after showing a previously hidden calculator
document.getElementById('calculator-tab').addEventListener('click', function() {
  document.getElementById('calculator-container').style.display = 'block';
  calculator.resize(); // Needed when showing a previously hidden calculator
});
        </code>
        <description>Ensuring the calculator renders correctly when becoming visible.</description>
      </example>
    </examples>
    <errors>
      <e>If the container element has no dimensions (width or height is 0), the calculator may not render properly.</e>
      <e>This method is typically not needed if `autosize` is enabled (the default setting).</e>
    </errors>
    <related_functions>
      <function>graphpaperBounds</function>
    </related_functions>
    <tags>
      <tag>layout</tag>
      <tag>resize</tag>
      <tag>render</tag>
    </tags>
    <domain>layout</domain>
    <action>update</action>
    <object>calculator</object>
  </function>

  <function name="isProjectionUniform">
    <importance>Specialized</importance>
    <description>Returns a boolean indicating whether the scaling on the x and y axes is the same (i.e., if one math unit in x is the same pixel length as one math unit in y). This can be used to decide how to take screenshots (e.g. whether to preserve aspect ratio).</description>
    <parameters></parameters>
    <returns>
      <type>Boolean</type>
      <description>True if x and y axes have the same scale, false otherwise.</description>
    </returns>
    <examples>
      <example name="basic">
        <code>
// Check if the projection is uniform
if (calculator.isProjectionUniform()) {
  console.log('The graph has the same scale on both axes');
} else {
  console.log('The graph has different scales on x and y axes');
}
        </code>
        <description>Checking if the x and y axes have the same scale.</description>
      </example>
      <example name="screenshot">
        <code>
// Use uniform projection info for screenshots
var screenshotOptions = {};
if (calculator.isProjectionUniform()) {
  // For uniform projections, we can use a square or any aspect ratio
  screenshotOptions.width = 500;
  screenshotOptions.height = 500;
} else {
  // For non-uniform, preserve the current aspect ratio
  var bounds = calculator.graphpaperBounds;
  var pixelBounds = bounds.pixelCoordinates;
  screenshotOptions.width = pixelBounds.width;
  screenshotOptions.height = pixelBounds.height;
}
var image = calculator.screenshot(screenshotOptions);
        </code>
        <description>Determining appropriate screenshot dimensions based on projection uniformity.</description>
      </example>
    </examples>
    <errors>
      <e>This method may not give accurate results immediately after a resize or viewport change. It's best to check it after any viewport animations have completed.</e>
    </errors>
    <related_functions>
      <function>graphpaperBounds</function>
      <function>screenshot</function>
    </related_functions>
    <tags>
      <tag>projection</tag>
      <tag>scale</tag>
      <tag>aspect</tag>
    </tags>
    <domain>viewport</domain>
    <action>read</action>
    <object>projection</object>
  </function>

  <function name="focusFirstExpression">
    <importance>Specialized</importance>
    <description>Focuses the first expression in the expressions list (puts the text cursor in it). By default, when the calculator loads, no expression is focused (to avoid scrolling the page). This method can be used to force focus if desired.</description>
    <parameters></parameters>
    <returns>
      <type>undefined</type>
      <description>No return value.</description>
    </returns>
    <examples>
      <example name="basic">
        <code>
// Programmatically focus the first expression input field
calculator.focusFirstExpression();
        </code>
        <description>Setting focus to the first expression for immediate editing.</description>
      </example>
      <example name="startup">
        <code>
// When the user clicks a "start" button, focus the calculator
document.getElementById('start-button').addEventListener('click', function() {
  calculator.focusFirstExpression();
});
        </code>
        <description>Focusing the calculator when the user explicitly indicates they want to interact with it.</description>
      </example>
    </examples>
    <errors>
      <e>If the expressions list is empty, focusing may create a new empty expression.</e>
      <e>This method could cause page scrolling if the calculator is not in the viewport.</e>
    </errors>
    <related_functions>
      <function>openKeypad</function>
    </related_functions>
    <tags>
      <tag>focus</tag>
      <tag>expressions</tag>
      <tag>ui</tag>
    </tags>
    <domain>ui</domain>
    <action>update</action>
    <object>focus</object>
  </function>

  <function name="openKeypad">
    <importance>Specialized</importance>
    <description>Opens the on-screen keypad (virtual keyboard) of the calculator. If no expression is currently focused, this will focus the first expression before opening the keypad. If the calculator was initialized with `keypad:false`, calling this will focus an expression but will not display a keypad UI.</description>
    <parameters></parameters>
    <returns>
      <type>undefined</type>
      <description>No return value.</description>
    </returns>
    <examples>
      <example name="basic">
        <code>
// Ensure the on-screen keypad is visible to the user
calculator.openKeypad();
        </code>
        <description>Opening the on-screen keypad for user input.</description>
      </example>
      <example name="mobile">
        <code>
// On mobile devices, show the keypad automatically
if (/Mobi|Android/i.test(navigator.userAgent)) {
  calculator.openKeypad();
}
        </code>
        <description>Opening the keypad automatically on mobile devices.</description>
      </example>
    </examples>
    <errors>
      <e>If the calculator was initialized with `keypad: false`, this method will only focus an expression but won't show a keypad.</e>
      <e>There is no direct API method to close the keypad once opened (it remains until the user dismisses it).</e>
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

  <function name="HelperExpression">
    <importance>Specialized</importance>
    <description>Creates a *helper expression* that evaluates a given expression without showing it in the expressions list. The `options` must include a LaTeX expression (e.g. `{ latex: 'a' }`). This returns a HelperExpression object whose `numericValue` or `listValue` will update as the expression's value changes.</description>
    <parameters>
      <parameter name="options" type="Object" required="true">
        Object with at least a `latex` property defining the expression to evaluate.
      </parameter>
    </parameters>
    <returns>
      <type>HelperExpression</type>
      <description>A HelperExpression object with observable properties `numericValue` (if the expression is a number) and `listValue` (if the expression evaluates to a list).</description>
    </returns>
    <examples>
      <example name="variable">
        <code>
// Define a variable K in the calculator and create a helper expression to monitor K's value
calculator.setExpression({ id:'K', latex: 'K=5' });
var K = calculator.HelperExpression({ latex: 'K' });
K.observe('numericValue', function(){ 
  console.log('K is now', K.numericValue); 
});
        </code>
        <description>Monitoring the value of a variable in the calculator.</description>
      </example>
      <example name="computation">
        <code>
// Monitor a computation result without adding it to the expressions list
var area = calculator.HelperExpression({ latex: 'r^2\\pi' });
area.observe('numericValue', function() {
  document.getElementById('area-display').textContent = 
    'Area: ' + area.numericValue.toFixed(2) + ' square units';
});
        </code>
        <description>Performing a computation without showing it in the expressions list.</description>
      </example>
    </examples>
    <errors>
      <e>If the LaTeX is invalid or cannot be evaluated to a number or list, the `numericValue` and `listValue` properties may be undefined.</e>
      <e>Helper expressions don't support all the features of regular expressions (like table manipulation).</e>
    </errors>
    <related_functions>
      <function>setExpression</function>
      <function>expressionAnalysis</function>
    </related_functions>
    <tags>
      <tag>expression</tag>
      <tag>evaluation</tag>
      <tag>helper</tag>
      <tag>observe</tag>
    </tags>
    <domain>expressions</domain>
    <action>create</action>
    <object>helper</object>
  </function>
</desmos_api>

## Constants and Utilities

<desmos_api version="1.10" type="Standard">
  <function name="Desmos.Colors">
    <importance>Common</importance>
    <description>Predefined color constants for graph elements. The default palette includes: `Desmos.Colors.RED` (`#c74440`), `BLUE` (`#2d70b3`), `GREEN` (`#388c46`), `PURPLE` (`#6042a6`), `ORANGE` (`#fa7e19`), `BLACK` (`#000000`). These correspond to the default cycle of colors for expressions. You can override the palette via the `colors` constructor option.</description>
    <parameters></parameters>
    <returns>
      <type>Object</type>
      <description>Object containing color constants as CSS color strings.</description>
    </returns>
    <examples>
      <example name="basic">
        <code>
// Use a predefined color for an expression
calculator.setExpression({
  id: 'parabola',
  latex: 'y=x^2',
  color: Desmos.Colors.RED
});
        </code>
        <description>Applying a standard color to an expression.</description>
      </example>
    </examples>
    <errors>
      <e>Color values may change in future API versions if Desmos updates their color palette.</e>
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
    <description>Predefined drawing style constants for points and curves. For points: `Desmos.Styles.POINT` (default filled circle), `Desmos.Styles.OPEN` (hollow circle), `Desmos.Styles.CROSS` (crosshair mark). For curves: `Desmos.Styles.SOLID` (solid line), `Desmos.Styles.DASHED`, `Desmos.Styles.DOTTED`. Note: Using OPEN or CROSS styles for points requires the point's `dragMode` to be `NONE` (or a static point).</description>
    <parameters></parameters>
    <returns>
      <type>Object</type>
      <description>Object containing style constants for points and lines.</description>
    </returns>
    <examples>
      <example name="points">
        <code>
// Create a point with an open circle style
calculator.setExpression({
  id: 'point1',
  latex: '(3,4)',
  pointStyle: Desmos.Styles.OPEN,
  dragMode: Desmos.DragModes.NONE  // Required for OPEN style
});
        </code>
        <description>Setting a point to use an open circle style.</description>
      </example>
      <example name="lines">
        <code>
// Create a dashed line
calculator.setExpression({
  id: 'dashed',
  latex: 'y=2x+1',
  lineStyle: Desmos.Styles.DASHED
});
        </code>
        <description>Creating a line with a dashed style.</description>
      </example>
    </examples>
    <errors>
      <e>Using OPEN or CROSS styles with draggable points may not work as expected. Set `dragMode` to `Desmos.DragModes.NONE` for these styles.</e>
    </errors>
    <related_functions>
      <function>setExpression</function>
      <function>Desmos.DragModes</function>
    </related_functions>
    <tags>
      <tag>styles</tag>
      <tag>constants</tag>
      <tag>points</tag>
      <tag>lines</tag>
    </tags>
    <domain>styling</domain>
    <action>read</action>
    <object>styles</object>
  </function>

  <function name="Desmos.DragModes">
    <importance>Common</importance>
    <description>Constants controlling how a point in the graph can be dragged by the user. Possible values: `Desmos.DragModes.X` (draggable only along x-axis), `Y` (y-axis only), `XY` (free drag in both directions), `NONE` (not draggable). There's also `Desmos.DragModes.AUTO`, which lets the calculator decide based on context (e.g., a point defined by slider variables will default to XY, whereas one on a static function might be NONE).</description>
    <parameters></parameters>
    <returns>
      <type>Object</type>
      <description>Object containing drag mode constants.</description>
    </returns>
    <examples>
      <example name="horiz">
        <code>
// Create a point that can only be dragged horizontally
calculator.setExpression({
  id: 'xSlider',
  latex: '(a,3)',  // a point at y=3 that can be dragged left/right
  dragMode: Desmos.DragModes.X  // Only allow horizontal dragging
});
        </code>
        <description>Creating a horizontally-draggable point (x-axis only).</description>
      </example>
      <example name="# Desmos Standard API v1.10 Reference

## Overview

The Desmos Standard API v1.10 provides functionality for embedding an interactive graphing calculator in web applications. It allows programmatic control of the calculator's state, expressions, viewport, and appearance.

## Quick Start

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

## Function Index by Domain

### Core Functions
- [GraphingCalculator](#graphingcalculator) - Create a calculator instance
- [destroy](#destroy) - Clean up calculator resources
- [getState](#getstate) - Get calculator state
- [setState](#setstate) - Restore calculator state
- [setBlank](#setblank) - Clear calculator to blank state

### Expression Management
- [setExpression](#setexpression) - Add or update expression
- [setExpressions](#setexpressions) - Add or update multiple expressions
- [removeExpression](#removeexpression) - Remove expression
- [removeExpressions](#removeexpressions) - Remove multiple expressions
- [getExpressions](#getexpressions) - Get all expressions

### Viewport Management
- [setMathBounds](#setmathbounds) - Set visible region
- [graphpaperBounds](#graphpaperbounds) - Get current bounds
- [mathToPixels](#mathtopixels) - Convert math to pixel coordinates
- [pixelsToMath](#pixelstomath) - Convert pixel to math coordinates

### Event Handling
- [observeEvent](#observeevent) - Register event callback
- [unobserveEvent](#unobserveevent) - Remove event callback
- [observe](#observe) - Observe property changes
- [unobserve](#unobserve) - Stop observing property

### Settings and UI
- [updateSettings](#updatesettings) - Change calculator settings
- [setGraphSettings](#setgraphsettings) - Update graph settings (deprecated)
- [isProjectionUniform](#isprojectionuniform) - Check if x/y scales match
- [focusFirstExpression](#focusfirstexpression) - Focus first expression
- [openKeypad](#openkeypad) - Open onscreen keypad
- [resize](#resize) - Resize the calculator

### History Management
- [undo](#undo) - Undo last action
- [redo](#redo) - Redo previously undone action
- [clearHistory](#clearhistory) - Clear undo/redo history
- [withHistoryReplacement](#withhistoryreplacement) - Merge multiple changes

### Image Capture
- [screenshot](#screenshot) - Capture calculator image
- [asyncScreenshot](#asyncscreenshot) - Capture calculator image asynchronously

## Detailed API Documentation

<desmos_api version="1.10" type="Standard">
  <function name="GraphingCalculator">
    <importance>Core</importance>
    <description>Creates a graphing calculator inside the specified DOM element. Returns a `GraphingCalculator` instance with methods to set expressions, adjust the viewport, etc.</description>
    <parameters>
      <parameter name="element" type="HTMLElement" required="true">
        The HTML container element in which the calculator will be rendered.
      </parameter>
      <parameter name="options" type="Object" required="false">
        Configuration options for the calculator. Common options include:
        - `keypad` (boolean, default: true): Show the onscreen keypad.
        - `expressions` (boolean, default: true): Show the expressions list (left panel).
        - `settingsMenu` (boolean, default: true): Show the settings menu (wrench icon).
        - `zoomButtons` (boolean, default: true): Show zoom in/out buttons.
        - `border` (boolean, default: true): Add a 1px gray border around the calculator.
        - `lockViewport` (boolean, default: false): Disable user panning and zooming.
        - And many more (see the complete API documentation).
      </parameter>
    </parameters>
    <returns>
      <type>GraphingCalculator</type>
      <description>A GraphingCalculator instance that can be used to control the calculator.</description>
    </returns>
    <examples>
      <example name="basic">
        <code>
// Basic initialization
var elt = document.getElementById('calculator');
var calculator = Desmos.GraphingCalculator(elt);
        </code>
        <description>Creating a basic calculator with default settings.</description>
      </example>
      <example name="options">
        <code>
// Creating a calculator with custom options
var elt = document.getElementById('calculator');
var calculator = Desmos.GraphingCalculator(elt, {
  expressions: false,  // Hide the expressions panel
  zoomButtons: false,  // Hide zoom buttons
  border: true,        // Show border
  lockViewport: true   // Prevent user from panning/zooming
});
        </code>
        <description>Creating a calculator with specific display options.</description>
      </example>
    </examples>
    <errors>
      <e>If the `element` is not a valid DOM element or is `null`, the constructor will fail to initialize the calculator properly.</e>
      <e>If the calculator doesn't appear, ensure the container element has a non-zero width and height, and is in the DOM.</e>
    </errors>
    <related_functions>
      <function>destroy</function>
      <function>updateSettings</function>
    </related_functions>
    <tags>
      <tag>initialization</tag>
      <tag>constructor</tag>
      <tag>graphing</tag>
      <tag>calculator</tag>
    </tags>
    <domain>initialization</domain>
    <action>create</action>
    <object>calculator</object>
  </function>

  <function name="destroy">
    <importance>Core</importance>
    <description>Destroys the calculator instance, removing it from the DOM and freeing resources. After calling `destroy()`, any further method calls on that calculator object will have no effect and may log a warning to the console.</description>
    <parameters></parameters>
    <returns>
      <type>void</type>
      <description>No return value.</description>
    </returns>
    <examples>
      <example name="basic">
        <code>
// Properly dispose of the calculator
calculator.destroy();
        </code>
        <description>Cleaning up a calculator when it's no longer needed.</description>
      </example>
    </examples>
    <errors>
      <e>Attempting to use any calculator API method after calling `destroy()` will not work. Always ensure you don't call methods on a destroyed instance.</e>
      <e>Failing to call `destroy()` when removing a calculator can cause memory leaks from event listeners.</e>
    </errors>
    <related_functions>
      <function>GraphingCalculator</function>
    </related_functions>
    <tags>
      <tag>cleanup</tag>
      <tag>disposal</tag>
      <tag>memory</tag>
    </tags>
    <domain>initialization</domain>
    <action>delete</action>
    <object>calculator</object>
  </function>

  <function name="setExpression">
    <importance>Core</importance>
    <description>Adds or updates a mathematical expression in the calculator. The `expression_state` is an object describing the expression. If an expression with the same `id` exists, it is updated; otherwise a new expression is created. This function returns no value. If the expression is invalid or causes an error, it will be added but not plotted.</description>
    <parameters>
      <parameter name="expression_state" type="Object" required="true">
        Object with properties defining the expression. Common fields include:
        - `id` (string, optional): Unique identifier for the expression. If not provided, one will be auto-generated.
        - `latex` (string): LaTeX string defining the expression (e.g., "y=x^2").
        - `color` (string, optional): Color of the expression (can use Desmos.Colors constants).
        - `hidden` (boolean, optional): Whether to hide the expression from the graph.
        - `secret` (boolean, optional): Whether the expression is hidden from the expression list.
        - `type` (string, optional): Type of item ('expression', 'table', 'text', etc.).
        - And many more specialized properties depending on expression type.
      </parameter>
    </parameters>
    <returns>
      <type>undefined</type>
      <description>No return value.</description>
    </returns>
    <examples>
      <example name="basic">
        <code>
// Plot a line by adding a new expression
calculator.setExpression({ latex: 'y=2x+1' });
        </code>
        <description>Adding a simple line equation to the calculator.</description>
      </example>
      <example name="update">
        <code>
// Create an expression with a specific id, then update its color
calculator.setExpression({ id: 'parabola', latex: 'y=x^2' });
calculator.setExpression({ id: 'parabola', color: Desmos.Colors.BLUE });
        </code>
        <description>Creating an expression and then updating one of its properties.</description>
      </example>
      <example name="table">
        <code>
// Add a table with two columns
calculator.setExpression({
  type: 'table',
  id: 'data-table',
  columns: [
    { latex: 'x', values: ['1', '2', '3', '4'] },
    { latex: 'y', values: ['2', '4', '6', '8'] }
  ]
});
        </code>
        <description>Creating a table with x and y values.</description>
      </example>
    </examples>
    <errors>
      <e>If the LaTeX is invalid or cannot be parsed, the expression will be added to the list but may display as an error or not graph.</e>
      <e>If updating an expression with a different type, the update may fail (types cannot be changed).</e>
      <e>Missing required properties for a specific expression type (e.g., 'columns' for a table) will cause undefined behavior.</e>
    </errors>
    <related_functions>
      <function>getExpressions</function>
      <function>removeExpression</function>
      <function>setExpressions</function>
    </related_functions>
    <tags>
      <tag>expressions</tag>
      <tag>latex</tag>
      <tag>graph</tag>
      <tag>equation</tag>
    </tags>
    <domain>expressions</domain>
    <action>create</action>
    <action>update</action>
    <object>expression</object>
  </function>

  <function name="getState">
    <importance>Common</importance>
    <description>Returns a JavaScript object representing the full current state of the calculator (all expressions, settings, viewport, etc). This state object can be serialized (e.g. via `JSON.stringify`) for storage or transmission. Treat the state as an opaque snapshot; modifying it directly is not recommended.</description>
    <parameters></parameters>
    <returns>
      <type>Object</type>
      <description>Object representing the calculator state.</description>
    </returns>
    <examples>
      <example name="save">
        <code>
// Get the current state and serialize it to a string
var state = calculator.getState();
var stateString = JSON.stringify(state); 
// Save stateString to storage or send to a server
        </code>
        <description>Saving the calculator state for later restoration.</description>
      </example>
    </examples>
    <errors>
      <e>The returned state object should not be modified directly. Altering it may result in an invalid state that cannot be loaded by `setState`.</e>
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
    <description>Loads a previously saved state into the calculator, replacing the current graph with the given `state` object (usually obtained from `getState`). An optional `options` object can be provided to control behavior while setting state.</description>
    <parameters>
      <parameter name="state" type="Object" required="true">
        Object representing a calculator state (as returned by `getState`).
      </parameter>
      <parameter name="options" type="Object" required="false">
        Optional object with settings:
        - `allowUndo` (boolean): If true, incorporate this action into the undo history (allowing user to undo the state load).
        - `remapColors` (boolean): If true, remap any colors in the saved state to those in the current palette.
      </parameter>
    </parameters>
    <returns>
      <type>undefined</type>
      <description>No return value.</description>
    </returns>
    <examples>
      <example name="basic">
        <code>
// Restore a graph state from a saved stateObject
calculator.setState(stateObject);
        </code>
        <description>Loading a previously saved state.</description>
      </example>
      <example name="withOptions">
        <code>
// Restore state and preserve the action in undo history
calculator.setState(stateObject, { allowUndo: true });
        </code>
        <description>Loading a state while allowing the user to undo the operation.</description>
      </example>
    </examples>
    <errors>
      <e>If the provided state object is not one that was generated by `getState` or has been improperly modified, the calculator may fail to load it correctly.</e>
      <e>Loading a state with `allowUndo: false` (the default) clears any prior undo history. If preserving user undo history is important, use `allowUndo: true`.</e>
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
    <description>Clears the calculator to a blank state (no expressions). This is equivalent to loading an empty state. If an options object is provided with `options.allowUndo=true`, the blanking action will be added to undo history (so the user can undo the clear).</description>
    <parameters>
      <parameter name="options" type="Object" required="false">
        Optional object with settings:
        - `allowUndo` (boolean): If true, the clearing action will be undoable.
      </parameter>
    </parameters>
    <returns>
      <type>undefined</type>
      <description>No return value.</description>
    </returns>
    <examples>
      <example name="basic">
        <code>
// Clear all expressions from the calculator
calculator.setBlank();
        </code>
        <description>Resetting the calculator to an empty state.</description>
      </example>
      <example name="undoable">
        <code>
// Clear the calculator but allow the user to undo the clear
calculator.setBlank({ allowUndo: true });
        </code>
        <description>Clearing the calculator while preserving the ability to undo.</description>
      </example>
    </examples>
    <errors>
      <e>Calling `setBlank()` when the calculator is already blank has no effect (no error).</e>
      <e>By default, `setBlank()` will clear the undo history as well. Use `allowUndo: true` if you want to preserve undo history.</e>
    </errors>
    <related_functions>
      <function>setState</function>
      <function>getState</function>
    </related_functions>
    <tags>
      <tag>state</tag>
      <tag>clear</tag>
      <tag>reset</tag>
    </tags>
    <domain>state</domain>
    <action>update</action>
    <object>calculator</object>
  </function>

  <function name="setDefaultState">
    <importance>Common</importance>
    <description>Sets a default state for the calculator, which is used for resetting. After calling this, the calculator's "Delete All" button in the UI will turn into a "Reset" button that restores this state, and the home zoom button will also return to the view from this state. If the calculator was constructed with `showResetButtonOnGraphpaper:true`, a reset icon will also appear on the graph paper.</description>
    <parameters>
      <parameter name="state" type="Object" required="true">
        A state object (as from getState) representing the desired default graph state.
      </parameter>
    </parameters>
    <returns>
      <type>undefined</type>
      <description>No return value.</description>
    </returns>
    <examples>
      <example name="basic">
        <code>
// Save the current state and set it as the new default state
var saved = calculator.getState();
calculator.setDefaultState(saved);
// Future resets will return to this state
        </code>
        <description>Setting a default state that can be used as a reset point.</description>
      </example>
    </examples>
    <errors>
      <e>If the state object is invalid or corrupt, the default state might not apply correctly.</e>
      <e>The reset button may not be visible unless you've enabled `showResetButtonOnGraphpaper` in the calculator options.</e>
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

  <function name="setExpressions">
    <importance>Common</importance>
    <description>Adds or updates multiple expressions in one call. `expression_states` should be an array of objects, each of which is a valid argument to `setExpression`. This method will iterate through the array and set each expression in sequence (equivalent to calling `setExpression` on each item).</description>
    <parameters>
      <parameter name="expression_states" type="Array<Object>" required="true">
        Array of expression definition objects (same format as single `setExpression` calls).
      </parameter>
    </parameters>
    <returns>
      <type>undefined</type>
      <description>No return value.</description>
    </returns>
    <examples>
      <example name="basic">
        <code>
// Add two expressions to the graph in one batch call
calculator.setExpressions([
    { id: 'p1', latex: 'y=x^2' },
    { id: 'p2', latex: 'y=x^3', color: Desmos.Colors.BLUE }
]);
        </code>
        <description>Adding multiple expressions in a single call.</description>
      </example>
    </examples>
    <errors>
      <e>If any individual expression in the array is invalid, that specific expression will not be added or updated, but the rest will still be processed.</e>
      <e>This method simply calls `setExpression` for each element in the array, so all the same error conditions apply to each individual expression.</e>
    </errors>
    <related_functions>
      <function>setExpression</function>
      <function>removeExpressions</function>
    </related_functions>
    <tags>
      <tag>expressions</tag>
      <tag>batch</tag>
      <tag>update</tag>
    </tags>
    <domain>expressions</domain>
    <action>create</action>
    <action>update</action>
    <object>expression</object>
  </function>

  <function name="removeExpression">
    <importance>Common</importance>
    <description>Removes a single expression from the expressions list. The `expression_state` should be an object with an `id` property identifying which expression to remove.</description>
    <parameters>
      <parameter name="expression_state" type="Object" required="true">
        Object with at least an `id` field (string) corresponding to the expression to delete.
      </parameter>
    </parameters>
    <returns>
      <type>undefined</type>
      <description>No return value.</description>
    </returns>
    <examples>
      <example name="basic">
        <code>
// Remove the expression with id 'parabola' from the graph
calculator.removeExpression({ id: 'parabola' });
        </code>
        <description>Removing a specific expression by ID.</description>
      </example>
    </examples>
    <errors>
      <e>If the given ID does not exist, `removeExpression` does nothing (no error).</e>
      <e>The argument must be an object with an `id` property, not just a string ID. Passing a string directly will not work.</e>
    </errors>
    <related_functions>
      <function>setExpression</function>
      <function>removeExpressions</function>
    </related_functions>
    <tags>
      <tag>expressions</tag>
      <tag>remove</tag>
      <tag>delete</tag>
    </tags>
    <domain>expressions</domain>
    <action>delete</action>
    <object>expression</object>
  </function>

  <function name="removeExpressions">
    <importance>Common</importance>
    <description>Removes multiple expressions at once. `expression_states` should be an array of objects each with an `id` field. It is equivalent to calling `removeExpression` on each element.</description>
    <parameters>
      <parameter name="expression_states" type="Array<Object>" required="true">
        Array of objects, each with an `id` for an expression to remove.
      </parameter>
    </parameters>
    <returns>
      <type>undefined</type>
      <description>No return value.</description>
    </returns>
    <examples>
      <example name="basic">
        <code>
// Remove two expressions with ids 'e1' and 'e2'
calculator.removeExpressions([{ id: 'e1' }, { id: 'e2' }]);
        </code>
        <description>Removing multiple expressions in a single call.</description>
      </example>
    </examples>
    <errors>
      <e>As with `removeExpression`, any IDs that don't exist are simply ignored.</e>
      <e>The argument must be an array of objects with `id` properties, not an array of strings.</e>
    </errors>
    <related_functions>
      <function>removeExpression</function>
      <function>setExpressions</function>
    </related_functions>
    <tags>
      <tag>expressions</tag>
      <tag>remove</tag>
      <tag>delete</tag>
      <tag>batch</tag>
    </tags>
    <domain>expressions</domain>
    <action>delete</action>
    <object>expression</object>
  </function>

  <function name="getExpressions">
    <importance>Common</importance>
    <description>Returns an array of objects representing all current expressions in the calculator. Each object is in the same format that could be passed to `setExpression` (including id, latex, and other properties).</description>
    <parameters></parameters>
    <returns>
      <type>Array<Object></type>
      <description>Array of expression state objects.</description>
    </returns>
    <examples>
      <example name="basic">
        <code>
// Get all expressions and log the count
var exprList = calculator.getExpressions();
console.log(exprList.length + ' expressions currently.');
        </code>
        <description>Retrieving all expressions from the calculator.</description>
      </example>
      <example name="filter">
        <code>
// Find all visible expressions
var visibleExpressions = calculator.getExpressions()
    .filter(function(expr) { return !expr.hidden; });
        </code>
        <description>Getting only the visible expressions.</description>
      </example>
    </examples>
    <errors>
      <e>If you modify the returned array or its objects, it will not affect the calculator until you pass them back via setExpression(s).</e>
      <e>This method returns an empty array if there are no expressions (not an error).</e>
    </errors>
    <related_functions>
      <function>setExpression</function>
      <function>expressionAnalysis</function>
    </related_functions>
    <tags>
      <tag>expressions</tag>
      <tag>list</tag>
      <tag>read</tag>
    </tags>
    <domain>expressions</domain>
    <action>read</action>
    <object>expression</object>
  </function>

  <function name="expressionAnalysis">
    <importance>Specialized</importance>
    <description>An object mapping each expression's `id` to information about its evaluation and graphability. For each expression, it provides properties like `isGraphable` (whether it can be graphed), `isError` (whether it has an error), `errorMessage` (localized error text if any), and `evaluation` (numerical value(s) if applicable). This object is updated asynchronously as expressions are parsed; to react to changes, observe 'expressionAnalysis' via `calculator.observe`.</description>
    <parameters></parameters>
    <returns>
      <type>Object</type>
      <description>An object mapping expression IDs to analysis information.</description>
    </returns>
    <examples>
      <example name="observe">
        <code>
// Observe analysis updates and log any expression errors
calculator.observe('expressionAnalysis', function(){
    var analysis = calculator.expressionAnalysis;
    for(var id in analysis){
        if(analysis[id].isError){ 
            console.error('Expr ' + id + ' error:', analysis[id].errorMessage); 
        }
    }
});
        </code>
        <description>Setting up an observer to monitor expression errors.</description>
      </example>
      <example name="direct">
        <code>
// Check if a specific expression is graphable
var analysis = calculator.expressionAnalysis;
if(analysis['myExpr'] && analysis['myExpr'].isGraphable){
  console.log('Expression is ready to graph');
}
        </code>
        <description>Checking the status of a specific expression.</description>
      </example>
    </examples>
    <errors>
      <e>Because this property updates asynchronously, reading it immediately after setting expressions may not reflect the latest state. Use `calculator.observe('expressionAnalysis', ...)` for reactive updates.</e>
      <e>If an expression ID doesn't exist in the analysis object, it means the expression hasn't been processed yet or doesn't exist.</e>
    </errors>
    <related_functions>
      <function>getExpressions</function>
      <function>observe</function>
    </related_functions>
    <tags>
      <tag>expressions</tag>
      <tag>analysis</tag>
      <tag>evaluation</tag>
      <tag>errors</tag>
    </tags>
    <domain>expressions</domain>
    <action>read</action>
    <object>analysis</object>
  </function>

  <function name="updateSettings">
    <importance>Common</importance>
    <description>Updates calculator display settings on the fly (e.g., graph axes, grid, language, etc). `settings` is an object with one or more supported settings properties to change. This can adjust things like axis labels, degree/radian mode, language, projector mode, etc. It behaves like providing new options to the calculator after initialization.</description>
    <parameters>
      <parameter name="settings" type="Object" required="true">
        Object with any of the calculator's settings keys and their new values (same keys as accepted in the constructor options or other runtime settings like `xAxisLabel`, `randomSeed`, `degreeMode`, `language`, etc).
      </parameter>
    </parameters>
    <returns>
      <type>undefined</type>
      <description>No return value.</description>
    </returns>
    <examples>
      <example name="axes">
        <code>
// Change the axis labels on the fly
calculator.updateSettings({ 
  xAxisLabel: 'Time', 
  yAxisLabel: 'Value' 
});
        </code>
        <description>Updating axis labels.</description>
      </example>
      <example name="display">
        <code>
// Enable projector mode (makes fonts and lines thicker for better visibility)
calculator.updateSettings({ projectorMode: true });
        </code>
        <description>Enabling high-visibility mode for presentations.</description>
      </example>
      <example name="ui">
        <code>
// Hide the expressions panel
calculator.updateSettings({ expressions: false });
        </code>
        <description>Hiding a UI element.</description>
      </example>
    </examples>
    <errors>
      <e>If a setting name is not recognized, it will be silently ignored (no error).</e>
      <e>Some settings combinations may not be valid (e.g., certain options might be mutually exclusive).</e>
    </errors>
    <related_functions>
      <function>setGraphSettings</function>
    </related_functions>
    <tags>
      <tag>settings</tag>
      <tag>configuration</tag>
      <tag>display</tag>
      <tag>ui</tag>
    </tags>
    <domain>settings</domain>
    <action>update</action>
    <object>settings</object>
  </function>

  <function name="setGraphSettings">
    <importance>Specialized</importance>
    <description>**Deprecated.** Former method to update graph settings, now replaced by `updateSettings`. It functions similarly to updateSettings by applying provided settings, but using this is no longer recommended.</description>
    <parameters>
      <parameter name="settings" type="Object" required="true">
        Settings object (same as in updateSettings) specifying changes to make. Only included for backward compatibility.
      </parameter>
    </parameters>
    <returns>
      <type>undefined</type>
      <description>No return value.</description>
    </returns>
    <examples>
      <example name="deprecated">
        <code>
// (Deprecated usage) Update settings
calculator.setGraphSettings({ xAxisLabel: 'Time' });

// Preferred method:
calculator.updateSettings({ xAxisLabel: 'Time' });
        </code>
        <description>Deprecated way to update settings (use updateSettings instead).</description>
      </example>
    </examples>
    <errors>
      <e>This method is deprecated and may be removed in a future release. Use `updateSettings` instead to ensure forward compatibility.</e>
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
    <description>Sets the visible math coordinate bounds of the graph (the viewport). `bounds` must be an object with numeric properties `left`, `right`, `bottom`, and `top` specifying the desired axis range. If the provided bounds are invalid (e.g., left >= right or top <= bottom), the viewport will not change.</description>
    <parameters>
      <parameter name="bounds" type="Object" required="true">
        Object with `left`, `right`, `top`, `bottom` numbers representing the math coordinates of the new view window.
      </parameter>
    </parameters>
    <returns>
      <type>undefined</type>
      <description>No return value.</description>
    </returns>
    <examples>
      <example name="basic">
        <code>
// Zoom/pan the view to x-axis from 0 to 10 and y-axis from -5 to 5
calculator.setMathBounds({ left: 0, right: 10, bottom: -5, top: 5 });
        </code>
        <description>Setting the viewport to a specific region.</description>
      </example>
      <example name="square">
        <code>
// Set a square viewport with equal scaling on x and y
calculator.setMathBounds({ left: -5, right: 5, bottom: -5, top: 5 });
        </code>
        <description>Creating a viewport with equal scaling on both axes.</description>
      </example>
    </examples>
    <errors>
      <e>If the bounds values are invalid (e.g., `right <= left` or `top <= bottom`), the viewport will not change.</e>
      <e>If the calculator has `lockViewport: true`, calling this method may have no visual effect unless that setting is first disabled.</e>
    </errors>
    <related_functions>
      <function>mathToPixels</function>
      <function>pixelsToMath</function>
      <function>graphpaperBounds</function>
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

  <function name="screenshot">
    <importance>Common</importance>
    <description>Captures a screenshot of the current graph as a PNG image data URI string. This allows exporting the drawing as an image. The method can take an optional `opts` object to specify image dimensions and quality.</description>
    <parameters>
      <parameter name="opts" type="Object" required="false">
        Optional object with properties:
        - `width` (number): Width of the output image in pixels (default: current width).
        - `height` (number): Height of the output image in pixels (default: current height).
        - `targetPixelRatio` (number): Oversampling factor for high-DPI output (default: 1).
        - `preserveAxisNumbers` (boolean): Whether to include axis numbers on small images (default: false).
        - `showMovablePoints` (boolean): Whether to show the drag points' halo in the image (default: false).
      </parameter>
    </parameters>
    <returns>
      <type>String</type>
      <description>String containing a PNG image data URL.</description>
    </returns>
    <examples>
      <example name="basic">
        <code>
// Capture a screenshot of the current graph and set it as the source of an <img> element
var imgData = calculator.screenshot();
document.getElementById('preview').src = imgData;
        </code>
        <description>Capturing the current graph as a PNG image.</description>
      </example>
      <example name="highRes">
        <code>
// Capture a high-resolution thumbnail
var thumbnail = calculator.screenshot({ 
  width: 200, 
  height: 200, 
  targetPixelRatio: 2 
});
// Create an image element with the thumbnail
var img = document.createElement('img');
img.src = thumbnail;
img.width = 200;  // Display size (actual image is 400x400)
img.height = 200;
document.body.appendChild(img);
        </code>
        <description>Creating a high-resolution screenshot for retina displays.</description>
      </example>
    </examples>
    <errors>
      <e>For very large images, this synchronous method might freeze the UI momentarily. Consider using `asyncScreenshot` for large captures.</e>
      <e>If the graph contains external images that violate cross-origin policies, they may not appear in the screenshot.</e>
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
    <description>Asynchronously captures a screenshot of the graph. Instead of returning the image data, it invokes the provided `callback` with the image data when ready. Supports all `opts` from `screenshot()`, plus allows capturing an SVG format by specifying `opts.format:'svg'`. Using asyncScreenshot ensures the graph is fully plotted/evaluated before capture and can capture regions beyond the current view.</description>
    <parameters>
      <parameter name="opts" type="Object" required="false">
        Optional settings object (same as `screenshot`, plus `format: 'png'|'svg'` and advanced viewport options).
      </parameter>
      <parameter name="callback" type="Function" required="true">
        Function to receive the screenshot data. It will be called with a single argument which is either a PNG data URI or an SVG string, depending on format.
      </parameter>
    </parameters>
    <returns>
      <type>undefined</type>
      <description>No return value. Results are delivered via the callback.</description>
    </returns>
    <examples>
      <example name="basic">
        <code>
// Capture a screenshot asynchronously (default PNG format)
calculator.asyncScreenshot({}, function(data) {
  // Use the data URI (PNG format)
  document.getElementById('preview').src = data;
});
        </code>
        <description>Capturing a screenshot asynchronously to avoid UI freezing.</description>
      </example>
      <example name="svg">
        <code>
// Capture an SVG screenshot asynchronously
calculator.asyncScreenshot({ format: 'svg' }, function(data){
  // Data is an SVG string that can be embedded or saved
  console.log('SVG data length:', data.length);
  
  // Example: embed the SVG directly in the page
  var container = document.getElementById('svg-container');
  container.innerHTML = data;
});
        </code>
        <description>Capturing the graph as an SVG image for scalable graphics.</description>
      </example>
    </examples>
    <errors>
      <e>If there's an error during capture, the callback might be called with an empty string or error object.</e>
      <e>SVG format may not perfectly match the PNG output, especially for complex graphs or certain visual effects.</e>
    </errors>
    <related_functions>
      <function>screenshot</function>
    </related_functions>
    <tags>
      <tag>image</tag>
      <tag>screenshot</tag>
      <tag>capture</tag>
      <tag>export</tag>
      <tag>async</tag>
    </tags>
    <domain>export</domain>
    <action>read</action>
    <object>image</object>
  </function>

  <function name="observeEvent">
    <importance>Common</importance>
    <description>Registers a callback to be invoked when a specific calculator event occurs. Currently, the only supported eventName is `'change'`, which fires whenever any change occurs that affects the calculator's state (either via user interaction or API calls). You can namespace events (e.g. `'change.myTag'`) to remove or identify specific listeners later.</description>
    <parameters>
      <parameter name="eventName" type="String" required="true">
        The name of the event to observe (e.g. 'change' or 'change.namespace').
      </parameter>
      <parameter name="callback" type="Function" required="true">
        Function to call when the event occurs. Receives parameters `(eventName, eventData)`; for the 'change' event, `eventData.isUserInitiated` (boolean) indicates if a user triggered the change.
      </parameter>
    </parameters>
    <returns>
      <type>undefined</type>
      <description>No return value.</description>
    </returns>
    <examples>
      <example name="basic">
        <code>
// Log a message whenever the graph state changes
calculator.observeEvent('change', function(){ 
  console.log('Graph changed'); 
});
        </code>
        <description>Setting up a basic change observer.</description>
      </example>
      <example name="namespace">
        <code>
// Attach a namespaced 'change' event observer
function saveFunction() {
  // Save the current state
  localStorage.setItem('graphState', JSON.stringify(calculator.getState()));
}

// Add the observer with a namespace
calculator.observeEvent('change.save', saveFunction);

// Later, you can remove it using that namespace:
calculator.unobserveEvent('change.save');
        </code>
        <description>Using a namespaced event observer for easier management.</description>
      </example>
    </examples>
    <errors>
      <e>Using an unsupported event name will have no effect (no error is thrown, but your callback won't ever be called).</e>
      <e>Be careful not to do heavy processing in the callback without throttling or debouncing, as 'change' can fire frequently.</e>
    </errors>
    <related_functions>
      <function>unobserveEvent</function>
      <function>observe</function>
    </related_functions>
    <tags>
      <tag>events</tag>
      <tag>observe</tag>
      <tag>callback</tag>
      <tag>listen</tag>
    </tags>
    <domain>events</domain>
    <action>create</action>
    <object>observer</object>
  </function>

  <function name="unobserveEvent">
    <importance>Specialized</importance>
    <description>Removes event observers previously added with `observeEvent`. If a namespace is specified in the eventName, only observers with that namespace are removed; otherwise, all observers for that event are removed.</description>
    <parameters>
      <parameter name="eventName" type="String" required="true">
        Event name (string) matching what was used in observeEvent. Can include namespace (e.g. 'change.save') to remove a specific callback, or just 'change' to remove all.
      </parameter>
    </parameters>
    <returns>
      <type>undefined</type>
      <description>No return value.</description>
    </returns>
    <examples>
      <example name="all">
        <code>
// Remove ALL observers for the 'change' event
calculator.unobserveEvent('change');
        </code>
        <description>Removing all change event observers.</description>
      </example>
      <example name="namespace">
        <code>
// Only remove the autosave observer, keeping any others
calculator.unobserveEvent('change.autosave');
        </code>
        <description>Removing only a specific namespaced observer.</description>
      </example>
    </examples>
    <errors>
      <e>Calling unobserveEvent for an event that has no listeners or a namespace that doesn't exist will do nothing (no error).</e>
    </errors>
    <related_functions>
      <function>observeEvent</function>
    </related_functions>
    <tags>
      <tag>events</tag>
      <tag>observe</tag>
      <tag>callback</tag>
      <tag>remove</tag>
    </tags>
    <domain>events</domain>
    <action>delete</action>
    <object>observer</object>
  </function>

  <function name="observe">
    <importance>Common</importance>
    <description>Observes an **observable property** of the calculator or its sub-objects (such as `graphpaperBounds` or settings properties). When the specified `propertyName` changes, the callback is called. Like events, property observers can be namespaced by suffixing `propertyName` with a dot and an identifier.</description>
    <parameters>
      <parameter name="propertyName" type="String" required="true">
        String name of the property to observe (e.g. 'graphpaperBounds', 'expressionAnalysis', or 'settings.xAxisLabel'). Can include an optional namespace (e.g. 'graphpaperBounds.myObserver').
      </parameter>
      <parameter name="callback" type="Function" required="true">
        Function to execute when the property value changes.
      </parameter>
    </parameters>
    <returns>
      <type>undefined</type>
      <description>No return value.</description>
    </returns>
    <examples>
      <example name="bounds">
        <code>
// Observe changes to the graph viewport
calculator.observe('graphpaperBounds', function(){
    console.log(calculator.graphpaperBounds.mathCoordinates);
});
        </code>
        <description>Monitoring changes to the graph viewport.</description>
      </example>
      <example name="settings">
        <code>
// Observe changes to a specific setting
calculator.observe('settings.degreeMode', function() {
    var isDegrees = calculator.settings.degreeMode;
    console.log('Angle mode is now: ' + (isDegrees ? 'Degrees' : 'Radians'));
});
        </code>
        <description>Watching for changes to a specific calculator setting.</description>
      </example>
    </examples>
    <errors>
      <e>If the property doesn't exist or isn't observable, your callback will never be called (no error).</e>
      <e>As with events, intensive calculations in observers can impact performance.</e>
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
    <description>Removes observers for a given property previously added with `observe`. If a namespace was used, only that specific observer is removed; otherwise all observers for the property are removed.</description>
    <parameters>
      <parameter name="propertyName" type="String" required="true">
        String name of the property (optionally with namespace) whose observers should be removed.
      </parameter>
    </parameters>
    <returns>
      <type>undefined</type>
      <description>No return value.</description>
    </returns>
    <examples>
      <example name="all">
        <code>
// Stop all observers listening to changes in `graphpaperBounds`
calculator.unobserve('graphpaperBounds');
        </code>
        <description>Removing all observers for a property.</description>
      </example>
      <example name="namespace">
        <code>
// Only remove observers with a specific namespace
calculator.unobserve('graphpaperBounds.viewport');
        </code>
        <description>Removing only specific namespaced observers.</description>
      </example>