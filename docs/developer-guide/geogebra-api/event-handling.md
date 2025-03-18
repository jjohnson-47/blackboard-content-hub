# GeoGebra Event Handling

These methods facilitate communication between the GeoGebra applet and JavaScript. With these methods you can implement Applet to JavaScript communication, for example:

- Monitor user actions (see Event listeners example)
- Communicate between two GeoGebra applets (see two applets example)

## Event Listeners

| Method Signature | Since | Description |
|------------------|-------|-------------|
| `void registerAddListener(JSFunction function)` | 3.0 | Registers a JavaScript function as an add listener for the applet's construction. Whenever a new object is created in the GeoGebraApplet's construction, the JavaScript function is called using the name of the newly created object as its single argument. |
| `void unregisterAddListener(JSFunction function)` | 3.0 | Removes a previously registered add listener, see registerAddListener() |
| `void registerRemoveListener(JSFunction function)` | 3.0 | Registers a JavaScript function as a remove listener for the applet's construction. Whenever an object is deleted from the GeoGebraApplet's construction, the JavaScript function is called using the name of the deleted object as its single argument. Note: when a construction is cleared, remove is not called for every single object, see registerClearListener(). |
| `void unregisterRemoveListener(JSFunction function)` | 3.0 | Removes a previously registered remove listener, see registerRemoveListener() |
| `void registerUpdateListener(JSFunction function)` | 3.0 | Registers a JavaScript function as a update listener for the applet's construction. Whenever any object is updated in the GeoGebraApplet's construction, the JavaScript function is called using the name of the updated object as its single argument. Note: when you only want to listen for the updates of a single object use registerObjectUpdateListener() instead. |
| `void unregisterUpdateListener(JSFunction function)` | 3.0 | Removes a previously registered update listener, see registerUpdateListener() |
| `void registerClickListener(JSFunction function)` | 5.0 | Registers a JavaScript function as a click listener for the applet's construction. Whenever any object is clicked in the GeoGebraApplet's construction, the JavaScript function is called using the name of the updated object as its single argument. Note: when you only want to listen for the updates of a single object use registerObjectClickListener() instead. |
| `void unregisterClickListener(JSFunction function)` | 3.0 | Removes a previously registered click listener, see registerClickListener() |
| `void registerObjectUpdateListener(String objName, JSFunction function)` | 3.0 | Registers a JavaScript function as an update listener for a single object. Whenever the object with the given name is updated, the JavaScript function is called using the name of the updated object as its single argument. If objName previously had a mapping JavaScript function, the old value is replaced. Note: all object updated listeners are unregistered when their object is removed or the construction is cleared, see registerRemoveListener() and registerClearListener(). |
| `void unregisterObjectUpdateListener(String objName)` | 3.0 | Removes a previously registered object update listener of the object with the given name, see registerObjectUpdateListener() |
| `void registerObjectClickListener(String objName, JSFunction function)` | 5.0 | Registers a JavaScript function as a click listener for a single object. Whenever the object with the given name is clicked, the JavaScript function is called using the name of the updated object as its single argument. If objName previously had a mapping JavaScript function, the old value is replaced. Note: all object click listeners are unregistered when their object is removed or the construction is cleared, see registerRemoveListener() and registerClearListener(). |
| `void unregisterObjectClickListener(String objName)` | 5.0 | Removes a previously registered object click listener of the object with the given name, see registerObjectClickListener() |
| `void registerRenameListener(JSFunction function)` | 3.0 | Registers a JavaScript function as a rename listener for the applet's construction. Whenever an object is renamed in the GeoGebraApplet's construction, the JavaScript function is called using the old name and the new name of the renamed object as its two arguments. |
| `void unregisterRenameListener(String objName)` | 3.0 | Removes a previously registered rename listener, see registerRenameListener() |
| `void registerClearListener(JSFunction function)` | 3.0 | Registers a JavaScript function as a clear listener for the applet's construction. Whenever the construction in the GeoGebraApplet is cleared (i.e. all objects are removed), the JavaScript function is called using no arguments. Note: all update listeners are unregistered when a construction is cleared. See registerUpdateListener() and registerRemoveListener(). |
| `void unregisterClearListener(JSFunction function)` | 3.0 | Removes a previously registered clear listener, see registerClearListener() |
| `void registerStoreUndoListener(JSFunction function)` | 4.4 | Registers a listener that is called (with no arguments) every time an undo point is created. |
| `void unregisterStoreUndoListener(JSFunction function)` | 4.4 | Removes previously registered listener for storing undo points, see registerStoreUndoListener |
| `void registerClientListener(JSFunction function)` | 5.0 | Registers a JavaScript function as a generic listener for the applet's construction. The listener receives events as JSON objects of the form `{type: "setMode", target:"", argument: "2"}` where target is the label of the construction element related to the event (if applicable), argument provides additional information based on the event type (e.g. the mode number for setMode event). Please refer to the list of client events below. |
| `void unregisterClientListener(JSFunction function)` | 5.0 | Removes previously registered client listener, see registerClientListener |

## Client Events

These events can be observed using the `registerClientListener` method:

