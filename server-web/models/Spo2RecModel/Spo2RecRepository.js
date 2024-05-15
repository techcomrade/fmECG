const Spo2RecDTO = require("./Spo2RecDTO");
class Spo2RecModel {
  async getAllData() {
    return await Spo2RecDTO.findAll();
  }

  async add(spo2_rec, t) {
    return await Spo2RecDTO.create(
      {
        id: spo2_rec.id,
      },
      t && {
        transaction: t,
      }
    );
  }

  async getSpo2RecByRecordId(record_id) {
    return await Spo2RecDTO.findAll({
      where: {
        rec_id: record_id,
      },
    });
  }
  async updateSpo2RecByDeviceId(device_id) {
    where: {
      id: device_id;
    }
  }
  async deleteById(id, t) {
    return await Spo2RecDTO.destroy(
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
    return await Spo2RecDTO.destroy({
      where: {
        rec_id: rec_id,
      },
    });
  }
}

module.exports = new Spo2RecModel();
