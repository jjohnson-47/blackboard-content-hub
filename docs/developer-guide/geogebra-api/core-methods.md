# GeoGebra Core API Methods

## Creating Objects

| Method Signature | Since | Description |
|------------------|-------|-------------|
| `boolean evalCommand(String cmdString)` | 3.0 | Evaluates the given string just like it would be evaluated when entered into GeoGebra's input bar. Returns whether command evaluation was successful. From GeoGebra 3.2 you can pass multiple commands at once by separating them with \n. Note: you must use English commands names |
| `boolean evalLaTex(String input)` | 5.0 | Evaluates LaTeX string to a construction element. Basic syntaxes like x^{2} or \frac are supported. |
| `String evalCommandGetLabels(String cmdString)` | 5.0 | Like evalCommand(), but the return value is a String containing a comma-separated list of the labels of the created objects eg "A,B,C" |
| `String evalCommandCAS(String string)` | 3.2 | Passes the string to GeoGebra's CAS and returns the result as a String. |
| `void insertEmbed(String type, String uri)` | 6.0 (Notes) | Inserts embedded element with specific type and URI. Type and URI are then used to obtain the HTML code for the embed element, see registerEmbedResolver |

## Setting the State of Objects

### General Methods

| Method Signature | Since | Description |
|------------------|-------|-------------|
| `void deleteObject(String objName)` | 2.7 | Deletes the object with the given name. |
| `void setAuxiliary(geo, true/false)` | 5.0 | Affects or not the status of "auxiliary object" to object geo. |
| `void setValue(String objName, double value)` | 3.2 | Sets the double value of the object with the given name. Note: if the specified object is boolean, use a value of 1 to set it to true and any other value to set it to false. For any other object type, nothing is done. |
| `void setTextValue(String objName, String value)` | 3.2 | Sets the text value of the object with the given name. For any other object type, nothing is done. |
| `void setListValue(String objName, int i, double value)` | 5.0 | Sets the value of the list element at position 'i' to 'value' |
| `void setCoords(String objName, double x, double y)` | 3.0 | Sets the coordinates of the object with the given name. Note: if the specified object is not a point, vector, line or absolutely positioned object (text, button, checkbox, input box) nothing is done. |
| `void setCoords(String objName, double x, double y, double z)` | 5.0 | Sets the coordinates of the object with the given name. Note: if the specified object is not a point, vector, line or absolutely positioned object (text, button, checkbox, input box) nothing is done. |
| `void setCaption(String objName, String caption)` | 5.0 | Sets the caption of object with given name. |
| `void setColor(String objName, int red, int green, int blue)` | 2.7 | Sets the color of the object with the given name. |
| `void setVisible(String objName, boolean visible)` | 2.7 | Shows or hides the object with the given name in the graphics window. |
| `void setLabelVisible(String objName, boolean visible)` | 3.0 | Shows or hides the label of the object with the given name in the graphics window. |
| `void setLabelStyle(String objName, int style)` | 3.0 | Sets the label style of the object with the given name in the graphics window. Possible label styles are NAME = 0, NAME_VALUE = 1, VALUE = 2 and (from GeoGebra 3.2) CAPTION = 3 |
| `void setFixed(String objName, boolean fixed, boolean selectionAllowed)` | 3.0 | Sets the "Fixed" and "Selection Allowed" state of the object with the given name. Note: fixed objects cannot be changed. |
| `void setTrace(String objName, boolean flag)` | 3.0 | Turns the trace of the object with the given name on or off. |
| `boolean renameObject(String oldObjName, String newObjName)` | 3.2 | Renames oldObjName to newObjName. Returns whether the rename was successful |
| `void setLayer(String objName, int layer)` | 3.2 | Sets the layer of the object |
| `void setLayerVisible(int layer, boolean visible)` | 3.2 | Shows or hides the all objects in the given layer |
| `void setLineStyle(String objName, int style)` | 3.2 | Sets the line style for the object (0 to 4) |
| `void setLineThickness(String objName, int thickness)` | 3.2 | sets the thickness of the object (1 to 13, -1 for default) |
| `void setPointStyle(String objName, int style)` | 3.2 | Sets the style of points (-1 default, 0 filled circle, 1 cross, 2 circle, 3 plus, 4 filled diamond, 5 unfilled diamond, 6 triangle (north), 7 triangle (south), 8 triangle (east), 9 triangle (west)) - see SetPointStyle Command for the full list |
| `void setPointSize(String objName, int size)` | 3.2 | Sets the size of a point (from 1 to 9) |
| `void setDisplayStyle(String objName, String style)` | 5.0 | Sets the display style of an object. Style should be one of "parametric", "explicit", "implicit", "specific" |
| `void setFilling(String objName, double filling)` | 3.2 | Sets the filling of an object (from 0 to 1) |
| `String getPNGBase64(double exportScale, boolean transparent, double DPI)` | 4.0 | Returns the active Graphics View as a base64-encoded String eg var str = ggbApplet.getPNGBase64(1, true, 72); The DPI setting is slow, set to undefined if you don't need it |
| `void exportSVG(String filename)` or `void exportSVG(function callback)` | HTML5 | Renders the active Graphics View as an SVG and either downloads it as the given filename or sends it to the callback function The value is null if the active view is 3D ggbApplet.exportSVG(svg => console.log("data:image/svg+xml;utf8," + encodeURIComponent(svg))); For Classic 5 compatibility please use ExportImage("type", "svg", "filename", "foo.svg") inside materials |
| `void exportPDF(double scale, String filename, String sliderLabel)` or `void exportPDF(double scale, function callback, String sliderLabel)` | HTML5 | Renders the active Graphics View as a PDF and either downloads it as the given filename or sends it to the callback function ggbApplet.exportPDF(1, pdf => console.log(pdf)); For Classic 5 compatibility please use ExportImage("type", "pdf", "filename", "foo.pdf") instead |
| `void getScreenshotBase64(function callback)` | 5.0 | Gets the screenshot of the whole applet as PNG and sends it to the callback function as a base64 encoded string. Example: ggbApplet.getScreenshotBase64(function(url){window.open("data:image/png;base64,"+url);}); For internal use only, may not work in all browsers |
| `boolean writePNGtoFile(String filename, double exportScale, boolean transparent, double DPI)` | 4.0 | Exports the active Graphics View to a .PNG file. The DPI setting is slow, set to undefined if you don't need it eg var success = ggbApplet.writePNGtoFile("myImage.png", 1, false, 72); |
| `boolean isIndependent(String objName)` | 4.0 | checks if objName is independent |
| `boolean isMoveable(String objName)` | 4.0 | checks if objName is is moveable |
| `void showAllObjects()` | 5.0 | Changes bounds of the Graphics View so that all visible objects are on screen. |
| `void registerEmbedResolver(String type, Function callback)` | 6.0 | Adds a resolving function for specific embedded element type. The function gets an ID of the embed and returns a promise that resolves to a HTML string. |

