/**
 * Encoder unit tests.
 */

var chai = require('chai');
var expect = chai.expect;

var Coordinate = require('./coordinate');
var GeoJsonEncoder = require('./encoder');

describe('GeoJsonEncoder', function() {

    let encoder = GeoJsonEncoder;

    beforeEach(function() {
        encoder = new GeoJsonEncoder();
    });

    describe('encodeMultiPolygon', function() {
        it('should form valid multi polygon geojson', function() {
            coordinates = [
                new Coordinate(25.06240200996397, 60.184268832206724),
                new Coordinate(25.475957, 60.991077)
            ];

            multiPolygon = encoder.encodeMultiPolygon(coordinates, 16);
            expect(multiPolygon.type).to.equal("Feature");
            expect(multiPolygon.geometry.type).to.equal("MultiPolygon");
            expect(multiPolygon.geometry.coordinates).to.have.lengthOf(2);
            const expected = [
                [
                    [25.059814453125,60.18523283150749],
                    [25.0653076171875,60.18523283150749],
                    [25.0653076171875,60.182501529929304],
                    [25.059814453125,60.182501529929304]],
                [
                    [25.4718017578125,60.99175939037398],
                    [25.477294921875,60.99175939037398],
                    [25.477294921875,60.98909544893918],
                    [25.4718017578125,60.98909544893918]
                ]
            ];
            expect(multiPolygon.geometry.coordinates).to.deep.equal(expected);
        });
    });
});
