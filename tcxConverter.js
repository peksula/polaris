/**
 * Converts TCX to GeoJSON.
 */
let converter = require('tcx');
var DOMParser = require('xmldom').DOMParser;

class TcxConverter {
    constructor() {
    }

    convertToJson(tcxString) {
        let xmlDocument = new DOMParser().parseFromString(tcxString);
        return converter(xmlDocument);
    }
}
module.exports = TcxConverter;