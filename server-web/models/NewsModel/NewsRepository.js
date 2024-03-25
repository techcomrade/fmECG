const CommonModel = require("../../models/CommonModel");
const NewsDTO = require('./NewsDTO')
class NewsModel extends CommonModel{
    async getAllData(){
        return await NewsDTO.findAll();
    }

}


module.exports = new NewsModel();