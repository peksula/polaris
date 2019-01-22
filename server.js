/**
 * Polaris server.
 */

const fastify = require('fastify')() // require and instantiate Fastify web framework
var MultiLineStringParser = require('./multi-line-string-parser');

fastify.get('/', async (request, reply) => {
    return { hello: 'world' }
})

fastify.post('/api/multilinestring', async (request, reply) => {
    let geojson = JSON.parse(request.body);
    const parser = new MultiLineStringParser();
    const points = parser.extractPoints(geojson);
    reply.code(200).send();
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