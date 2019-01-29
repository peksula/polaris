/**
 * Validate GeoJSON.
 */

var GeoJsonValidator = require("geojson-validation");

class Validator {
    constructor() {
    }

    validateFeatureCollection(geoJson) {
        let passesValidation = true;
        if (GeoJsonValidator.isFeatureCollection(geoJson, function(valid, _errs) {
            if (!valid) {
                //console.log(_errs);
                passesValidation = false;
            }
        }));
        return passesValidation;
    }

}
module.exports = Validator;