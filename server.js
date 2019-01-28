/**
 * Polaris server.
 */

const fastify = require('fastify')() // require and instantiate Fastify web framework
var Parser = require('./parser');
var Validator = require('./validator');

const httpSuccess = 200;
const httpInvalidRequest = 400;

fastify.get('/', async (request, reply) => {
    return { hello: 'world' }
})

fastify.post('/api/multilinestring', async (request, reply) => {
    let geojson = request.body;
    const validator = new Validator();
    if (validator.validateMultiLineString(geojson)) {
        console.log("json valid")
        const parser = new Parser();
        const points = parser.extractPoints(JSON.parse(geojson));
        reply.code(httpSuccess).send();
        return;
    }
    console.log("json invalid")
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