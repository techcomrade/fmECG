const Sequelize = require('sequelize').Sequelize;
const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, '../config.env') });

const sequelize = new Sequelize(process.env.DATABASE, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql', // Replace with your database dialect (e.g., mysql, postgres, sqlite, etc.)
});

module.exports = sequelize;