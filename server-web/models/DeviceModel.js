const CommonModel = require("./CommonModel");

class DeviceModel extends CommonModel{
    async getAllData(){
        return await this.executeQuery(`SELECT * FROM account`);
    }

   

}


module.exports = new DeviceModel();