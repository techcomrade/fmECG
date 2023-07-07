const { News, NewsCategory } = require('../../Models/newsModel.js');
  const NewsCategoryResource = {
    resource: NewsCategory,
    options: {
      parent: {
        // icon: 'Category',
      },
      properties: {
        category_id: {
          position: 1,
        },
        category_name: {
          position: 2,
          isTitle: true,
        },
        category_description: {
          position: 3,
        }
      }
      
    },
  };

  module.exports = NewsCategoryResource
