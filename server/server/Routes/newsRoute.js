import express from 'express';
import bodyParser from 'body-parser';
import { getNewsById, getAllNews, createNews, updateNewsById, deleteNewsById, getAllNewsCategories, getNewsCategoryById, addNewsCategory,deleteNewsCategory, updateNewsCategory } from '../Controllers/newsController.js';

const newsRoute = express.Router();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

// Get news information by ID
newsRoute.get('/:newsId', getNewsById);
// Get all news with pagination support
newsRoute.get('/', getAllNews);
// Create news (only accessible to admins)
newsRoute.post('/', createNews);
// Update news by ID (only accessible to admins)
newsRoute.put('/:id', updateNewsById);
// Delete news by ID  (only accessible to admins)
newsRoute.delete('/:id', deleteNewsById);

// Get all news categories with pagination support
newsRoute.get('/categories', getAllNewsCategories);
// Get news category information by ID
newsRoute.get('/categories/:categoryId', getNewsCategoryById);
// Add a news category  (only accessible to admins)
newsRoute.post('/category', addNewsCategory);
// Delete a news category by ID  (only accessible to admins)
newsRoute.delete('/category/:id', deleteNewsCategory);
// Update a news category by ID  (only accessible to admins)
newsRoute.put('/category/:id', updateNewsCategory);

export default newsRoute;
