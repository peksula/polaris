/**
 * Polaris unit tests.
 */

var assert = require('assert');
var Extractor = require('../extractor');

describe('Extractor', function() {

    let extractor = Extractor;

    const geoJsonLineString = 
    {
        "type": "FeatureCollection",
        "features": [
          {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "type": "LineString",
              "coordinates": [
                [
                  0.3515625,
                  48.86471476180277
                ],
                [
                  0.17578125,
                  48.10743118848039
                ]
              ]
            }
          }
        ]
      };

    beforeEach(function() {
        extractor = new Extractor();
    });

    describe('extractPoints()', function() {
        it('should return false with empty input', function() {
            assert.equal(false, extractor.extractPoints());
        });

        it('should return true with non-empty input', function() {
            assert.equal(true, extractor.extractPoints(geoJsonLineString));
        });
    });
});