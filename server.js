/**
 * Polaris server.
 */

const fastify = require('fastify')() // require and instantiate Fastify web framework
var Parser = require('./parser');
var Validator = require('./validator');

const httpSuccess = 200;
const httpInvalidRequest = 400;

fastify.post('/api/multilinestring', async (request, reply) => {
    let geojson = JSON.parse(request.body);
    const validator = new Validator();
    if (validator.validateFeatureCollection(geojson)) {
        const parser = new Parser();
        const points = parser.parseMultiLineString(geojson);
        reply.code(httpSuccess).send(JSON.stringify(points));
        return;
    }
    reply.code(httpInvalidRequest).send();
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