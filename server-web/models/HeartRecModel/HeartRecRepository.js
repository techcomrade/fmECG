const HeartRecDTO = require("./HeartRecDTO");
class HeartRecModel {
  async getAllData() {
    return await HeartRecDTO.findAll();
  }
  async deleteById(id,t){
    return await HeartRecDTO.destroy({
      where:{
        id:id
      }
    },
    t && {
      transaction: t,
    })
  }
}

module.exports = new HeartRecModel();
