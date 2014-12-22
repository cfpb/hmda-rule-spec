'use strict';

describe('getValidYears', function() {
    it('should return valid years', function(done) {
        var result = specAPI.getValidYears();
        expect(result[0]).to.be('2013');
        done();
    });

});

describe('getValidObjectTypes', function() {
    it('should return valid object types', function(done) {
        var result = specAPI.getValidObjectTypes();
        expect(result[0]).to.be('hmda');
        done();
    });
});

describe('getValidEditTypes', function() {
    it('should return valid edit types', function(done) {
        var result = specAPI.getValidEditTypes();
        expect(result[0]).to.be('validity');
        done();
    });
});

describe('getFileSpec', function() {
    it('should return the spec for a given year', function(done) {
        var spec = specAPI.getFileSpec('2013');
        expect(spec.metadata.year).to.be('2013');
        done();
    });

    it('should return an empty object for an invalid year', function(done) {
        var spec = specAPI.getFileSpec('2000');
        expect(spec).to.be.empty();
        done();
    });
});

describe('getEdits', function() {
    it('should return the edits for a year, editType, objectType combo', function(done) {
        var edits = specAPI.getEdits('2013', 'ts', 'validity');
        expect(edits.length).to.be.at.least(1);
        done();
    });

    it('should return an empty list for an invalid year, editType, objectType combo', function(done) {
        var edits = specAPI.getEdits('2013', 'hmda', 'validity');
        expect(edits).to.be.empty();
        done();
    });
});
