(function(root) {
    'use strict';

    var slice = Array.prototype.slice;

    var Testr = function(group) {
        var tests = {};

        this.group = group;

        this.addTest = function(test, fn) {
            var args = slice.call(arguments, 2);

            tests[test] = function() {
                return fn.apply(null, args);
            };
        };

        this.run = function() {
            var results = {},
                test;

            for(test in tests) {
                try {
                    results[test] = tests[test]() ? 'pass' : 'fail';
                } catch(e) {
                    results[test] = 'error';
                    console.error(e.name + ' in test "' + test + '" : ' + e.message);
                }
            }

            return results;
        };

        this.report = function() {
            var results = this.run(),
                container = document.createElement('div'),
                reportdiv = document.createElement('div'),
                title = document.createElement('h1'),
                result,
                resultdiv;

            reportdiv.className = 'report';
            title.innerHTML = this.group;

            for(result in results) {
                resultdiv = document.createElement('div');
                resultdiv.className = 'result ' + results[result];
                resultdiv.innerHTML = result;
                reportdiv.appendChild(resultdiv);
            }

            container.appendChild(title);
            container.appendChild(reportdiv);

            return container;
        };
    };

    // See http://wiki.ecmascript.org/doku.php?id=harmony:egal
    Testr.egal = function(x, y) {
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

    Testr.is = Testr.egal;

    Testr.isnt = function(x, y) {
        return !Testr.is(x, y);
    };

    Testr.type = function(obj) {
        return Object.prototype.toString.call(obj);
    };

    Testr.isArguments = function(obj) {
        return Testr.type(obj) == '[object Arguments]';
    };

    Testr.isArray = function(obj) {
        return Testr.type(obj) == '[object Array]';
    };

    Testr.isBoolean = function(obj) {
        return Testr.type(obj) == '[object Boolean]';
    };

    Testr.isDate = function(obj) {
        return Testr.type(obj) == '[object Date]';
    };

    Testr.isFunction = function(obj) {
        return Testr.type(obj) == '[object Function]';
    };

    Testr.isNaN = function(obj) {
        return obj !== obj;
    };

    Testr.isNull = function(obj) {
        return obj === null;
    };

    Testr.isNumber = function(obj) {
        return Testr.type(obj) == '[object Number]';
    };

    Testr.isRegExp = function(obj) {
        return Testr.type(obj) == '[object RegExp]';
    };

    Testr.isString = function(obj) {
        return Testr.type(obj) == '[object String]';
    };

    Testr.isUndefined = function(obj) {
        return obj === void 0;
    };

    root.Testr = Testr;

})(this, undefined);
