const { News, NewsCategory } = require('../Models/newsModel');
const marked = require('marked');
const { isLogin } = require('./authController');


exports.getNewsById = async (req, res) => {
  try {
    const { newsId } = req.params;

    // Find the news by ID
    const news = await News.findByPk(newsId);

    if (!news) {
      return res.status(404).json({ status: 'error', msg: 'News not found' });
    }

    // Generate HTML from the content property
    const htmlContent = `<html><head>
    <title>${news.title}</title>
  </head><body>${news.content}</body></html>`;

    // Set the response content type to HTML
    res.setHeader('Content-Type', 'text/html');

    // Send the HTML content as the response
    res.send(htmlContent);
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

    const news = await News.findAndCountAll({
      attributes: { exclude: ['content'] }, // Exclude the 'content' field
      offset,
      limit,
      include: [
        {
          model: NewsCategory,
          attributes: ['category_name'], // Include the 'category_name' field from NewsCategory
        },
      ],
      raw: true, // Fetch raw data without wrapping it in related models
    });

    // Count all available news
    const count = news.count;

    // Map the response structure to change "news_category.category_name" to "category_name"
    const modifiedNews = news.rows.map((newsItem) => {
      return {
        ...newsItem,
        category_name: newsItem['news_category.category_name'],
        // Exclude the old key "news_category.category_name"
        ['news_category.category_name']: undefined,
      };
    });

    res.status(200).json({ status: 'success', count, data: modifiedNews });

  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', msg: 'An error occurred while retrieving the news' });
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


exports.getNewsByCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const page = req.query.page || 1; // Current page number
    const limit = req.query.limit || 10; // Number of news per page

    // Calculate the offset based on the page and limit
    const offset = (page - 1) * limit;

    // Query the news by category_id with pagination
    const news = await News.findAndCountAll({
      attributes: { exclude: ['content'] }, // Exclude the 'content' field
      where: { category_id: categoryId },
      offset,
      limit,
      include: [
        {
          model: NewsCategory,
          attributes: ['category_name'], // Include the 'category_name' field from NewsCategory
        },
      ],
      raw: true, // Fetch raw data without wrapping it in related models
    });

    // Count all available news in the category
    const count = news.count;

    // Map the response structure to change "news_category.category_name" to "category_name"
    const modifiedNews = news.rows.map((newsItem) => {
      return {
        ...newsItem,
        category_name: newsItem['news_category.category_name'],
        // Exclude the old key "news_category.category_name"
        ['news_category.category_name']: undefined,
      };
    });

    res.status(200).json({ status: 'success', count, data: modifiedNews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', msg: 'An error occurred while retrieving the news' });
  }
};

