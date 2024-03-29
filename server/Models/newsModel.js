const { DataTypes } = require('sequelize');
const sequelize = require('../util/db');

const NewsCategory = sequelize.define('news_category', {
  category_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  category_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category_description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},
{
  updatedAt: 'updated_at',
  createdAt: 'created_at',
  tableName: 'news_categories'
});

const News = sequelize.define('news', {
  news_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
},
{
  updatedAt: 'updated_at',
  createdAt: 'created_at',
  tableName: 'news'
});

NewsCategory.hasMany(News, {
  foreignKey: 'category_id',
});
News.belongsTo(NewsCategory, {
  foreignKey: 'category_id',
});

module.exports = { News, NewsCategory };
