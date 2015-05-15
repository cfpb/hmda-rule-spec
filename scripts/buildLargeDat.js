'use strict';

var fs = require('fs');
var _ = require('lodash');
var pretty = require('js-object-pretty-print').pretty;
var generateDat = require('./generateDat');

var printUsage = function(err) {
    if (err) {
        console.log(err.message);
    }
    console.log('Usage: node buildLargeDat.js [year] [input file path (json)] [output file name] [size] [lar builder](optional)');
    console.log('Example: node buildLargeDat.js nprm ./nprm.json ./nprm-large 1000');
};

var cloneLarBuilder = function(year, lar) {
    return _.clone(lar);
};

var buildLargeDat = function(year, inputPath, outputPath, size, larBuilder) {
    var inputFile = JSON.parse(fs.readFileSync(inputPath));
    var outputJson = fs.openSync(outputPath + '.json', 'w');
    var newJson = {
        'hmdaFile': {
            'transmittalSheet': inputFile.hmdaFile.transmittalSheet,
            'loanApplicationRegisters': []
        }
    };

    var lar = inputFile.hmdaFile.loanApplicationRegisters[0];
    for (var i = 0; i < size; i++) {
        var newLar = larBuilder(year, lar);
        newLar.lineNumber = (+lar.lineNumber + i).toString();
        newJson.hmdaFile.loanApplicationRegisters.push(newLar);
    }

    fs.writeSync(outputJson, pretty(newJson, 4, 'JSON'));
    fs.closeSync(outputJson);

    generateDat(year, outputPath + '.json', outputPath + '.dat');
};

var size = 'buildLargeDat.js'.length;
if (process.argv[1].slice(process.argv[1].length - size) === 'buildLargeDat.js') {
    if (process.argv.length === 6) {
        try {
            buildLargeDat(process.argv[2], process.argv[3], process.argv[4], process.argv[5], cloneLarBuilder);
        } catch (err) {
            printUsage(err);
        }
    } else if (process.argv.length === 7) {
        try {
            var larBuilder = require(process.argv[6]);
            buildLargeDat(process.argv[2], process.argv[3], process.argv[4], process.argv[5], larBuilder);
        } catch (err) {
            printUsage(err);
        }
    } else {
        printUsage();
    }    
}

module.exports = buildLargeDat;