'use strict';

var fs = require('fs');
var spec = require('../index');
var pretty = require('js-object-pretty-print').pretty;

var printUsage = function(err) {
    if (err) {
        console.log(err.message);
    }
    console.log('Usage: node repairFileSpec.js [year]');
    console.log('Example: node repairFileSpec.js nprm');
};

var repairSection = function(keys, currSpec) {
    var currField = '';
    var prevField = '';
    for (var i = 0; i < keys.length; i++) {
        currField = currSpec[keys[i]];
        if (i !== 0) {
            prevField = currSpec[keys[i-1]];
            currField.start = (+prevField.end) + 1;
        } else {
            currField.start = 1;
        }
        currField.end = currField.start + ((+currField.length) - 1);

        currField.start = currField.start.toString();
        currField.end = currField.end.toString();
    }
};

var repairFileSpec = function(year) {
    var fileSpec = spec.getFileSpec(year);

    // Repair transmittal sheet
    repairSection(Object.keys(fileSpec.transmittalSheet), fileSpec.transmittalSheet);

    // Repair loan application register
    repairSection(Object.keys(fileSpec.loanApplicationRegister), fileSpec.loanApplicationRegister);

    var specFile = fs.openSync('../' + process.argv[2] + '/data_file_specification.json', 'w');
    fs.writeSync(specFile, pretty(fileSpec, 4, 'JSON'));
    fs.closeSync(specFile);
}

var size = 'repairFileSpec.js'.length;
if (process.argv[1].slice(process.argv[1].length - size) === 'repairFileSpec.js') {
    if (process.argv.length === 3) {
        try {
            repairFileSpec(process.argv[2]);
        } catch (err) {
            printUsage(err);
        }
    } else {
        printUsage();
    }
}