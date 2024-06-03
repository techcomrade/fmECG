const Sequelize = require("sequelize");
const sequelize = require("../../config/sequelize");
const NewsCategory = require("../NewsCategoryModel/NewsCategoryDTO");
const News = sequelize.define("news", {
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.STRING,
    allowNull: false,
    description: Sequelize.TEXT,
  },
  category_id: {
    type: Sequelize.STRING,
    allowNull: false,
    references: {
      model: NewsCategory,
      key: "id",
    },
  },
  author: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  url: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  image: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  created_at: Sequelize.BIGINT,
  updated_at: Sequelize.BIGINT,
});

module.exports = News;
