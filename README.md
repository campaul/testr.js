# testr.js

**testr.js** is a micro-framework for unit testing Javascript.

## Creating a Test

A group of test cases is encapsulated in a `Test` object.
A test case can be any function that asserts a boolean value.

```javascript
var media = new Testr.Test('HTML5 Media');

media.add('Audio', function() {
  this.assert("HTMLAudioElement" in window);
});

media.add('Video', function() {
  this.assert("HTMLVideoElement" in window);
});
```

## Processing Results

By default, test results are logged to the console. You can also provide your
own result handlers if you wish.

```javascript
// Log test results to the console using default handlers
media.run();

// Write test results to the page using custom handlers
media.run({
    pass: function(test) {
        document.write(test + ' passed.');
    },
    
    fail: function(test) {
        document.write(test + ' failed.');
    }
});
````

## Generating Reports

Reports are pre-rolled DOM elements that can be added to a web page.
If you want to create pretty test report pages, include testr.css.

```javascript
document.body.appendChild(media.report());
```
