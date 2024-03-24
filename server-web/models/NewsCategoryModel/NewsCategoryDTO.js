const Sequelize = require("sequelize");
const sequelize = require("../../config/sequelize");

const NewsCategory = sequelize.define("news_categories", {
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },
  category_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  categorY_description: {
    type: Sequelize.STRING,
    allowNull: false,
    description: Sequelize.TEXT,
  },
  created_at: Sequelize.STRING,
  updated_at: Sequelize.STRING,
});

module.exports = NewsCategory;
