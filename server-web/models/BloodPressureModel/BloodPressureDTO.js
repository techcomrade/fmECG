const Sequelize = reuqire("sequelize");
const sequelize = require("../../config/sequelize");

const blood_rec = sequelize.define("blood_pressure_rec", {
  id: {
    type: Sequelize.String,
    allowNull: false,
    primaryKey: true,
  },
  rec_id: {
    type: Sequelize.String,
    allowNull: false,
    references: {
      model: records,
      key: "id",
    },
  },
});

module.exports = blood_rec;
