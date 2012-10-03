(function(global) {
    'use strict';

    var Testr = global.Testr = {};

    Testr.Test = function(group) {
        var tests = {};

        this.group = group;

        this.add = function(test, fn) {
            tests[test] = fn;
        };

        this.run = function(report) {
            report = {
                pass: (report && report.pass) || function(name) {
                    console.log('[PASS] ' + name);
                },
 
                fail: (report && report.fail) || function(name) {
                    console.log('[FAIL] ' + name);
                }
            };

            for(var test in tests) {
                tests[test].call({
                    assert: function(value) {
                        value ? report.pass(test) : report.fail(test);
                    }
                });
            }
        };

        this.report = function() {
            var container = document.createElement('div'),
                reportdiv = document.createElement('div'),
                title = document.createElement('h1');

            reportdiv.className = 'report';
            title.innerHTML = this.group;

            function render(name, result) {
                var resultdiv = document.createElement('div');
                resultdiv.className = 'result ' + result;
                resultdiv.innerHTML = name;
                reportdiv.appendChild(resultdiv);
            };
            
            this.run({
                pass: function(name) {
                    render('[PASS] ' + name, 'pass');
                },
                
                fail: function(name) {
                    render('[FAIL] ' + name, 'fail');
                }
            });

            container.appendChild(title);
            container.appendChild(reportdiv);

            return container;
        };
    };

    // See http://wiki.ecmascript.org/doku.php?id=harmony:egal
    Testr.is = function(x, y) {
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

    Testr.isnt = function(x, y) {
        return !Testr.is(x, y);
    };

})(this);
