# GeoGebra Construction and UI Methods

These methods allow for controlling the construction environment and user interface aspects of GeoGebra applets.

## Construction / User Interface

| Method Signature | Since | Description |
|------------------|-------|-------------|
| `void setMode(int mode)` | 2.7 | Sets the mouse mode (i.e. tool) for the graphics window (see toolbar reference and the applet parameters "showToolBar" and "customToolBar") |
| `int getMode()` | 5.0 | Gets the mouse mode (i.e. tool), see toolbar reference for details |
| `void openFile(String strURL)` | 2.7 (Java only) | Opens a construction from a file (given as absolute or relative URL string) |
| `void reset()` | 2.7 | Reloads the initial construction (given in filename parameter) of this applet. |
| `void newConstruction()` | 2.7 | Removes all construction objects |
| `void refreshViews()` | 2.7 | Refreshs all views. Note: this clears all traces in the graphics window. |
| `void setOnTheFlyPointCreationActive(boolean flag)` | 3.2 | Turns on the fly creation of points in graphics view on (true) or off (false). Note: this is useful if you don't want tools to have the side effect of creating points. For example, when this flag is set to false, the tool "line through two points" will not create points on the fly when you click on the background of the graphics view. |
| `void setPointCapture(view, mode)` | 5.0 | Change point capturing mode. view: 1 for graphics, 2 for graphics 2, -1 for 3D. mode: 0 for no capturing, 1 for snap to grid, 2 for fixed to grid, 3 for automatic. |
| `void setRounding(string round)` | 5.0 | The string consists of a number and flags, "s" flag for significant digits, "d" for decimal places (default). JavaScript integers are cast to string automaticlly. Example: "10s", "5", 3 |
| `void hideCursorWhenDragging(boolean flag)` | 3.2 | Hides (true) or shows (false) the mouse cursor (pointer) when dragging an object to change the construction. |
| `void setRepaintingActive(boolean flag)` | 2.7 | Turns the repainting of this applet on (true) or off (false). Note: use this method for efficient repainting when you invoke several methods. |
| `void setErrorDialogsActive(boolean flag)` | 3.0 | Turns showing of error dialogs on (true) or off (false). Note: this is especially useful together with evalCommand(). |
| `void setCoordSystem(double xmin, double xmax, double ymin, double ymax)` | 3.0 | Sets the Cartesian coordinate system of the graphics window. |
| `void setCoordSystem(double xmin, double xmax, double ymin, double ymax, double zmin, double zmax, boolean yVertical)` | 5.0 | Sets the Cartesian coordinate system of the 3D graphics window. The last parameter determines whether y-axis should be oriented vertically. |
| `void setAxesVisible(boolean xAxis, boolean yAxis)` | 3.0 | Shows or hides the x- and y-axis of the coordinate system in the graphics windows 1 and 2. |
| `void setAxesVisible(int viewNumber, boolean xAxis, boolean yAxis, boolean zAxis)` | 5.0 | Shows or hides the x-, y- and z-axis of the coordinate system in given graphics window. |
| `void setUndoPoint()` | 3.2 | Sets an undo point. Useful if you want the user to be able to undo that action of evalCommand eg if you have made an HTML button to act as a custom tool |
| `void setAxisLabels(int viewNumber, String xAxis, String yAxis, String zAxis)` | 5.0 | Set label for the x-, y- and z-axis of the coordinate system in given graphics window. |
| `void setAxisSteps(int viewNumber, double xAxis, double yAxis, double zAxis)` | 5.0 | Set distance for the x-, y- and z-axis of the coordinate system in given graphics window. |
| `void setAxisUnits(int viewNumber, String xAxis, String yAxis, String zAxis)` | 5.0 | Set units for the x-, y- and z-axis of the coordinate system in given graphics window. |
| `void setGridVisible(boolean flag)` | 3.0 | Shows or hides the coordinate grid in the graphics windows 1 and 2. |
| `void setGridVisible(int viewNumber, boolean flag)` | 5.0 | Shows or hides the coordinate grid in given graphics view graphics window. |
| `getGridVisible(int viewNumber)` | 5.0 | Returns true if grid is visible in given view. If view number is omited, returns whether grid is visible in the first graphics view. |
| `getPerspectiveXML()` | 5.0 | Returns an XML representation of the current perspective. |
| `undo()` | 5.0 | Undoes one user action. |
| `redo()` | 5.0 | Redoes one user action. |
| `showToolBar(boolean show)` | HTML5 | Sets visibility of toolbar |
| `setCustomToolBar(String toolbar)` | 5.0 | Sets the layout of the main toolbar, see toolbar reference for details |
| `addCustomTool(String iconURL, String name, String category, Function callback)` | 6.0 (Notes only) | Adds a custom tool with given name and icon (https: or data: URL) to the Notes toolbox. The callback function is called when user selects the tool, it may show custom UI and/or use object creation APIs to create new objects. The category parameter may be one of upload, link or more and specifies in which category to show the new tool; if omitted, the more category is used. |
| `showMenuBar(boolean show)` | HTML5 | Sets visibility of menu bar |
| `showAlgebraInput(boolean show)` | HTML5 | Sets visibility of input bar |
| `showResetIcon(boolean show)` | HTML5 | Sets visibility of reset icon |
| `enableRightClick(boolean enable)` | 5.0 | Enables or disables right click features |
| `enableLabelDrags(boolean enable)` | 5.0 | Enables or disables dragging object labels |
| `enableShiftDragZoom(boolean enable)` | 5.0 | Enables or disables zooming and dragging the view using mouse or keyboard |
| `enableCAS(boolean enable)` | 5.0 | Enables or disables CAS features (both the view and commands) |
| `enable3D(boolean enable)` | 5.0 | Enables or disables the 3D view |
| `void setPerspective(string perspective)` | 5.0 | Changes the open views, see SetPerspective Command for the string interpretation. |
| `setWidth(int width)` | 5.0 (HTML5) | Change width of the applet (in pixels) |
| `setHeight(int height)` | 5.0 (HTML5) | Change height of the applet (in pixels) |
| `setSize(int width, int height)` | 5.0 (HTML5) | Change width and height of the applet (in pixels) |
| `recalculateEnvironments()` | 5.0 (HTML5) | Update the applet after scaling by external CSS |
| `getEditorState()` | 5.0 (HTML5) | Get state of the equation editor in algebra view (or in evaluator applet). Returns JSON object with content and optional fields (caret for graphing app, eval and latex for evaluator app) |
| `setEditorState(Object state)` | 5.0 (HTML5) | Set state of the equation editor in algebra view (or in evaluator applet). The argument should be a JSON (object or string) with content and optional caret field. |
| `getGraphicsOptions(int viewId)` | 5.0 (HTML5) | Get the graphics options for euclidian view specified by viewId. It returns a JSON (object or string) with rightAngleStyle, pointCapturing, grid, gridIsBold, gridType, bgColor, gridColor, axesColor, axes, gridDistance |
| `setGraphicsOptions(int viewId, Object options)` | 5.0 (HTML5) | Set the graphics options for euclidian view specified by viewId. The second argument should be a JSON (object or string) with optional fields with rightAngleStyle, pointCapturing, grid, gridIsBold, gridType, bgColor, gridColor, axesColor, axes, gridDistance |
| `setAlgebraOptions(Object options)` | 5.0 (HTML5) | Set the options for the algebra view. The argument should be a JSON (object or string) with field sortBy |

## Examples

### Example of setAxesVisible

```javascript
ggbApplet.setAxesVisible(3, false, true, true)
```

### Example of setAxisLabels

```javascript
ggbApplet.setAxisLabels(3, "larg", "long", "area")
```

### Example of setAxisSteps

```javascript
ggbApplet.setAxisSteps(3, 2, 1, 0.5)
```

### Example of setAxisUnits

```javascript
ggbApplet.setAxisUnits(3, "cm", "cm", "cm²")
```