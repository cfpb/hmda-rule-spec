'use strict';

var _ = require('lodash');
var spec = require('../../index');

var getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
};

var findMax = function(values) {
    var maxValue = +values[0];
    for (var j = 1; j < values.length; j++) {
        if (+values[j] > maxValue) {
            maxValue = +values[j];
        }
    }

    return maxValue;
};

var findMin = function(values) {
    var minValue = +values[0];
    for (var k = 1; k < values.length; k++) {
        if (+values[k] < minValue) {
            minValue = +values[k];
        }
    }

    return minValue;
};

var zeroPad = function(field, size) {
    var pad = '';
    if (field.length < size) {
        for (var i = 0; i < size - field.length; i++) {
            pad += '0';
        }
    }

    return pad + field;
};

var larBuilder = function(year, lar) {
    var newLar = _.clone(lar);

    var fileSpec = spec.getFileSpec(year);
    var fileKeys = _.keys(fileSpec.loanApplicationRegister);

    for (var i = 0; i < fileKeys.length; i++) {
        var currField = fileSpec.loanApplicationRegister[fileKeys[i]];

        if (currField.dataType === 'N') {
            var max = Math.pow(10, currField.length);
            var min = 0;

            if (currField.validation.values) {
                var maxValues = findMax(_.keys(currField.validation.values));
                if (maxValues + 3 <= max) {
                    max = maxValues + 3;
                }

                min = findMin(_.keys(currField.validation.values));
            }

            var fieldValue = getRandomInt(min, max);
            fieldValue = zeroPad(fieldValue, currField.length);
            newLar[fileKeys[i]] = fieldValue;
        }
    }

    return newLar;
};

module.exports = larBuilder;