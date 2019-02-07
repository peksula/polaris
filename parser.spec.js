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

    describe('parsePoints', function() {
        it('should return empty array with empty input', function() {
            expect(parser.parsePoints("")).to.have.lengthOf(0);
        });

        it('should parse points correctly from valid multi line string object', function() {
            points = parser.parsePoints(geoJsonMultiLineString);
            expect(points).to.have.lengthOf(2);
            expect(points[0].includes(0.3515625)).to.be.true;
            expect(points[0].includes(48.86471476180277)).to.be.true;
            expect(points[1].includes(0.17578125)).to.be.true;
            expect(points[1].includes(48.10743118848039)).to.be.true;
        });
    });

    it('should parse points correctly from valid line string object', function() {
        points = parser.parsePoints(geoJsonLineString);
        expect(points).to.have.lengthOf(3);
        expect(points[0].includes(25.06240200996399)).to.be.true;
        expect(points[0].includes(60.184268832206726)).to.be.true;
        expect(points[1].includes(25.06240200996398)).to.be.true;
        expect(points[1].includes(60.184268832206725)).to.be.true;
        expect(points[2].includes(25.06240200996397)).to.be.true;
        expect(points[2].includes(60.184268832206724)).to.be.true;
    });
});
