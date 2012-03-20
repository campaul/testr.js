(function(Testr) {
    'use strict';

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

})(Testr, undefined);
