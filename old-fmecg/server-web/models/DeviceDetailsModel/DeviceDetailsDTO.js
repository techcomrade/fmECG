const Sequelize = require("sequelize");
const sequelize = require("../../config/sequelize");
const devices = require("../DeviceModel/DeviceDTO");

const DeviceDetails = sequelize.define(
  "device_details",
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
    detail_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    detail_type: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    information: {
      type: Sequelize.STRING,
    },
    value: {
      type: Sequelize.STRING,
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

module.exports = DeviceDetails;
