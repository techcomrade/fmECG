const BloodPressureDTO = require("./BloodPressureDTO");

class BloodPressureModel {
  async getAllData() {
    return await BloodPressureDTO.findAll();
  }
  async deleteById(id,t){
    return await BloodPressureDTO.destroy({
      where:{
        id:id
      }
    },
    t && {
      transaction: t,
    })
  }
}

module.exports = new BloodPressureModel();
