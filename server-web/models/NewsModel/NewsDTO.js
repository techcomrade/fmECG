const Sequelize = require("sequelize");
const sequelize = require("../../config/sequelize");

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
  conntent: {
    type: Sequelize.STRING,
    allowNull: false,
    description: Sequelize.TEXT,
  },
  category_id: {
    type: Sequelize.STRING,
    allowNull: false,
    references: {
      model: news_categories,
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
