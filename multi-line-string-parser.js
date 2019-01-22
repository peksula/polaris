/**
 * Extract GeoJSON Points from incoming GeoJSON multi line string input.
 */
class MultiLineStringParser {
    constructor() {
    }

    extractPoints(geojson) {
        let points = [];
        if (geojson && geojson.features) {
            geojson.features.forEach((feature) => {
                if (feature.geometry.type === 'MultiLineString') {
                    feature.geometry.coordinates.forEach((lineString) => {
                        lineString.forEach((coordinate) => {
                            points = [...points, coordinate];
                        });
                    });
                }
            });
        }
        return points;
    }
}
module.exports = MultiLineStringParser;