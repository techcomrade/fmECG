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
  async deleteById(id) {
    return await HeartRecDTO.destroy({
      where: {
        id: id,
      },
    });
  }
  async getHeartRecByDeviceId(device_id) {
    return await HeartRecDTO.fineOne({
      where: {
        id: device_id
      }
    });
  }
  async updateHeartRecByDeviceId(device_id) {
    where: {
      id: device_id
    }
  }
}

module.exports = new HeartRecModel();
