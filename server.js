/**
 * Polaris server.
 */

const fastify = require('fastify')() // require and instantiate Fastify web framework
var Extractor = require('./extractor');

fastify.get('/', async (request, reply) => {
    return { hello: 'world' }
})

fastify.post('/api/linestring', async (request, reply) => {
    let geojson = request.body;
    const extractor = new Extractor();
    extractor.extractPoints(geojson);
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