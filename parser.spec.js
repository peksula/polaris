/**
 * Parser unit tests.
 */

var chai = require('chai');
var expect = chai.expect;

var Parser = require('./parser');

describe('Parser', function() {

    let parser = Parser;

    const geoJsonMultiLineString = 
    {
        "type": "FeatureCollection",
        "features": [
          {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "type": "MultiLineString",
              "coordinates": [ [
                [
                  0.3515625,
                  48.86471476180277
                ],
                [
                  0.17578125,
                  48.10743118848039
                ]
              ] ]
            }
          }
        ]
      };

    beforeEach(function() {
        parser = new Parser();
    });

    describe('parseMultiLineString', function() {
        it('should return empty array with empty input', function() {
            expect(parser.parseMultiLineString("")).to.have.lengthOf(0);
        });

        it('should parse points correctly from valid multi line string object', function() {
            points = parser.parseMultiLineString(geoJsonMultiLineString);
            expect(points).to.have.lengthOf(2);
            expect(points[0].includes(0.3515625)).to.be.true;
            expect(points[0].includes(48.86471476180277)).to.be.true;
            expect(points[1].includes(0.17578125)).to.be.true;
            expect(points[1].includes(48.10743118848039)).to.be.true;
        });
    });
});
