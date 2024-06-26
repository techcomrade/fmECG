const Sequelize = require("sequelize");
const sequelize = require("../../config/sequelize");
const users = require('../UserModel/UserDTO');

const Device = sequelize.define("devices", {
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },
  user_id: {
    type: Sequelize.STRING,
    references: {
      model: users,
      key: "id",
    },
  },
  doctor_id: {
    type: Sequelize.STRING,
    references: {
      model: users,
      key: "id",
    },
  },
  device_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  information: {
    type: Sequelize.STRING,
    description: Sequelize.TEXT,
  },
  device_type: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  start_date: {
    type: Sequelize.BIGINT,
    allowNull: false,
  },
  status:{
    type: Sequelize.INTEGER,
  },
  created_at: {
    type: Sequelize.BIGINT,
  },
  updated_at: {
    type: Sequelize.BIGINT,
  },
  dummy_data: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = Device;
