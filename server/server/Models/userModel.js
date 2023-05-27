const Sequelize = require('sequelize');
const sequelize = require('../util/db');

const User = sequelize.define('user', {
  user_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false, 
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  doB: {
    // TODO(TuanHA): Update type to DateTime
    type: Sequelize.STRING,
    allowNull: false
  },
  phone_number: {
    type: Sequelize.STRING,
    allowNull: false
  },
  role: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

module.exports = User;