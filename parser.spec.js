/**
 * Parser unit tests.
 */

var chai = require('chai');
var expect = chai.expect;

var GeoJsonParser = require('./parser');

describe('GeoJsonParser', function() {

    let parser = GeoJsonParser;

    const geoJsonMultiLineString = {
        "type": "FeatureCollection",
        "features": [{
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "MultiLineString",
                "coordinates": [[
                    [0.3515625, 48.86471476180277],
                    [0.17578125, 48.10743118848039]
                ]]
            }
        }]
    };

    const geoJsonLineString = {
        "type": "FeatureCollection",
        "features": [{
            "type":"Feature",
            "properties": {
                "TotalTimeSeconds": 675,
                "DistanceMeters": 1000,
                "Calories": 104,
                "starttime": "2019-01-27T12:31:16.000+02:00"
            },
            "geometry": {
                "type": "LineString",
                "coordinates": [
                    [25.06240200996399, 60.184268832206726],
                    [25.06240200996398, 60.184268832206725],
                    [25.06240200996397, 60.184268832206724]
                ]
            }
        }],
        "properties": {
            "totalMeters": 1000,
            "totalSeconds": 675,
            "startTime": "2019-01-27T12:31:16.000+02:00","sport":"Running"
        }
    };



    beforeEach(function() {
        parser = new GeoJsonParser();
    });

    describe('parseCoordinates', function() {
        it('should return empty array with empty input', function() {
            expect(parser.parseCoordinates("")).to.have.lengthOf(0);
        });

        it('should parse coordinates correctly from valid multi line string object', function() {
            coordinates = parser.parseCoordinates(geoJsonMultiLineString);
            expect(coordinates).to.have.lengthOf(2);
            expect(coordinates[0].lon).to.equal(0.3515625);
            expect(coordinates[0].lat).to.equal(48.86471476180277);
            expect(coordinates[1].lon).to.equal(0.17578125);
            expect(coordinates[1].lat).to.equal(48.10743118848039);
        });
    });

    it('should parse coordinates correctly from valid line string object', function() {
        coordinates = parser.parseCoordinates(geoJsonLineString);
        expect(coordinates).to.have.lengthOf(3);
        expect(coordinates[0].lon).to.equal(25.06240200996399);
        expect(coordinates[0].lat).to.equal(60.184268832206726);
        expect(coordinates[1].lon).to.equal(25.06240200996398);
        expect(coordinates[1].lat).to.equal(60.184268832206725);
        expect(coordinates[2].lon).to.equal(25.06240200996397);
        expect(coordinates[2].lat).to.equal(60.184268832206724);
    });
});
