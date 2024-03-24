const Sequelize = require("sequelize");
const sequelize = require("../../config/sequelize");

const Device = sequelize.define("devices", {
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },
  user_id: {
    type: Sequelize.STRING,
    allowNull: false,
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
  end_date: {
    type: Sequelize.BIGINT,
    allowNull: false,
  },
  created_at: {
    type: Sequelize.BIGINT,
  },
  updated_at: {
    type: Sequelize.BIGINT,
  },
});

module.exports = Device;
