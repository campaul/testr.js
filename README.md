# testr.js

**testr.js** is a micro-framework for unit testing Javascript.

## Basic Usage

Using **teste.js** is simple. Just include testr, create some tests, and run.

```javascript
T = require('testr').T;

T.test('this test will pass', function () {
    T.assert(true);
});

T.test('this test will fail', function () {
    T.assert(false);
});

T.run();
```

## Custom Reports

You can customize reports by overriding `T.pass`, `T.fail`, and `T.complete`.

```javascript
T.pass = function (test) {
    document.write(test + ' passed.' + '<br />');
};

T.fail = function (test, error) {
    document.write(test + ' failed.' + '<br />');
};

T.complete = function (passed, failed, time) {
    document.write(pass + ' tests passed.' + '<br />');
    document.write(fail + ' tests failed.' + '<br />');
    document.write(time + ' milliseconds.');
};
```
