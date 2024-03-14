const CommonModel = require("./CommonModel");

class NewsCategoryModel extends CommonModel{
    async getAllData(){
        return await this.executeQuery(`SELECT * FROM account`);
    }

   

}


module.exports = new NewsCategoryModel();