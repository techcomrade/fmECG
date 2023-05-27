const express = require('express');
const newsroute = express.Router();
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const newscontroller = require('../Controllers/newscontroller');

// Get news information by ID
newsroute.get('/:newsId', newscontroller.getNewsById);
// Get all news with pagination support
newsroute.get('/', newscontroller.getAllNews);
// Create news (only accessible to admins)
newsroute.post('/', newscontroller.createNews);
// Update news by ID (only accessible to admins)
newsroute.put('/:id', newscontroller.updateNewsById);
// Delete news by ID  (only accessible to admins)
newsroute.delete('/:id', newscontroller.deleteNewsById);

// Get all news categories with pagination support
newsroute.get('/categories', newscontroller.getAllNewsCategories);
// Get news category information by ID
newsroute.get('/categories/:categoryId', newscontroller.getNewsCategoryById);
// Add a news category  (only accessible to admins)
newsroute.post('/category', newscontroller.addNewsCategory);
// Delete a news category by ID  (only accessible to admins)
newsroute.delete('/category/:id', newscontroller.deleteNewsCategory);
// Update a news category by ID  (only accessible to admins)
newsroute.put('/category/:id', newscontroller.updateNewsCategory);

module.exports = newsroute;