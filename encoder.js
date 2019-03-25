var Coordinate = require('./coordinate');

/**
 * Returns the longitudal tile index with given zoom.
 * https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames#ECMAScript_.28JavaScript.2FActionScript.2C_etc..29
 */
lon2tile = (lon, zoom) => {
    return (Math.floor((lon + 180) / 360 * Math.pow(2, zoom)));
}

/**
 * Returns the latitudal tile index with given zoom.
 * https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames#ECMAScript_.28JavaScript.2FActionScript.2C_etc..29
 */
lat2tile = (lat, zoom) => {
    return (Math.floor((1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) /2 * Math.pow(2, zoom)));
}

/**
 * Returns the coordinates of the north-west corner of the given map tile in given zoom.
 * Use the function with xtile+1 and/or ytile+1 to get the other corners.
 * With xtile+0.5 & ytile+0.5 it will return the center of the tile.
 * https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames#Tile_numbers_to_lon..2Flat._2
 */
tile2point = (lonTile, latTile, zoom) => {
    const n = Math.pow(2, zoom);
    lonDeg = lonTile / n * 360 - 180;
    latRad = Math.atan(Math.sinh(Math.PI * (1 - 2 * latTile / n)));
    latDeg = 180.0 * (latRad / Math.PI)
    return new Coordinate(lonDeg, latDeg);
}

/**
 * Encodes GeoJSON structures from the incoming coordinates.
 */
class GeoJsonEncoder {

    /**
     * Constructor.
     */
    constructor() {
    }

    /**
     */
    encodeMultiPolygon(coordinates, zoom) {
        let multiPolygon = [];
        if (coordinates && zoom) {
            coordinates.forEach((coordinate) => {
                // Get the corresponding map tile indexes
                const longitudalTile = lon2tile(coordinate.lon, zoom);
                const latitudalTile = lat2tile(coordinate.lat, zoom);
                // Get the coordinates of the corners of the map tile
                const nw = tile2point(longitudalTile, latitudalTile, zoom);
                const ne = tile2point(longitudalTile + 1, latitudalTile, zoom);
                const sw = tile2point(longitudalTile, latitudalTile + 1, zoom);
                const se = tile2point(longitudalTile + 1, latitudalTile + 1, zoom);
                // const center = tile2point(longitudalTile + 0.5, latitudalTile + 0.5, zoom);
                multiPolygon = [...multiPolygon,
                    [[nw.lon, nw.lat], [ne.lon, ne.lat], [se.lon, se.lat], [sw.lon, sw.lat]]
                ];
            });
        }
        return this._envelope(multiPolygon, "MultiPolygon");
    }

    /**
     * Utility function that prints the http addresses of the kapsi tile corresponding to given coordinates and zoom level.
     *
     * @param {*} coordinates Coordinates.
     * @param {*} zoom Zoom level.
     */
    printUrl(coordinates, zoom) {
        if (coordinates && zoom) {
            coordinates.forEach((coordinate) => {
                const longitudalTile = lon2tile(coordinate.lon, zoom);
                const latitudalTile = lat2tile(coordinate.lat, zoom);
                console.log(`http://tiles.kartat.kapsi.fi/1.0.0/peruskartta/${zoom}/${longitudalTile}/${latitudalTile}.png`);
            });
        }
    }

    /**
     * Wraps the incoming geometry of given type to GeoJson envelope.
     *
     * @param geometry Geometry coordinates.
     * @param type Geometry type.
     */
    _envelope(geometry, type) {
        return {
            "type": "Feature",
            "properties": {
                "name": "Generated"
            },
            "geometry": {
                "type": type,
                "coordinates": geometry
            }
        }
    }

}
module.exports = GeoJsonEncoder;