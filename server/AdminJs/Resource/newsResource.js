const { News, NewsCategory } = require('../../Models/newsModel.js');
const {Components} = require('../Component/CustomComponent.js')


const NewsResource = {
    resource: News,
    options: {
      parent: {
        // icon: 'newspaper',
      },
      properties: {
        content : {
          // isVisible : {edit: true},
          components: {
            show: Components.ShowNewsContents,
            edit: Components.NewsContentInput,
            list: Components.ListNewsContent,
          },
          // props: {
          //   onChange: 'onChange',
          // },
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
