/**
 * Validate GeoJSON with jsonschema.
 */

var SchemaValidator = require('jsonschema').Validator;

const anyGeometrySchema = require('./any-geometry-schema.json')
const featureSchema = require('./feature-schema.json')
const featureCollectionSchema = require('./feature-collection-schema.json')
const multiLineStringSchema = require('./multi-line-string-schema.json')
const positionSchema = require('./position-schema.json')


class Validator {
    constructor() {
        this.schemaValidator = new SchemaValidator();
    }

    validateMultiLineString(geojson) {
        this.schemaValidatorvalidator.addSchema(anyGeometrySchema, 'http://geojson.org/schema/any-geometry');
        this.schemaValidatorvalidator.addSchema(featureSchema, 'http://geojson.org/schema/feature');
        this.schemaValidatorvalidator.addSchema(featureCollectionSchema, 'http://geojson.org/schema/feature-collection');
        this.schemaValidatorvalidator.addSchema(multiLineStringSchema, 'http://geojson.org/schema/multi-line-string');
        this.schemaValidatorvalidator.addSchema(positionSchema, 'http://geojson.org/schema/position');

        console.log(validator.unresolvedRefs);
        validationResult = this.schemaValidator.validate(geojson, featureCollectionSchema);
        if (!validationResult) {
            console.log(validationResult.errors.length + " errors")
            validationResult.errors.forEach((error) => {
                console.log(error.message)
                console.log(error.name)
                //console.log(error.argument)
                console.log(error.property)
            })
        }
        return validationResult;
    }
}
module.exports = Validator;