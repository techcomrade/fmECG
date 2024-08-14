const redis = require('redis');

const client = redis.createClient({
    socket: {
        port: 6380,
        host: '127.0.0.1'
    }
});

client.on('error', (err) => {
    console.error('Redis client error', err);
});

async function connectRedis() {
    try {
        await client.connect();
        console.log('Redis connected');
        const pong = await client.ping();
        console.log(pong);
    } catch (err) {
        console.error('Connection error:', err);
    }
}

connectRedis();

module.exports = client;
