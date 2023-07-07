const express = require('express');
const newsRoute = express.Router();
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const newsController = require('../Controllers/newsController');

// Get news information by ID
newsRoute.get('/:newsId', newsController.getNewsById);
// Get all news with pagination support
newsRoute.get('/', newsController.getAllNews);


module.exports = newsRoute;
