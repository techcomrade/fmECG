const CommonModel = require("./CommonModel");

class RecordModel extends CommonModel{
    async getAllData(){
        return await this.executeQuery(`SELECT * FROM account`);
    }

   

}


module.exports = new RecordModel();