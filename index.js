'use strict';

var VALID_YEARS = ['2013', '2014'];

var SpecAPI = function() {
    var api = {};

    api.getValidYears = function() {
        return VALID_YEARS;
    };

    return api;
};

module.exports = new SpecAPI();
