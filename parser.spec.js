/**
 * Parser unit tests.
 */

var assert = require('assert');
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

    describe('parseMultiLineString()', function() {
        it('should return empty array with empty input', function() {
            assert.strictEqual(0, parser.parseMultiLineString().length);
        });

        it('should parse points correctly from valid multi line string object', function() {
            points = parser.parseMultiLineString(geoJsonMultiLineString);
            assert.strictEqual(2, points.length);
            assert.ok(points[0].includes(0.3515625));
            assert.ok(points[0].includes(48.86471476180277));
            assert.ok(points[1].includes(0.17578125));
            assert.ok(points[1].includes(48.10743118848039));
        });
    });
});
