const Sequelize = require("sequelize");
const sequelize = require("../../config/sequelize");
const Record = require("../RecordModel/RecordDTO");

const Spo2_rec = sequelize.define(
  "spo2_rec",
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
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Spo2_rec;
