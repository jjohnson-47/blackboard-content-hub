# Using the GeoGebra API Reference

## Quick Reference Guide

When implementing GeoGebra functionality based on user instructions, follow these steps:

1. **Identify the category** - Determine which functional area the request falls into:
   - Object creation/manipulation
   - UI/construction control
   - Event handling
   - File operations
   - Initialization/setup

2. **Consult the appropriate reference document**:
   - For creating/modifying mathematical objects: `geogebra-core-api.md`
   - For UI controls and construction management: `geogebra-construction-ui.md`
   - For event listeners and interaction: `geogebra-events.md`
   - For file operations and data exchange: `geogebra-file-format.md`
   - For setup and initialization: `geogebra-initialization.md`

3. **Implementation pattern**:
   ```javascript
   // 1. Initialize the applet (if not already done)
   const ggb = new GGBApplet({
     // Essential parameters based on requirements
     "width": 800,
     "height": 600,
     "showMenuBar": false,
     "showToolBar": true,
     "appletOnLoad": function(api) {
       // 2. Store API reference for later use
       window.ggbApplet = api;
       
       // 3. Initialize objects/setup
       // Example: api.evalCommand("A = (3, 2)");
       
       // 4. Set up any required event listeners
       // Example: api.registerUpdateListener(handleUpdate);
     }
   });
   
   // 5. Inject the applet into the DOM
   ggb.inject('ggb-element');
   ```

4. **Key method patterns**:
   - Creating objects: `ggbApplet.evalCommand("x = 5")`
   - Modifying objects: `ggbApplet.setValue("x", 10)`
   - Setting properties: `ggbApplet.setColor("A", 255, 0, 0)`
   - Getting values: `const val = ggbApplet.getValue("x")`
   - Handling events: `ggbApplet.registerObjectUpdateListener("A", callback)`

## Common Implementation Scenarios

### Creating a Basic Graph
```javascript
ggbApplet.evalCommand("f(x) = x^2");
ggbApplet.setColor("f", 255, 0, 0);
ggbApplet.setAxisLabels(1, "x", "y", "");
```

### Interactive Point with Event Listener
```javascript
ggbApplet.evalCommand("P = (0, 0)");
ggbApplet.setPointStyle("P", 0); // Filled circle
ggbApplet.registerObjectUpdateListener("P", function() {
  const x = ggbApplet.getXcoord("P");
  const y = ggbApplet.getYcoord("P");
  console.log(`Point moved to (${x}, ${y})`);
});
```

### Saving and Loading Constructions
```javascript
// Save current construction
const base64 = ggbApplet.getBase64();
localStorage.setItem("savedConstruction", base64);

// Load saved construction
const savedData = localStorage.getItem("savedConstruction");
if (savedData) {
  ggbApplet.setBase64(savedData);
}
```

### Custom Tool Implementation
```javascript
// Set up button in HTML
const button = document.createElement("button");
button.textContent = "Create Circle";
document.body.appendChild(button);

// Connect to GeoGebra
button.addEventListener("click", function() {
  ggbApplet.setUndoPoint(); // Allow undo
  ggbApplet.evalCommand("Circle[(0,0), 5]");
});
```

## Troubleshooting Tips

1. **Object doesn't exist**: Check with `ggbApplet.exists("objName")` before manipulating
2. **Command errors**: Wrap in try/catch and use `ggbApplet.setErrorDialogsActive(false)` to suppress dialogs
3. **Visibility issues**: Ensure `ggbApplet.setVisible("objName", true)` is called
4. **Performance concerns**: Use `ggbApplet.setRepaintingActive(false)` before batch operations and `true` after
5. **Coordinate system**: Check `ggbApplet.setCoordSystem(xmin, xmax, ymin, ymax)` settings

Always refer to the specific API documentation for exact method signatures and parameters.