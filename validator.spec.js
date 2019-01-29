/**
 * Validator unit tests.
 */

var chai = require('chai');
var expect = chai.expect;

var Validator = require('./validator');

const validFeatureCollection = {
    "type": "FeatureCollection",
    "name": "tracks",
    "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
    "features": [
        { 
            "type": "Feature",
            "properties": { "name": "Iltakävely", "type": "10" },
            "geometry": { "type": "MultiLineString", "coordinates": [ [ [ 25.05631, 60.185807 ], [ 25.056403, 60.18588 ], [ 25.056501, 60.186035 ] ] ] }
        }
    ]
};

const invalidFeatureCollection = {
    "type": "FeatureCollection",
    "name": "tracks",
    "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
    "features": [
        { 
            "type": "Feature",
            "properties": { "name": "Iltakävely", "type": "10" },
            "geometry": { "type": "MultiLineString" }
        }
    ]
};

describe('Validator', function() {

    let validator = Validator;

    beforeEach(function() {
        validator = new Validator();
    });

    describe('validateFeatureCollection', function() {
        it('should return false with empty input', function() {
            expect(validator.validateFeatureCollection("")).to.be.false;
        });

        it('should return true with valid input', function() {
            expect(validator.validateFeatureCollection(validFeatureCollection)).to.be.true;
        });

        it('should return false with invalid input', function() {
            expect(validator.validateFeatureCollection(invalidFeatureCollection)).to.not.be.true;
        });
    });
});