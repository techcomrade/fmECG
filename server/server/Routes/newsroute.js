const express = require('express');
const newsRoute = express.Router();
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const newsController = require('../Controllers/newsController');

// Get news information by ID
newsRoute.get('/:newsId', newsController.getNewsById);
// Get all news with pagination support
newsRoute.get('/', newsController.getAllNews);
// Create news (only accessible to admins)
newsRoute.post('/', newsController.createNews);
// Update news by ID (only accessible to admins)
newsRoute.put('/:id', newsController.updateNewsById);
// Delete news by ID  (only accessible to admins)
newsRoute.delete('/:id', newsController.deleteNewsById);

// Get all news categories with pagination support
newsRoute.get('/categories', newsController.getAllNewsCategories);
// Get news category information by ID
newsRoute.get('/categories/:categoryId', newsController.getNewsCategoryById);
// Add a news category  (only accessible to admins)
newsRoute.post('/category', newsController.addNewsCategory);
// Delete a news category by ID  (only accessible to admins)
newsRoute.delete('/category/:id', newsController.deleteNewsCategory);
// Update a news category by ID  (only accessible to admins)
newsRoute.put('/category/:id', newsController.updateNewsCategory);

module.exports = newsRoute;