(function($) {

    var Testr = function(group) {
        var tests = {};

        this.group = group;

        this.addTest = function(name, fn) {
            tests[name] = fn;
        };

        this.run = function() {
            var results = {};

            for(test in tests) {
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
            for(argument in arguments) {
                var testr = arguments[argument],
                    report = $('<div />').addClass('report'),
                    results = testr.run();

                for(result in results) {
                    report.append($('<div />').addClass('result').addClass(
                        results[result]).append(result)
                    );
                };
                
                this.append($('<h1 />').append(testr.group)).append(report);
            }

            return this;
        };
    }

    this.Testr = Testr;

})(typeof jQuery != 'undefined' ? jQuery : false, undefined);
