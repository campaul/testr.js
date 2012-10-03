(function (global) {
    'use strict';

    global.Testr = {
        Test: function (group, tests) {
            this.group = group;

            this.run = function (report) {
                var test,
                    assert = function (value) {
                        if (value) {
                            report.pass(test);
                        } else {
                            report.fail(test);
                        }
                    };

                report = {
                    pass: (report && report.pass) || function (name) {
                        global.console.log('[PASS] ' + name);
                    },

                    fail: (report && report.fail) || function (name) {
                        global.console.log('[FAIL] ' + name);
                    }
                };

                for (test in tests) {
                    if (tests.hasOwnProperty(test)) {
                        tests[test].call({
                            assert: assert
                        });
                    }
                }
            };

            this.report = function () {
                var container = global.document.createElement('div'),
                    reportdiv = global.document.createElement('div'),
                    title = global.document.createElement('h1');

                reportdiv.className = 'report';
                title.innerHTML = this.group;

                function render(name, result) {
                    var resultdiv = global.document.createElement('div');
                    resultdiv.className = 'result ' + result;
                    resultdiv.innerHTML = name;
                    reportdiv.appendChild(resultdiv);
                }

                this.run({
                    pass: function (name) {
                        render('[PASS] ' + name, 'pass');
                    },

                    fail: function (name) {
                        render('[FAIL] ' + name, 'fail');
                    }
                });

                container.appendChild(title);
                container.appendChild(reportdiv);

                return container;
            };
        },

        // See http://wiki.ecmascript.org/doku.php?id=harmony:egal
        is: function (x, y) {
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
        },

        isnt: function (x, y) {
            return !global.Testr.is(x, y);
        }
    };

}(this));
