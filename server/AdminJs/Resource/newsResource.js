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
      action: {
        // list: {
        //   before : async = (request, contenxt) => {
        //     // request.payload.content = "...";
        //     return request;
        //   },
        // }
      }
    },
  };
  

  module.exports = NewsResource
