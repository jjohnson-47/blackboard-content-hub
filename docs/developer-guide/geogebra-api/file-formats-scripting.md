# GeoGebra File Formats and Scripting

## File Format Specifications

GeoGebra utilizes two primary file extensions:

### 1. .ggb (GeoGebra Worksheet)

This is the standard format for GeoGebra worksheets. A `.ggb` file is essentially a ZIP archive containing:

* **geogebra.xml**: Stores all construction data in XML format
* **geogebra_thumbnail.png**: A preview image of the construction
* **geogebra.js**: Contains global JavaScript definitions used in the file
* **images folder**: Holds any images used in the construction or as icons for custom tools

To access these contents, you can rename the `.ggb` file extension to `.zip` and extract the files using any ZIP utility.

### 2. .ggt (GeoGebra Tool)

This format is used for custom tools. Similar to `.ggb` files, `.ggt` files are ZIP archives containing:

* **geogebra_macro.xml**: Stores the main information about the tool
* **geogebra_thumbnail.png**: A preview image of the tool

Renaming a `.ggt` file to `.zip` allows you to extract and inspect its contents.

## Scripting and Programming Languages

GeoGebra supports two scripting languages for extending functionality and creating interactive tools:

### 1. GeoGebra Script (GGBScript)

This is GeoGebra's native scripting language, designed to handle sequences of commands executed in order. GGBScript uses GeoGebra's command syntax, making it accessible for users familiar with GeoGebra's functionalities.

Example GGBScript:
```
SetValue[a, 5]
SetColor[A, "red"]
SetVisible[B, true]
```

### 2. JavaScript

For more advanced scripting needs, GeoGebra supports JavaScript. This allows for complex control flows (`if`, `while`, `for` loops) and interaction with GeoGebra's `ggbApplet` object. JavaScript can be used to create dynamic behaviors and integrate GeoGebra constructions with other web technologies.

Example JavaScript:
```javascript
// Calculate distance between points A and B
var xA = ggbApplet.getXcoord("A");
var yA = ggbApplet.getYcoord("A");
var xB = ggbApplet.getXcoord("B");
var yB = ggbApplet.getYcoord("B");

var distance = Math.sqrt(Math.pow(xB - xA, 2) + Math.pow(yB - yA, 2));
ggbApplet.setValue("distance", distance);
```

Scripts can be assigned to objects within GeoGebra, enabling interactive behaviors such as responding to clicks or updates. These scripts are typically embedded within the GeoGebra file and can be edited through the object's properties dialog under the "Scripting" tab.

## Script Triggers

Scripts can be attached to various events in GeoGebra:

| Trigger | Description |
|---------|-------------|
| On Click | Script runs when the object is clicked |
| On Update | Script runs when the object is updated (e.g., moved or value changed) |
| On Enter | Script runs when the cursor enters the object (hover) |
| On Global Update | Script runs when any object in the construction is updated |

## Creating Custom Tools

To develop a custom tool for GeoGebra Geometry:

1. **Design the Tool**: Create the desired construction within GeoGebra
2. **Define the Tool**: Use GeoGebra's "Create New Tool" feature (from the Tools menu) to specify:
   - Output Objects (the results of the tool)
   - Input Objects (what the user must specify)
   - Tool Name and Command Name
   - Icon and Tooltip
3. **Save the Tool**: Export the tool, which saves it as a `.ggt` file. This file can be shared and imported into other GeoGebra projects.

### Custom Tool Example Workflow

1. Create a construction (e.g., a perpendicular bisector of a segment)
2. Select Tools → Create New Tool
3. Select the output objects (the perpendicular bisector)
4. Select the input objects (the two endpoints of the segment)
5. Name the tool (e.g., "Perpendicular Bisector")
6. Save the tool as a `.ggt` file

## Working with Tool Files Programmatically

To integrate custom tools into your application:

```javascript
// Load a custom tool from a .ggt file
function loadCustomTool(base64GgtFile) {
    // First, you would need to extract the tool definition from the .ggt file
    // This would involve unzipping the file and parsing geogebra_macro.xml
    
    // Then add it to the current GeoGebra instance
    ggbApplet.evalCommand("MacroFromBase64[\"" + base64GgtFile + "\"]");
}

// After loading, the tool can be used in commands
function useCustomTool() {
    ggbApplet.evalCommand("MyCustomTool[A, B]");
}
```