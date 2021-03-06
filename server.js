/**
 * Polaris server.
 */

const fastify = require('fastify')({  // require and instantiate Fastify web framework
    bodyLimit: 5242880 // Allow 5 Mb payloads
});

var GeoJsonEncoder= require('./encoder');
var GeoJsonParser = require('./parser');
var TcxConverter = require('./tcxConverter');
var Validator = require('./validator');

const httpSuccess = 200;
const httpInvalidRequest = 400;
const httpInternalServerError = 500;
const encoder = new GeoJsonEncoder();
const parser = new GeoJsonParser();
const tcxConverter = new TcxConverter();
const validator = new Validator();
const zoomFactor = 16;

fastify.route({
    method: 'POST',
    url: '/api/geojson',
    beforeHandler: function (request, reply, done) {
        let geojson = JSON.parse(request.body);
        if(!validator.validateFeatureCollection(geojson)) {
            reply.code(httpInvalidRequest).send();
        }
        done()
    },
    handler: function (request, reply) {
        let geoJson = JSON.parse(request.body);
        const coordinates = parser.parseCoordinates(geoJson);
        const feature = encoder.encodeMultiPolygon(coordinates, zoomFactor);
        reply.code(httpSuccess).send(JSON.stringify(feature));
    }
})

fastify.route({
    method: 'POST',
    url: '/api/tcx',
    handler: function (request, reply) {
        let tcx = request.body;
        let geoJson = tcxConverter.convertToJson(tcx);
        const coordinates = parser.parseCoordinates(geoJson);
        const feature = encoder.encodeMultiPolygon(coordinates, zoomFactor);
        reply.code(httpSuccess).send(JSON.stringify(feature));
    }
})

fastify.setErrorHandler(function (error, _request, reply) {
    console.log(`error detected ${error}`);
    reply.code(httpInternalServerError).send(error);
})

const start = async () => {
    try {
        await fastify.listen(3000);
        console.log(`server listening on ${fastify.server.address().port}`);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

start();