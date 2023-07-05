const { News, NewsCategory } = require('../Models/newsModel');
const marked = require('marked');
const { isLogin } = require('./authController');

// Get news by id
// exports.getNewsById = async (req, res) => {
//   try {
//     const { newsId } = req.params;

//     // Find the news by ID
//     const news = await News.findByPk(newsId);

//     if (!news) {
//       return res.status(404).json({ status: 'error', msg: 'News not found' });
//     }

//     res.status(200).json({ status: 'success', data: news });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ status: 'error', msg: 'An error occurred while retrieving the news' });
//   }
// };

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



