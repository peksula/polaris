/**
 * Validator unit tests.
 */

var assert = require('assert');
var Validator = require('./validator');

describe('Validator', function() {

    let validator = Validator;

    beforeEach(function() {
        validator = new Validator();
    });

    describe('validateMultiLineString()', function() {
        it('should return false with empty input', function() {
            assert.fail(validator.validateMultiLineString(""));
        });

    });
});