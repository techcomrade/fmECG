const Sequelize = require("sequelize");
const sequelize = require("../../config/sequelize");

const User = sequelize.define(
  "registers",
  {
    id: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
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
  }
);

module.exports = User;
