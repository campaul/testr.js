(function($) {

    var Testr = function(group) {
        var tests = {};

        this.group = group;

        this.addTest = function(name, fn) {
            if (Object.prototype.toString.call(fn) !== '[object Function]') throw new TypeError('Test "' + name  + '" is not a function!');
            var args = Array.prototype.slice.call(arguments, 2);
            tests[name] = function() {
                return fn.apply(null, args);
            };
        };

        this.run = function() {
            var results = {};

            for(var test in tests) {
                try {
                    results[test] = tests[test]() ? 'pass' : 'fail';
                } catch(e) {
                    results[test] = 'error';
                }
            }

            return results;
        };
    };

    if($) {
        $.fn.testreport = function() {
            for(var argument in arguments) {
                var testr = arguments[argument],
                    report = $('<div />').addClass('report'),
                    results = testr.run();

                for(var result in results) {
                    report.append($('<div />').addClass('result').addClass(
                        results[result]).append(result)
                    );
                };
                
                this.append($('<h1 />').append(testr.group)).append(report);
            }

            return this;
        };
    }

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

    this.Testr = Testr;

})(typeof jQuery != 'undefined' ? jQuery : false, undefined);
