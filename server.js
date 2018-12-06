// Require the framework and instantiate it
const fastify = require('fastify')() // require and instantiate Fastify web framework

// Declare a route
fastify.get('/', async (request, reply) => {
    return { hello: 'world' }
})


const start = async () => {
    try {
        await fastify.listen(3000);
        fastify.log.info(`server listening on ${fastify.server.address().port}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
}

start();