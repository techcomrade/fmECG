const CommonModel = require("../../models/CommonModel");
const RecordDTO = require('./RecordDTO')
class RecordModel extends CommonModel{
    async getAllData(){
        return await RecordDTO.findAll();
    }
    

}


module.exports = new RecordModel();