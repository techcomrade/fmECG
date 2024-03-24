const Sequelize = require("sequelize");
const sequelize = require("../../config/sequelize");

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
      model: users,
      key: "id",
    },
  },
  doctor_id: {
    type: Sequelize.STRING,
    allowNull: false,
    references: {
      model: users,
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
});
module.exports = Assignment;
