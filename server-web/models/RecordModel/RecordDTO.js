const Sequelize = require("sequelize");
const sequelize = require("../../config/sequelize");

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
      model: users,
      key: "id",
    },
  },
  device_id: {
    type: Sequelize.STRING,
    allowNull: false,
    references: {
      model: devices,
      key: "id",
    },
  },
  device_type: {
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
});

module.exports = Record;
