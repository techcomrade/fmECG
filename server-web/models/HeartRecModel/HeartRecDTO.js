const Sequelize = require("sequelize");
const sequelize = require("../../config/sequelize");

const Heart_rec = sequelize.define("heart_rec", {
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

module.exports = Heart_rec;
