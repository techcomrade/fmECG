const RecordDTO = require("./RecordDTO");
class RecordModel {
  async getAllData() {
    return await RecordDTO.findAll();
  }
  async getRecordsByUserId(id){
    return await RecordDTO.findAll({where:{
      user_id:id
    }})
  }
  async deleteById(id,t){
    return await RecordDTO.destroy({
      where: {
        id:id
      }
    },
    t && {
      transaction: t,
    })
  }
}

module.exports = new RecordModel();
