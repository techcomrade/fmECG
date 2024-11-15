const Sequelize = require("sequelize");
const sequelize = require("../../config/sequelize");
const User = require("../UserModel/UserDTO");

const Assignment = sequelize.define(
  "patient_doctor_assignment",
  {
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
    end_date: {
      type: Sequelize.BIGINT,
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
  { freezeTableName: true }
);
module.exports = Assignment;
