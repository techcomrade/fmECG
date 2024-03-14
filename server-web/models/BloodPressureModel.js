const CommonModel = require("./CommonModel");

class BloodPressureModel extends CommonModel{
    async getAllData(){
        return await this.executeQuery(`SELECT * FROM account`);
    }

   

}


module.exports = new BloodPressureModel();