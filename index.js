'use strict';

var VALID_OBJECT_TYPES = ['hmda', 'ts', 'lar'];
var VALID_EDIT_TYPES = ['validity', 'syntactical', 'quality', 'macro'];

// 2013 Spec and Edits
var filespec2013 = require('./2013/data_file_specification.json'),
    hmdaMacro2013 = require('./2013/hmda-macro.json'),
    hmdaQuality2013 = require('./2013/hmda-quality.json'),
    hmdaSpecial2013 = require('./2013/hmda-special.json'),
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
    hmdaQuality2014 = require('./2014/hmda-quality.json'),
    hmdaSpecial2014 = require('./2014/hmda-special.json'),
    hmdaSyntactical2014 = require('./2014/hmda-syntactical.json'),
    larQuality2014 = require('./2014/lar-quality.json'),
    larSyntactical2014 = require('./2014/lar-syntactical.json'),
    larValidity2014 = require('./2014/lar-validity.json'),
    tsQuality2014 = require('./2014/ts-quality.json'),
    tsSyntactical2014 = require('./2014/ts-syntactical.json'),
    tsValidity2014 = require('./2014/ts-validity.json');

// NPRM Spec and Edits
var filespecnprm = require('./nprm/data_file_specification.json'),
    hmdaMacronprm = require('./nprm/hmda-macro.json'),
    hmdaQualitynprm = require('./nprm/hmda-quality.json'),
    hmdaSpecialnprm = require('./nprm/hmda-special.json'),
    hmdaSyntacticalnprm = require('./nprm/hmda-syntactical.json'),
    larQualitynprm = require('./nprm/lar-quality.json'),
    larSyntacticalnprm = require('./nprm/lar-syntactical.json'),
    larValiditynprm = require('./nprm/lar-validity.json'),
    tsQualitynprm = require('./nprm/ts-quality.json'),
    tsSyntacticalnprm = require('./nprm/ts-syntactical.json'),
    tsValiditynprm = require('./nprm/ts-validity.json');

var specs = {
    '2013': {
        'filespec': filespec2013,
        'hmda': {
            'macro': hmdaMacro2013,
            'quality': hmdaQuality2013,
            'special': hmdaSpecial2013,
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
            'quality': hmdaQuality2014,
            'special': hmdaSpecial2014,
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
    },
    'nprm': {
        'filespec': filespecnprm,
        'hmda': {
            'macro': hmdaMacronprm,
            'quality': hmdaQualitynprm,
            'special': hmdaSpecialnprm,
            'syntactical': hmdaSyntacticalnprm
        },
        'lar': {
            'quality': larQualitynprm,
            'syntactical': larSyntacticalnprm,
            'validity': larValiditynprm
        },
        'ts': {
            'quality': tsQualitynprm,
            'syntactical': tsSyntacticalnprm,
            'validity': tsValiditynprm
        }
    }
};

/**
 * Constructs new instance of the SpecAPI
 * @constructs SpecAPI
 */
var SpecAPI = function() {

    /**
     * Get the available years that have edits defined
     * @return {array} Array of valid years
     */
    this.getValidYears = function() {
        return Object.keys(specs);
    };

    /**
     * Get the available defined object scope types
     * @return {array} Array of the valid object scope types
     */
    this.getValidObjectTypes = function() {
        return VALID_OBJECT_TYPES;
    };

    /**
     * Get the available defined edit types
     * @return {array} Array of the valid edit types
     */
    this.getValidEditTypes = function() {
        return VALID_EDIT_TYPES;
    };

    /**
     * Get the defined file specification for the year
     * @param  {string} year Year for the file specification
     * @return {object}      Object defining the file specification
     */
    this.getFileSpec = function(year) {
        if (specs[year] && specs[year].filespec) {
            return specs[year].filespec;
        } else {
            return null;
        }
    };

    /**
     * Get a property from the defined file specification for the year.
     * @param  {string} year     The {@link SpecAPI#getValidYears|year} for the edits
     * @param  {string} scope    The {@link SpecAPI#getValidObjectTypes|scope} for the edits
     * @param  {string} property The property
     * @return {object}          Object defining the property within file specification
     */
    this.getFileSpecProperty = function(year, scope, property) {
        var spec = this.getFileSpec(year);

        if (scope === 'ts' && spec && spec.transmittalSheet[property]) {
            return spec.transmittalSheet[property];
        } else if (scope === 'lar' && spec && spec.loanApplicationRegister[property]) {
            return spec.loanApplicationRegister[property];
        }

        return null;
    };

    /**
     * Gets the defined edits for the chosen year, scope, and edit type
     * @param  {string} year       The {@link SpecAPI#getValidYears|year} for the edits
     * @param  {string} scope      The {@link SpecAPI#getValidObjectTypes|scope} for the edits
     * @param  {string} editType   The {@link SpecAPI#getValidEditTypes|edit} type
     * @return {object}            Object defining the list of edits that match the given parameters
     */
    this.getEdits = function(year, scope, editType) {
        if (specs[year][scope][editType]) {
            return specs[year][scope][editType];
        } else {
            return null;
        }
    };

    return this;
};

module.exports = new SpecAPI();
