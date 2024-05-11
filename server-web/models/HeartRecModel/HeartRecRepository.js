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
<<<<<<< HEAD
  
  async getHeartRecByDeviceId(device_id) {
    return await HeartRecDTO.findOne({
=======

  async getHeartRecByRecordId(record_id) {
    return await HeartRecDTO.findAll({
>>>>>>> 6931ea258e19f2a2ab4f15c282c86156ec91e05b
      where: {
        rec_id: record_id,
      },
    });
  }
  
  async updateHeartRecByDeviceId(device_id) {
<<<<<<< HEAD
    return await HeartRecDTO.update(
      { /* update fields go here */ },
      {
        where: {
          id: device_id
        }
      }
    );
  }

  async deleteById(id, t) {
    return await HeartRecDTO.destroy(
      {
        where: {
          id: id
        }
      },
      t && {
        transaction: t,
      }
    );
=======
    where: {
      id: device_id;
    }
  }
  async deleteById(id, t) {
    return await HeartRecDTO.destroy(
      {
        where: {
          id: id,
        },
      },
      t && {
        transaction: t,
      }
    );
  }
  async deleteByRecordId(rec_id) {
    return await HeartRecDTO.destroy({
      where: {
        rec_id: rec_id,
      },
    });
>>>>>>> 6931ea258e19f2a2ab4f15c282c86156ec91e05b
  }
}

module.exports = new HeartRecModel();