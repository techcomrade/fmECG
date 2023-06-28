const Sequelize = require('sequelize');
const sequelize = require('../util/db');
const User = require('./userModel');

const ResetToken = sequelize.define('reset_token', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  user_id: {
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
}, {
  updatedAt: 'updated_at',
  createdAt: 'created_at',
  tableName: 'reset_tokens'
});

// Define the association between ResetToken and User
ResetToken.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE' // Optional: Cascade delete reset tokens when a user is deleted
});
User.hasMany(ResetToken, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE' // Optional: Cascade delete reset tokens when a user is deleted
});

module.exports = ResetToken;
