const Sequelize = require('sequelize');
const sequelize = require('../util/db');
const User = require('./userModel');

const EcgRecords = sequelize.define('ecg_record', {
  record_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'user_id'
    }
  },
  device_id: {
    type: Sequelize.STRING,
    allowNull: false
  },
  data_directory: {
    type: Sequelize.STRING,
    allowNull: false
  },
  start_time: {
    type: Sequelize.DATE,
    allowNull: false
  },
  stop_time: {
    type: Sequelize.DATE,
    allowNull: false
  },
  sensor_type: {
    type: Sequelize.STRING,
    allowNull: false
  },
},
{
  updatedAt: 'updated_at',
  createdAt: 'created_at',
  tableName: 'ecg_records'
});

User.hasMany(EcgRecords, { foreignKey: 'user_id' });
EcgRecords.belongsTo(User, { foreignKey: 'user_id' });

module.exports = EcgRecords;

