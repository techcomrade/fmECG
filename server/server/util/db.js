const Sequelize = require('sequelize').Sequelize;

// TODO(TuanHA): User dotenv to get env config instead of context data
const sequelize = new Sequelize('ecg_system', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql', // Replace with your database dialect (e.g., mysql, postgres, sqlite, etc.)
});

module.exports = sequelize;