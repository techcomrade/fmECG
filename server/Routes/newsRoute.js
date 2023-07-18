const express = require('express');
const newsRoute = express.Router();
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const newsController = require('../Controllers/newsController');

// Get news information by ID
newsRoute.get('/news/:newsId', newsController.getNewsById);
// Get all news with pagination support
newsRoute.get('/news', newsController.getAllNews);

newsRoute.get('/categories', newsController.getAllNewsCategories);
newsRoute.get('/category/:categoryId', newsController.getNewsCategoryById);
newsRoute.get('/news/category/:categoryId', newsController.getNewsByCategory);



module.exports = newsRoute;
