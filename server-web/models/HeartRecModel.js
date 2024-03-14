const CommonModel = require("./CommonModel");

class HeartRecModel extends CommonModel{
    async getAllData(){
        return await this.executeQuery(`SELECT * FROM account`);
    }

   

}


module.exports = new HeartRecModel();