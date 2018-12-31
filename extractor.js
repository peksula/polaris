/**
 * Extract POIs from incoming geojson input.
 */
class Extractor {
    constructor() {
    }

    extractPoints(geojson) {
        if (!geojson) {
            return false;
        }
        return true;
    }
}
module.exports = Extractor;