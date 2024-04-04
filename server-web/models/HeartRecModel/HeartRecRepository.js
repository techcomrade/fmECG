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
  async getHeartRecByEmail(id) {
    return await HeartRecDTO.fineOne({
      where: {
        id: id,
      },
    });
  }
}

module.exports = new HeartRecModel();
