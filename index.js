'use strict';

var VALID_OBJECT_TYPES = ['hmda', 'ts', 'lar'];
var VALID_EDIT_TYPES = ['validity', 'syntactical', 'quality', 'macro'];

// 2013 Spec and Edits
var filespec2013 = require('./2013/data_file_specification.json'),
    hmdaMacro2013 = require('./2013/hmda-macro.json'),
    hmdaSyntactical2013 = require('./2013/hmda-syntactical.json'),
    larQuality2013 = require('./2013/lar-quality.json'),
    larSyntactical2013 = require('./2013/lar-syntactical.json'),
    larValidity2013 = require('./2013/lar-validity.json'),
    tsQuality2013 = require('./2013/ts-quality.json'),
    tsSyntactical2013 = require('./2013/ts-syntactical.json'),
    tsValidity2013 = require('./2013/ts-validity.json');

// 2014 Spec and Edits
var filespec2014 = require('./2014/data_file_specification.json'),
    hmdaMacro2014 = require('./2014/hmda-macro.json'),
    hmdaSyntactical2014 = require('./2014/hmda-syntactical.json'),
    larQuality2014 = require('./2014/lar-quality.json'),
    larSyntactical2014 = require('./2014/lar-syntactical.json'),
    larValidity2014 = require('./2014/lar-validity.json'),
    tsQuality2014 = require('./2014/ts-quality.json'),
    tsSyntactical2014 = require('./2014/ts-syntactical.json'),
    tsValidity2014 = require('./2014/ts-validity.json');

var specs = {
    '2013': {
        'filespec': filespec2013,
        'hmda': {
            'macro': hmdaMacro2013,
            'syntactical': hmdaSyntactical2013
        },
        'lar': {
            'quality': larQuality2013,
            'syntactical': larSyntactical2013,
            'validity': larValidity2013
        },
        'ts': {
            'quality': tsQuality2013,
            'syntactical': tsSyntactical2013,
            'validity': tsValidity2013
        }
    },
    '2014': {
        'filespec': filespec2014,
        'hmda': {
            'macro': hmdaMacro2014,
            'syntactical': hmdaSyntactical2014
        },
        'lar': {
            'quality': larQuality2014,
            'syntactical': larSyntactical2014,
            'validity': larValidity2014
        },
        'ts': {
            'quality': tsQuality2014,
            'syntactical': tsSyntactical2014,
            'validity': tsValidity2014
        }
    }
};


var SpecAPI = function() {
    var api = {};

    api.getValidYears = function() {
        return Object.keys(specs);
    };

    api.getValidObjectTypes = function() {
        return VALID_OBJECT_TYPES;
    };

    api.getValidEditTypes = function() {
        return VALID_EDIT_TYPES;
    };

    api.getFileSpec = function(year) {
        if (specs[year] && specs[year].filespec) {
            return specs[year].filespec;
        } else {
            return null;
        }
    };

    api.getEdits = function(year, objectType, editType) {
        if (specs[year][objectType][editType]) {
            return specs[year][objectType][editType];
        } else {
            return null;
        }
    };

    return api;
};

module.exports = new SpecAPI();
