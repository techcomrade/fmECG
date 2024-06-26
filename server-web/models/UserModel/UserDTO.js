const Sequelize = require("sequelize");
const sequelize = require("../../config/sequelize");
const Account = require("../AccountModel/AccountDTO");


const User = sequelize.define(
  "users",
  {
    id: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    },
    account_id: {
      type: Sequelize.STRING,
      allowNull: false,
      references: {
        model: Account,
        key: "id",
      },
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    gender: {
      type: Sequelize.INTEGER,
    },
    birth: {
      type: Sequelize.BIGINT,
      allowNull: false,
    },
    phone_number: Sequelize.STRING,
    image: Sequelize.STRING,
    status: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    information: Sequelize.STRING,
    role: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    created_at: Sequelize.BIGINT,
    updated_at: Sequelize.BIGINT,
  },
  {
    associate: function (models) {
      User.hasMany(models.Assignment, {
        onDelete: "cascade",
      });
    },
  }
);

module.exports = User;