| Type | Attributes | Description |
|------|------------|-------------|
| addMacro | argument: macro name | when new macro is added |
| addPolygon | | polygon construction started |
| addPolygonComplete | target: polygon label | polygon construction finished |
| algebraPanelSelected | | Graphing / Geometry apps: algebra tab selected in sidebar |
| deleteGeos | | multiple objects deleted |
| deselect | target: object name (for single object) or null (deselect all) | one or all objects removed from selection |
| dragEnd | | mouse drag ended |
| dropdownClosed | target: dropdown list name, index index of selected item (0 based) | dropdown list closed |
| dropdownItemFocused | target: dropdown list name, index index of focused item (0 based) | dropdown list item focused using mouse or keyboard |
| dropdownOpened | target: dropdown list name | dropdown list opened |
| editorKeyTyped | | key typed in editor (Algebra view of any app or standalone Evaluator app) |
| editorStart | target: object label if editing existing object | user moves focus to the editor (Algebra view of any app or standalone Evaluator app) |
| editorStop | target: object label if editing existing object | user (Algebra view of any app or standalone Evaluator app) |
| export | argument: JSON encoded array including export format | export started |
| mouseDown | x: mouse x-coordinate, y: mouse y-coordinate | user pressed the mouse button |
| movedGeos | argument: object labels | multiple objects move ended |
| movingGeos | argument: object labels | multible objects are being moved |
| openDialog | argument: dialog ID | dialog is opened (currently just for export dialog) |
| openMenu | argument: submenu ID | main menu or one of its submenus were open |
| pasteElms | argument: pasted objects as XML | pasting multiple objects started |
| pasteElmsComplete | | pasting multiple objects ended |
| perspectiveChange | | perspective changed (e.g. a view was opened or closed) |
| redo | | redo button pressed |
| relationTool | argument: HTML description of the object relation | relation tool used |
| removeMacro | argument: custom tool name | custom tool removed |
| renameComplete | | object renaming complete (in case of chain renames) |
| renameMacro | argument: array [old name, new name] | custom tool was renamed |
| select | target: object label | object added to selection |
| setMode | argument: mode number (see toolbar reference for details) | app mode changed (e.g. a tool was selected) |
| showNavigationBar | argument: "true" or "false" | navigation bar visibility changed |
| showStyleBar | argument: "true" or "false" | style bar visibility changed |
| sidePanelClosed | | side panel (where algebra view is in Graphing Calculator) closed |
| sidePanelOpened | | side panel (where algebra view is in Graphing Calculator) opened |
| tablePanelSelected | | table of values panel selected |
| toolsPanelSelected | | tools panel selected |
| undo | | undo pressed |
| updateStyle | target: object label | object style changed |
| viewChanged2D | xZero: horizontal pixel position of point (0,0), yZero: vertical pixel position of point (0,0), xscale: ratio pixels / horizontal units, yscale: ratio pixels / vertical units, viewNo: graphics view number (1 or 2) | graphics view dimensions changed by zooming or panning |
| viewChanged3D | similar to 2D, e.g. xZero: 0,yZero: 0,scale: 50,yscale: 50,viewNo: 512,zZero: -1.5,zscale: 50,xAngle: -40,zAngle: 24 | 3D view dimensions changed by zooming or panning |

## Examples

### RegisterAddListener Example

```javascript
// First, register a listening JavaScript function:
ggbApplet.registerAddListener(myAddListenerFunction);

// When an object "A" is created, the GeoGebra Applet will call the Javascript function:
// myAddListenerFunction("A");
```

### RegisterRemoveListener Example

```javascript
// First, register a listening JavaScript function:
ggbApplet.registerRemoveListener(myRemoveListenerFunction);

// When the object "A" is deleted, the GeoGebra Applet will call the Javascript function:
// myRemoveListenerFunction("A");
```

### RegisterUpdateListener Example

```javascript
// First, register a listening JavaScript function:
ggbApplet.registerUpdateListener(myUpdateListenerFunction);

// When the object "A" is updated, the GeoGebra Applet will call the Javascript function:
// myUpdateListenerFunction("A");
```

### RegisterObjectUpdateListener Example

```javascript
// First, register a listening JavaScript function:
ggbApplet.registerObjectUpdateListener("A", myAupdateListenerFunction);

// Whenever the object A is updated, the GeoGebra Applet will call the Javascript function:
// myAupdateListenerFunction();
// Note: an object update listener will still work after an object is renamed.
```

### RegisterObjectClickListener Example

```javascript
// First, register a listening JavaScript function:
ggbApplet.registerObjectClickListener("A", myAclickListenerFunction);

// Whenever the object A is clicked, the GeoGebra Applet will call the Javascript function:
// myAclickListenerFunction();
// Note: an object click listener will still work after an object is renamed.
```

### RegisterRenameListener Example

```javascript
// First, register a listening JavaScript function:
ggbApplet.registerRenameListener(myRenameListenerFunction);

// When an object "A" is renamed to "B", the GeoGebra Applet will call the Javascript function:
// myRenameListenerFunction("A", "B");
```

### RegisterClearListener Example

```javascript
// First, register a listening JavaScript function:
ggbApplet.registerClearListener(myClearListenerFunction);

// When the construction is cleared (i.e. after reseting a construction or opening a new construction file),
// the GeoGebra Applet will call the Javascript function:
// myClearListenerFunction();
```