const { News, NewsCategory } = require('../../Models/newsModel.js');
const {Components} = require('../Component/CustomComponent.js')
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../config.env') })

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
          isVisible: { edit: false, filter: false, show: true, list:true },
        }, 
        author: {
          position: 5,
        },
        image: {
          position: 6,
          // components: {
          //   show: Components.ShowNewsContents,
          //   edit: Components.UploadNewsImage,
          //   list: Components.ListNewsContent,
          // },
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

          before: async (request, context) => {
            request.payload.url = ''
            return request;
          },

          after: async (request, response, context) => {
            const news = context.record.params;
            const baseUrl = process.env.NODE_ENV === 'production' ? process.env.PROD_BASE_URL : process.env.DEV_BASE_URL;
            const newsId = news.news_id
            const newsUrl = `${baseUrl}/news/${newsId}`;
            console.log(newsUrl);
            await News.update({ url: newsUrl }, { where: { news_id: newsId } });  
            return request;
          },
        },
      },
    },
  };
  

  module.exports = NewsResource
