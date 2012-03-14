# testr.js

**testr.js** is a micro-framework and optional jQuery plugin for unit testing Javascript.

## Creating a Test Group

A group of tests is encapsulated in a `Testr` object.
A test can be any function that returns a boolean value.

```javascript
var css = new Testr('CSS3');

css.addTest('border-radius', function() {
  return 'border-radius' in document.body.style;
});

css.addTest('box-shadow', function() {
  return 'box-shadow' in document.body.style;
});
```
    
## Processing Results

Results are returned in a map of test names to test results ("pass", "fail", or "error").

```javascript
var results = css.run();

console.log('border-radius : ' + results['border-radius']);
console.log('box-shadow : ' + results['box-shadow']);
````

## Generating Reports

Reports are div elements that can be added to an HTML page.
If you want to create pretty test report pages, include testr.css.

```javascript
document.body.appendChild(css.report());
```
