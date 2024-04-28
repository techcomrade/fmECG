const Sequelize = require("sequelize");
const sequelize = require("../../config/sequelize");
const User = require("../UserModel/UserDTO");

const Assignment = sequelize.define("patient_doctor_asssignment", {
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },
  patient_id: {
    type: Sequelize.STRING,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
  doctor_id: {
    type: Sequelize.STRING,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
  start_date: {
    type: Sequelize.BIGINT,
    allowNull: false,
  },
  created_at: {
    type: Sequelize.BIGINT,
  },
  updated_at: {
    type: Sequelize.BIGINT,
  },
  dummy_data: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});
module.exports = Assignment;
