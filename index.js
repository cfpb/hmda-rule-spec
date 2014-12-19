'use strict';

var VALID_YEARS = ['2013', '2014'];
var VALID_OBJECT_TYPES = ['hmda', 'ts', 'lar'];

var SpecAPI = function() {
    var api = {};

    api.getValidYears = function() {
        return VALID_YEARS;
    };

    api.getValidObjectTypes = function() {
        return VALID_OBJECT_TYPES;
    };

    api.getFileSpec = function(year) {
        try {
            return require('./' + year + '/data_file_specification.json');
        } catch (e) {
            return {};
        }
    };

    api.getEdits = function(year, objectType, editType) {
        try {
            return require('./' + year + '/' + objectType + '-' + editType + '.json');
        } catch (e) {
            return [];
        }
    };

    return api;
};

module.exports = new SpecAPI();
