# testr.js

**testr.js** is a micro-framework for unit testing Javascript.

## Creating a Test

A group of test cases is encapsulated in a `Test` object.
A test case can be any function that returns a boolean value.

```javascript
var media = new Testr.Test('HTML5 Media');

media.add('Audio', function() {
  return "HTMLAudioElement" in window;
});

media.add('Video', function() {
  return "HTMLVideoElement" in window;
});
```

## Processing Results

Results are returned in a map of test names to test results ("pass", "fail", or "error").

```javascript
var results = media.run();

console.log('Audio : ' + results['Audio']);
console.log('Video : ' + results['Video']);
````

## Generating Reports

Reports are div elements that can be added to an HTML page.
If you want to create pretty test report pages, include testr.css.

```javascript
document.body.appendChild(media.report());
```
