const BloodPressureDTO = require('./BloodPressureDTO')
const CommonModel = require("./../CommonModel");

class BloodPressureModel extends CommonModel {
    async getAllData(){
        return await BloodPressureDTO.findAll();
    }
    
}


module.exports = new BloodPressureModel();