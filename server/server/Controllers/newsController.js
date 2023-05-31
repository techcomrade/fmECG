const { News, NewsCategory } = require('../Models/newsModel');
const { isLogin } = require('./authController');

// Get news by id
exports.getNewsById = async (req, res) => {
  try {
    const { newsId } = req.params;

    // Find the news by ID
    const news = await News.findByPk(newsId);

    if (!news) {
      return res.status(404).json({ status: 'error', msg: 'News not found' });
    }

    res.status(200).json({ status: 'success', data: news });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', msg: 'An error occurred while retrieving the news' });
  }
};

// Get all news, support pagination and limit
exports.getAllNews = async (req, res) => {
  try {
    const page = req.query.page || 1; // Current page number
    const limit = req.query.limit || 10; // Number of news per page

    // Calculate the offset based on the page and limit
    const offset = (page - 1) * limit;

    // Query the news with pagination
    const news = await News.findAndCountAll({
      offset,
      limit,
    });

    // Count all available news
    const count = news.count;

    res.status(200).json({ status: 'success', count, data: news.rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', msg: 'An error occurred while retrieving the news' });
  }
};

// Create news, only admin can use this api
exports.createNews = async (req, res) => {
  try {
    // Check if the user is authenticated and has admin rights
    const isLoginResponse = await isLogin(req, res);
    if (!isLoginResponse.success || isLoginResponse.user.role !== 2) {
      return res.status(401).json({ status: 'error', msg: 'Unauthorized' });
    }

    const { title, content, category_id, author, url } = req.body;

    // Check if the category exists
    const category = await NewsCategory.findByPk(category_id);
    if (!category) {
      return res.status(400).json({ status: 'error', msg: 'Invalid category_id' });
    }

    // Create a new news record
    const newNews = await News.create({
      title,
      content,
      category_id,
      author,
      url,
    });

    res.status(201).json({ status: 'success', data: newNews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', msg: 'An error occurred while creating the news' });
  }
};

// Update news, only admin can use this api
exports.updateNewsById = async (req, res) => {
  try {
    // Check if the user is authenticated and has admin rights
    const isLoginResponse = await isLogin(req, res);
    if (!isLoginResponse.success || isLoginResponse.user.role !== 2) {
      return res.status(401).json({ status: 'error', msg: 'Unauthorized' });
    }

    const { id } = req.params; // Get the news ID from the URL parameter
    const { title, content, author, url } = req.body; // Get the updated news data from the request body

    // Find the news by ID
    const news = await News.findByPk(id);
    if (!news) {
      return res.status(404).json({ status: 'error', msg: 'News not found' });
    }

    // Update the news data
    news.title = title;
    news.content = content;
    news.author = author;
    news.url = url;

    // Save the updated news
    await news.save();

    res.status(200).json({ status: 'success', msg: 'News updated successfully', data: news });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', msg: 'An error occurred while updating the news' });
  }
};

// Delete news, only admin can use this api
exports.deleteNewsById = async (req, res) => {
  try {
    // Check if the user is authenticated and has admin rights
    const isLoginResponse = await isLogin(req, res);
    if (!isLoginResponse.success || isLoginResponse.user.role !== 2) {
      return res.status(401).json({ status: 'error', msg: 'Unauthorized' });
    }

    const { id } = req.params; // Get the news ID from the URL parameter

    // Find the news by ID
    const news = await News.findByPk(id);
    if (!news) {
      return res.status(404).json({ status: 'error', msg: 'News not found' });
    }

    // Delete the news
    await news.destroy();

    res.status(200).json({ status: 'success', msg: 'News deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', msg: 'An error occurred while deleting the news' });
  }
};

// Get all news categories with pagination support
exports.getAllNewsCategories = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Get the page and limit parameters from the query string

    // Calculate the offset based on the page and limit values
    const offset = (page - 1) * limit;

    // Query the news categories with pagination
    const categories = await NewsCategory.findAndCountAll({
      limit: +limit, // Convert limit to a number
      offset,
    });

    res.status(200).json({
      status: 'success',
      data: categories.rows,
      count: categories.count,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: 'error', msg: 'An error occurred while retrieving the news categories' });
  }
};

// Get news category by id
exports.getNewsCategoryById = async (req, res) => {
  try {
    const { categoryId } = req.params;

    // Find the news category by ID
    const newsCategory = await NewsCategory.findByPk(categoryId);

    if (!newsCategory) {
      return res.status(404).json({ status: 'error', msg: 'News category not found' });
    }

    res.status(200).json({ status: 'success', data: newsCategory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', msg: 'An error occurred while retrieving the news category' });
  }
};

// Add news category, only admin can use this api
exports.addNewsCategory = async (req, res) => {
  try {
    // Check if the user is authenticated and has admin rights
    const isLoginResponse = await isLogin(req, res);
    if (!isLoginResponse.success || isLoginResponse.user.role !== 2) {
      return res.status(401).json({ status: 'error', msg: 'Unauthorized' });
    }

    // Extract the category data from the request body
    const { name, description } = req.body;

    // Create a new news category
    const newCategory = await NewsCategory.create({ name, description });

    res.status(201).json({ status: 'success', data: newCategory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', msg: 'An error occurred while adding the news category' });
  }
};

// Delete news category, only admin can use this api
exports.deleteNewsCategory = async (req, res) => {
  try {
    // Check if the user is authenticated and has admin rights
    const isLoginResponse = await isLogin(req, res);
    if (!isLoginResponse.success || isLoginResponse.user.role !== 2) {
      return res.status(401).json({ status: 'error', msg: 'Unauthorized' });
    }

    // Extract the category ID from the request parameters
    const categoryId = req.params.id;

    // Find the news category by ID
    const category = await NewsCategory.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({ status: 'error', msg: 'News category not found' });
    }

    // Delete the news category
    await category.destroy();

    res.status(200).json({ status: 'success', msg: 'News category deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', msg: 'An error occurred while deleting the news category' });
  }
};

// Update news category, only admin can use this api
exports.updateNewsCategory = async (req, res) => {
  try {
    // Check if the user is authenticated and has admin rights
    const isLoginResponse = await isLogin(req, res);
    if (!isLoginResponse.success || isLoginResponse.user.role !== 2) {
      return res.status(401).json({ status: 'error', msg: 'Unauthorized' });
    }

    // Extract the category ID from the request parameters
    const categoryId = req.params.id;

    // Find the news category by ID
    const category = await NewsCategory.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({ status: 'error', msg: 'News category not found' });
    }

    // Update the news category with the new data
    category.category_name = req.body.category_name;
    category.category_description = req.body.category_description;
    await category.save();

    res.status(200).json({ status: 'success', msg: 'News category updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', msg: 'An error occurred while updating the news category' });
  }
};
