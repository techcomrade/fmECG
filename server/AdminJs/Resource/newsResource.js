const { News, NewsCategory } = require('../../Models/newsModel.js');
const {Components} = require('../Component/CustomComponent.js')


const NewsResource = {
    resource: News,
    options: {
      parent: {
        // icon: 'newspaper',
      },
    
      properties: {
        news_id: {
          position: 1,
        },
        category_id: {
          position: 2,
        },
        title: {
          position: 3,
        },
        url: {
          position: 4,
        }, 
        author: {
          position: 5,
        },
        url: {
          position: 6,
        },
        content : {
          position: 7,
          // isVisible : {edit: true},
          components: {
            show: Components.ShowNewsContents,
            edit: Components.NewsContentInput,
            list: Components.ListNewsContent,
          },
          props: {
            onChange: 'onChange',
          },
        },
      },

      actions: {
        new : {
          // after: async (request, response, context) => {
          //   const news = response.record.toJSON();
          //   const newsId = news._id.toString();
          //   const newsUrl = `/news/${newsId}`;
            
          //   // Update the news URL
          //   await News.findByIdAndUpdate(news._id, { url: newsUrl });
          //   console.log('new hook ')
          //   return response;
          // },

          before: async (request, context) => {
            try {
              console.log('before ok');
            } catch (err) {
              console.log(err);
            }
  
            return request;
          },

          after: async (request, context) => {
            try {
              console.log('after ok');
            } catch (err) {
              console.log(err);
            }
  
            return request;
          },
        },
      },
    },
  };
  

  module.exports = NewsResource
