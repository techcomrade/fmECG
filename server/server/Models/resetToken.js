const Sequelize = require('sequelize');
const sequelize = require('../util/db');
const ResetToken = sequelize.define('resetToken', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    token: {
      type: Sequelize.STRING,
      allowNull: false
    },
    expiration: {
      type: Sequelize.DATE,
      allowNull: false
    }
  });
  
  module.exports = ResetToken;