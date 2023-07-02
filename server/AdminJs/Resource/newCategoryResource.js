const { News, NewsCategory } = require('../../Models/newsModel.js');
  
  const NewsCategoryResource = {
    resource: NewsCategory,
    options: {
      parent: {
        // icon: 'Category',
      },
    },
  };

  module.exports = NewsCategoryResource
