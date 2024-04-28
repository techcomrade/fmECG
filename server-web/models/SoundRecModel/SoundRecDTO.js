const Sequelize = require("sequelize");
const sequelize = require("../../config/sequelize");
const Record = require("../RecordModel/RecordDTO");

const Sound_rec = sequelize.define(
  "sound_rec",
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
    dummy_data: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    timestamps: false,
    freezeTableName: true
  }
);

module.exports = Sound_rec;
