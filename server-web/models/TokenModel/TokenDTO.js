const Sequelize = require("sequelize");
const sequelize = require("../../config/sequelize");
const Account = require("../AccountModel/AccountDTO");

const Token = sequelize.define("tokens", {
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
  access_token: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  refresh_token: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});
module.exports = Token;
