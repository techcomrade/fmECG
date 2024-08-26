const Redis = require('ioredis');
const redis = new Redis(6381);

module.exports = redis; 