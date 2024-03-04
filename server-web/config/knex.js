const knex = require('knex')
const database = require('./database')

module.exports = knex(database);