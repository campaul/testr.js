(function (global) {
    'use strict';

    var T = {},
        tests = {};

    T.test = function (name, fn) {
        tests[name] = fn;
    };

    T.pass = function (test) {
        console.log('\u001b[32m[PASS]\u001b[0m ' + test);
    };

    T.fail = function (test, error) {
        console.log('\u001b[31m[FAIL]\u001b[0m ' + test);
        console.log(error.stack);
    };

    T.complete = function (passed, failed, time) {
        console.log([
            passed, 'passed and',
            failed, 'failed in',
            time / 1000, 'seconds.'
        ].join(' '));
    };

    T.time = function (fn) {
        var start = new Date().getTime();
        fn();
        return new Date().getTime() - start;
    };

    T.run = function () {
        var passed = 0,
            failed = 0,
            time = T.time(function () {
                for (var test in tests) {
                    if (tests.hasOwnProperty(test)) {
                        try {
                            tests[test]();
                            passed = passed + 1;
                            T.pass(test);
                        } catch (error) {
                            failed = failed + 1;
                            T.fail(test, error);
                        }
                    }
                }
            });

        T.complete(passed, failed, time);
    };

    T.assert = function (val) {
        if (!val) {
            var e = new Error(val);
            e.name = "AssertionError";
            throw e;
        }
    };

    // See http://wiki.ecmascript.org/doku.php?id=harmony:egal
    T.equal = function (x, y) {
        if (x === y) {
            // 0 === -0, but they are not identical
            return x !== 0 || 1 / x === 1 / y;
        }

        // NaN !== NaN, but they are identical.
        // NaNs are the only non-reflexive value, i.e., if x !== x,
        // then x is a NaN.
        // isNaN is broken: it converts its argument to number, so
        // isNaN("foo") => true
        return x !== x && y !== y;
    };

    global.T = T;

}(this));
