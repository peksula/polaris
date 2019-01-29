/**
 * Polaris server.
 */

const fastify = require('fastify')() // require and instantiate Fastify web framework
var Parser = require('./parser');
var Validator = require('./validator');

const httpSuccess = 200;
const httpInvalidRequest = 400;
const parser = new Parser();
const validator = new Validator();

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
        let geojson = JSON.parse(request.body);
        const points = parser.parseMultiLineString(geojson);
        reply.code(httpSuccess).send(JSON.stringify(points));
    }
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