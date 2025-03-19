# GeoGebra Initialization and API Access

This section covers how to initialize GeoGebra applets and access their API for programmatic control.

## Obtaining the API Object

If you are loading GeoGebra using the deployggb.js script, you can access the API as an argument of appletOnLoad:

```javascript
const ggb = new GGBApplet({
  appletOnLoad(ggbApi) {
    // ggbApi provides the applet API
  }
});
ggb.inject(document.body);
```

For compatibility reasons, the API objects can also be accessed via global variables. The name of the global variable is `ggbApplet` by default and can be overridden by the `id` parameter passed to `new GGBApplet(...)`. 

In case you have multiple GeoGebra apps on a page, `ggbApplet` always contains API of the last active one. In such case you should either avoid using global variables or use set the `id` parameter explicitly for all apps.

## Obtaining the API Object as a Module: The ES6 Way

You can use math-apps module to inject the applet the ES6 way:

```html
<script type="module">
    import {mathApps} from 'https://www.geogebra.org/apps/web3d/web3d.nocache.mjs';
    mathApps.create({'width':'800', 'height':'600',
        'showAlgebraInput': 'true',
        'material_id':'MJWHp9en'})
        .inject(document.querySelector("#applet1"));
</script>
<div id="applet1"></div>
```

Example of using the API:

```javascript
mathApps.create({'appName':'graphing'})
    .inject(document.querySelector("#plot"))
    .getAPI().then(api => api.evalCommand('f(x)=sin(x)'));
```

## GeoGebra App Parameters

When creating a GeoGebra applet, you can specify various parameters to customize its behavior. Here are some of the common parameters:

### Essential Parameters

| Parameter | Description |
|-----------|-------------|
| `width` | Width of the applet in pixels |
| `height` | Height of the applet in pixels |
| `showMenuBar` | Shows or hides the menu bar |
| `showAlgebraInput` | Shows or hides the input bar |
| `showToolBar` | Shows or hides the toolbar |
| `customToolBar` | Customizes which tools appear in the toolbar |
| `showResetIcon` | Shows or hides the reset icon |
| `enableLabelDrags` | Enables or disables dragging labels |
| `enableShiftDragZoom` | Enables or disables zooming with Shift+Drag |
| `enableRightClick` | Enables or disables the context menu on right-click |
| `appName` | Specifies which app to load (e.g., 'graphing', 'geometry', 'cas', etc.) |
| `material_id` | ID of the material to load from GeoGebra |
| `ggbBase64` | Base64 encoded .ggb file to load |

### Example Configuration

```javascript
const parameters = {
    "width": 800,
    "height": 600,
    "showMenuBar": false,
    "showAlgebraInput": true,
    "showToolBar": true,
    "customToolBar": "0 1 2 3 4 5 6 7 8 9 10 11 || 12 13 14 15",
    "showResetIcon": true,
    "enableLabelDrags": false,
    "enableShiftDragZoom": true,
    "enableRightClick": false,
    "appName": "graphing",
    "appletOnLoad": function(api) {
        // Use the API here
        api.evalCommand("f(x) = x^2");
    }
};

const ggb = new GGBApplet(parameters, true);
window.addEventListener("load", function() {
    ggb.inject('ggb-element');
});
```

Where `'ggb-element'` is the ID of the HTML element where you want to inject the GeoGebra applet:

```html
<div id="ggb-element"></div>
```