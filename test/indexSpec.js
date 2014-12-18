'use strict';

describe('getValidYears', function() {
    it('should return valid years', function(done) {
        var result = specAPI.getValidYears();
        expect(result[0]).to.be('2013');
        done();
    });
});