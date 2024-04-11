const HeartRecDTO = require("./HeartRecDTO");
class HeartRecModel {
  async getAllData() {
    return await HeartRecDTO.findAll();
  }

  async add(heart_rec, t) {
    return await HeartRecDTO.create(
      {
        id: heart_rec.id,
      },
      t && {
        transaction: t,
      }
    );
  }
  
  async getHeartRecByRecordId(record_id) {
    return await HeartRecDTO.findAll({
      where: {
        rec_id: record_id
      }
    });
  }
  async updateHeartRecByDeviceId(device_id) {
    where: {
      id: device_id
    }
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
