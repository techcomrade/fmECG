const CommonModel = require("../../models/CommonModel");
const HeartRecDTO = require('./HeartRecDTO');
class HeartRecModel extends CommonModel{
    async getAllData(){
        return await HeartRecDTO.findAll();
    }
   
}


module.exports = new HeartRecModel();