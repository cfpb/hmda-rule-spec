'use strict';

var spec = require('../index');

var fileSpec;
if (process.argv.length === 3) {
    fileSpec = spec.getFileSpec(process.argv[2]);
}

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

try {
    // Repair transmittal sheet
    repairSection(Object.keys(fileSpec.transmittalSheet), fileSpec.transmittalSheet);

    // Repair loan application register
    repairSection(Object.keys(fileSpec.loanApplicationRegister), fileSpec.loanApplicationRegister);

    console.log(JSON.stringify(fileSpec));
} catch (err) {
    console.log(err.message);
}