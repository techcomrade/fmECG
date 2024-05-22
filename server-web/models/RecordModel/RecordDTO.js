const Sequelize = require("sequelize");
const sequelize = require("../../config/sequelize");
const User = require("../UserModel/UserDTO");
const Device = require("../DeviceModel/DeviceDTO");

const Record = sequelize.define("records", {
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },
  user_id: {
    type: Sequelize.STRING,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
  device_id: {
    type: Sequelize.STRING,
    allowNull: false,
    references: {
      model: Device,
      key: "id",
    },
  },
  record_type: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  start_time: {
    type: Sequelize.BIGINT,
    allowNull: false,
  },
  end_time: {
    type: Sequelize.BIGINT,
    allowNull: false,
  },
  data_rec_url: {
    type: Sequelize.STRING(45),
    allowNull: false,
  },
  created_at: Sequelize.BIGINT,
  updated_at: Sequelize.BIGINT,
  dummy_data: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = Record;
