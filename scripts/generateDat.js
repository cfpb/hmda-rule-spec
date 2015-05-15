'use strict';

var fs = require('fs');
var spec = require('../index');

var printUsage = function(err) {
    if (err) {
        console.log(err.message);
    }
    console.log('Usage: node generateDat.js [year] [input file (json)] [output file path]');
    console.log('Example: node generateDat.js nprm ./nprm.json ./nprm.dat');
};

var generateWhiteSpace = function(size) {
    var out = '';

    for (var i = 0; i < size; i++) {
        out += ' ';
    }

    return out;
}

var createOutputLine = function(line, lineNum, lineSpec) {
    var outputLine = '';
    var keys = Object.keys(lineSpec);
    
    for (var i = 0; i < keys.length; i++) {
        if (line[keys[i]] === undefined) {
            throw new Error('File spec does not match the input file. Missing ' + keys[i]);
        }
        if (line[keys[i]].toString().length <= lineSpec[keys[i]].length) {
            // Test the field to see if it's a number. Right justify with white space padding if it is, left justify otherwise
            if (isNaN(+line[keys[i]].toString())) {
                outputLine += (line[keys[i]].toString());
                outputLine += generateWhiteSpace(lineSpec[keys[i]].length - line[keys[i]].toString().length);
            } else {
                outputLine += generateWhiteSpace(lineSpec[keys[i]].length - line[keys[i]].toString().length);
                outputLine += (line[keys[i]].toString());
            }
        } else {
            console.log('Warning: ' + keys[i].toString() + ' for line ' + lineNum + ' is longer than specified in the file spec. This field will be truncated in the final output');
            outputLine += line[keys[i]].toString().slice(0, lineSpec[keys[i]].length - 1);
        }
    }

    return outputLine + '\n';
};

var generateDat = function(year, inputPath, outputPath) {
    var fileSpec = spec.getFileSpec(year);
    var inputFile = JSON.parse(fs.readFileSync(inputPath));
    var outputFile = fs.openSync(outputPath, 'w');

    // Parse the input and write the output file
    var ts = createOutputLine(inputFile.hmdaFile.transmittalSheet, 1, fileSpec.transmittalSheet);
    fs.writeSync(outputFile, ts);

    for (var i = 0; i < inputFile.hmdaFile.loanApplicationRegisters.length; i++) {
        var currLar = inputFile.hmdaFile.loanApplicationRegisters[i];
        fs.writeSync(outputFile, createOutputLine(currLar, i+2, fileSpec.loanApplicationRegister));
    }

    // Close the file once finished
    fs.closeSync(outputFile); 
}

var size = 'generateDat.js'.length;
if (process.argv[1].slice(process.argv[1].length - size) === 'generateDat.js') {
    if (process.argv.length === 5) {
        try {
            generateDat(process.argv[2], process.argv[3], process.argv[4]);
        } catch (err) {
            printUsage(err);
        }
    } else {
        printUsage();
    }
}

module.exports = generateDat;
