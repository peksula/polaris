    /**
     * Returns the coordinates of a multiline string object.
     * 
     * @param {*} feature GeoJSON feature object with multiline string geometry type.
     */
    parseMultiLineString = (feature) => {
        let points = [];
        feature.geometry.coordinates.forEach((lineString) => {
            lineString.forEach((coordinate) => {
                points = [...points, coordinate];
            });
        });
        return points;
    }

    /**
     * Returns the coordinates of a line string object.
     * 
     * @param {*} feature GeoJSON feature object with line string geometry type.
     */
    parseLineString = (feature) => {
        let points = [];
        feature.geometry.coordinates.forEach((coordinate) => {
            points = [...points, coordinate];
        });
        return points;
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
    parsePoints(geojson) {
        let points = [];
        if (geojson && geojson.features) {
            geojson.features.forEach((feature) => {
                const featureSwitch = {
                    'MultiLineString': (feature) => {
                        points = parseMultiLineString(feature);
                    },
                    'LineString': (feature) => {
                        points = parseLineString(feature)
                    }
                };
                return featureSwitch[feature.geometry.type](feature);
            });
        }
        return points;
    }

}
module.exports = GeoJsonParser;