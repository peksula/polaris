var Coordinate = require('./coordinate');

/**
 * Returns the coordinates of a multiline string object.
 * 
 * @param {*} feature GeoJSON feature object with multiline string geometry type.
 */
parseMultiLineString = (feature) => {
    let coordinates = [];
    feature.geometry.coordinates.forEach((lineString) => {
        lineString.forEach((coordinate) => {
            coordinates = [...coordinates, new Coordinate(Number(coordinate[0]), Number(coordinate[1]))];
        });
    });
    return coordinates;
}

/**
 * Returns the coordinates of a line string object.
 * 
 * @param {*} feature GeoJSON feature object with line string geometry type.
 */
parseLineString = (feature) => {
    let coordinates = [];
    feature.geometry.coordinates.forEach((coordinate) => {
        coordinates = [...coordinates, new Coordinate(Number(coordinate[0]), Number(coordinate[1]))];
    });
    return coordinates;
}

/**
 * Extract GeoJSON structures from the incoming GeoJSON input.
 */
class GeoJsonParser {
    constructor() {
    }

    /**
     * Returns an array of coordinate points from the incoming
     * GeoJSON feature collection. The collection must contain
     * LineString or MultiLineString structures.
     * 
     * @param {*} geojson GeoJSON object.
     */
    parseCoordinates(geojson) {
        let coordinates = [];
        if (geojson && geojson.features) {
            geojson.features.forEach((feature) => {
                const featureSwitch = {
                    'MultiLineString': (feature) => {
                        coordinates = parseMultiLineString(feature);
                    },
                    'LineString': (feature) => {
                        coordinates = parseLineString(feature)
                    },
                    'Point': (_feature) => {
                        // not supported
                    }

                };
                return featureSwitch[feature.geometry.type](feature);
            });
        }
        return coordinates;
    }

}
module.exports = GeoJsonParser;