### Automatic Animation

| Method Signature | Since | Description |
|------------------|-------|-------------|
| `void setAnimating(String objName, boolean animate)` | 3.2 | Sets whether an object should be animated. This does not start the animation yet, use startAnimation() to do so. |
| `void setAnimationSpeed(String objName, double speed)` | 3.2 | Sets the animation speed of an object. |
| `void startAnimation()` | 3.2 | Starts automatic animation for all objects with the animating flag set, see setAnimating() |
| `void stopAnimation()` | 3.2 | Stops animation for all objects with the animating flag set, see setAnimating() |
| `boolean isAnimationRunning()` | 3.2 | Returns whether automatic animation is currently running. |

## Getting the State of Objects

| Method Signature | Since | Description |
|------------------|-------|-------------|
| `double getXcoord(String objName)` | 2.7 | Returns the cartesian x-coord of the object with the given name. Note: returns 0 if the object is not a point or a vector. |
| `double getYcoord(String objName)` | 2.7 | Returns the cartesian y-coord of the object with the given name. Note: returns 0 if the object is not a point or a vector. |
| `double getZcoord(String objName)` | 5.0 | Returns the cartesian z-coord of the object with the given name. Note: returns 0 if the object is not a point or a vector. |
| `double getValue(String objName)` | 3.2 | Returns the double value of the object with the given name (e.g. length of segment, area of polygon). Note: returns 1 for a boolean object with value true. Otherwise 0 is returned. |
| `double getListValue(String objName, Integer index)` | 5.0 | Returns the double value of the object in the list (with the given name) with the given index. Note: returns 1 for a boolean object with value true. Otherwise 0 is returned. |
| `String getColor(String objName)` | 2.7 | Returns the color of the object with the given name as a hex string, e.g. "#FF0000" for red. Note that the hex string always starts with # and contains no lower case letters. |
| `boolean getVisible(String objName)` | 3.2 | Returns true or false depending on whether the object is visible in the Graphics View. Returns false if the object does not exist. |
| `boolean getVisible(String objName, int view)` | 4.2 | Returns true or false depending on whether the object is visible in Graphics View 'view' (1 or 2). Returns false if the object does not exist. |
| `String getValueString(String objName [, boolean useLocalizedInput = true])` | 2.7 | Returns the value of the object with the given name as a string. If useLocalizedInput is false, returns the command in English, otherwise in current GUI language. Note: Localized input uses parentheses, non-localized input uses brackets. For this method (and all others returning type String) it's important to coerce it properly to a JavaScript string for compatibility with GeoGebra Classic 5 eg var s = getValueString("text1") + ""; |
| `String getDefinitionString(String objName)` | 2.7 | Returns the description of the object with the given name as a string (in the currently selected language) |
| `String getCommandString(String objName [, boolean useLocalizedInput])` | 5.0 | Returns the command of the object with the given name as a string. If useLocalizedInput is false, returns the command in English, otherwise in current GUI language. Note: Localized input uses parentheses, non-localized input uses brackets. |
| `String getLaTeXString(String objName)` | 5.0 | Returns the value of given object in LaTeX syntax |
| `String getLaTeXBase64(String objName, boolean value)` | 5.0 | Returns base64 encoded PNG picture containing the object as LaTeX. For value = false the object is represented as the definition, for value=true the object value is used. |
| `String getObjectType(String objName)` | 2.7 | Returns the type of the given object as a string (like "point", "line", "circle", etc.). |
| `boolean exists(String objName)` | 2.7 | Returns whether an object with the given name exists in the construction. |
| `boolean isDefined(String objName)` | 2.7 | Returns whether the given object's value is valid at the moment. |
| `String [] getAllObjectNames([String type])` | 2.7 | Returns an array with all object names in the construction. If type parameter is entered, only objects of given type are returned. |
| `int getObjectNumber()` | 3.0 | Returns the number of objects in the construction. |
| `int getCASObjectNumber()` | 3.0 | Returns the number of object (nonempty cells) in CAS. |
| `String getObjectName(int i)` | 3.0 | Returns the name of the n-th object of the construction. |
| `String getLayer(String objName)` | 3.2 | Returns the layer of the object. |
| `int getLineStyle(String objName)` | 3.2 | Gets the line style for the object (0 to 4) |
| `int getLineThickness(String objName)` | 3.2 | Gets the thickness of the line (1 to 13) |
| `int getPointStyle(String objName)` | 3.2 | Gets the style of points (-1 default, 0 filled circle, 1 circle, 2 cross, 3 plus, 4 filled diamond, 5 unfilled diamond, 6 triangle (north), 7 triangle (south), 8 triangle (east), 9 triangle (west)) |
| `int getPointSize(String objName)` | 3.2 | Gets the size of a point (from 1 to 9) |
| `double getFilling(String objName)` | 3.2 | Gets the filling of an object (from 0 to 1) |
| `getCaption(String objectName, boolean substitutePlaceholders)` | 5.0 | Returns the caption of the object. If the caption contains placeholders (%n, %v,…​), you can use the second parameter to specify whether you want to substitute them or not. |
| `getLabelStyle(String objectName)` | 5.0 | Returns label type for given object, see setLabelStyle for possible values. |
| `getLabelVisible()` | 5.0 | |
| `isInteractive(String objName)` | | Returns true, if the object with label objName is existing and the user can get to this object using TAB. |