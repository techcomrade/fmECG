const CommonModel = require("./CommonModel");

class NewsModel extends CommonModel{
    async getAllData(){
        return await this.executeQuery(`SELECT * FROM account`);
    }

}


module.exports = new NewsModel();