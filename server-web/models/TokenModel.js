const CommonModel = require("./CommonModel");

class TokenModel extends CommonModel{
    async getAllData(){
        return await this.executeQuery(`SELECT * FROM account`);
    }

   

}


module.exports = new TokenModel();