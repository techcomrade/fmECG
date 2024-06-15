const Sequelize = require("sequelize");
const sequelize = require("../../config/sequelize");
const devices = require("../DeviceModel/DeviceDTO");

const DeviceFrequency = sequelize.define(
  "device_frequency",
  {
    id: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    },
    device_id: {
      type: Sequelize.STRING,
      references: {
        model: devices,
        key: "id",
      },
    },
    frequency_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    information: {
      type: Sequelize.STRING,
    },
    value: {
      type: Sequelize.DOUBLE,
      allowNull: false,
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
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = DeviceFrequency;
