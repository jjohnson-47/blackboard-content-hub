# GeoGebra File Format and Data Exchange

These methods allow for manipulation of GeoGebra's XML-based file format and data exchange capabilities.

## GeoGebra's File Format

With these methods you can set everything in a construction (see XML Reference).

| Method Signature | Since | Description |
|------------------|-------|-------------|
| `void evalXML(String xmlString)` | 2.7 | Evaluates the given XML string and changes the current construction. Note: the construction is NOT cleared before evaluating the XML string. |
| `void setXML(String xmlString)` | 2.7 | Evaluates the given XML string and changes the current construction. Note: the construction is cleared before evaluating the XML string. This method could be used to load constructions. |
| `String getXML()` | 2.7 | Returns the current construction in GeoGebra's XML format. This method could be used to save constructions. |
| `String getXML(String objName)` | 3.2 | Returns the GeoGebra XML string for the given object, i.e. only the <element> tag is returned. |
| `String getAlgorithmXML(String objName)` | 3.2 | For a dependent GeoElement objName the XML string of the parent algorithm and all its output objects is returned. For a free GeoElement objName "" is returned. |
| `String getFileJSON()` | 5.0 | Gets the current construction as JSON object including the XML and images |
| `String setFileJSON(Object content)` | 5.0 | Sets the current construction from a JSON (object or string) that includes XML and images (try getFileJSON for the precise format) |
| `String getBase64()` | | Gets the current construction as a base64-encoded .ggb file |
| `String getBase64(function callback)` | 4.2 | Gets the current construction as a base64-encoded .ggb file asynchronously, passes as parameter to the callback function when ready. The callback function should take one parameter (the base64 string). |
| `void setBase64(String [, function callback] )` | 4.0 | Sets the current construction from a base64-encoded .ggb file. If callback function is specified, it is called after the file is loaded. |

## Miscellaneous

| Method Signature | Since | Description |
|------------------|-------|-------------|
| `void debug(String string)` | 3.2 | Prints the string to the Java Console |
| `String getVersion()` | 5.0 | Returns the version of GeoGebra |
| `void remove()` | 5.0 | Removes the applet and frees up memory |

## Examples

### Saving a Construction

```javascript
// Get the current construction in XML format
const xml = ggbApplet.getXML();
// This XML string could be saved to a file or stored in a database
```

### Loading a Construction

```javascript
// Clear the current construction and load a new one from XML
ggbApplet.setXML(xmlString);
```

### Getting Object-Specific XML

```javascript
// Get the XML for a specific object
const pointXML = ggbApplet.getXML("A");
console.log(pointXML);
```

### Using Base64 Encoding

```javascript
// Get the current construction as a base64-encoded .ggb file
ggbApplet.getBase64(function(base64String) {
    // Use the base64 string, for example to create a download link
    const downloadLink = document.createElement("a");
    downloadLink.href = "data:application/vnd.geogebra.file;base64," + base64String;
    downloadLink.download = "construction.ggb";
    downloadLink.click();
});
```

### Loading from Base64

```javascript
// Load a construction from a base64-encoded .ggb file
ggbApplet.setBase64(base64String, function() {
    console.log("Construction loaded successfully");
});
```