/**
 * Polaris unit tests.
 */

var assert = require('assert');
var MultiLineStringParser = require('../multi-line-string-parser');

describe('MultiLineStringParser', function() {

    let parser = MultiLineStringParser;

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
        parser = new MultiLineStringParser();
    });

    describe('extractPoints()', function() {
        it('should return empty array with empty input', function() {
            assert.strictEqual(0, parser.extractPoints().length);
        });

        it('should parse points correctly from valid multi line string object', function() {
            points = parser.extractPoints(geoJsonMultiLineString);
            assert.strictEqual(2, points.length);
            assert.ok(points[0].includes(0.3515625));
            assert.ok(points[0].includes(48.86471476180277));
            assert.ok(points[1].includes(0.17578125));
            assert.ok(points[1].includes(48.10743118848039));
        });
    });
});