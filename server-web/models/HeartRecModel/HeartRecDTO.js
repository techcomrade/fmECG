const Sequelize = require("sequelize");
const sequelize = require("../../config/sequelize");
const Record = require("../RecordModel/RecordDTO");

const Heart_rec = sequelize.define(
  "heart_rec",
  {
    id: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    },
    rec_id: {
      type: Sequelize.STRING,
      allowNull: false,
      references: {
        model: Record,
        key: "id",
      },
    },
  },
  {
    timestamps: false,
    freezeTableName: true
  }
);

module.exports = Heart_rec;
