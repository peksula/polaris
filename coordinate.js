
/**
 * Represents a geospatial point.
 * Longitude: east-west.
 * Latitude: north-south.
 */
class Coordinate {
    constructor(lon, lat) {
        this.lon = lon;
        this.lat = lat;
    }
}
module.exports = Coordinate;