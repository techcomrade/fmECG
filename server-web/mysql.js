const mysql = require('mysql');
require('dotenv').config();
const connection = mysql.createConnection({
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    charset: 'utf8'
})

module.exports = connection;