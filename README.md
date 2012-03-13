# testr.js

**testr.js** is a micro-framework and optional jQuery plugin for unit testing Javascript.

## Creating a Test Group

A group of tests is encapsulated in a `Testr` object.
A test can be any function that returns a truthy value.

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

## Using the jQuery Report Plugin

The following line will inject a test report into the selected component.
If you want to easily create pretty test report pages, include testr.css.

```javascript
$('#report-container').testreport(css);
```

The test report plugin is capable of generating a report for multiple test groups as well.

```javascript
$('#report-container').testreport(test1, test2, test3);
```