const BloodPressureDTO = require("./BloodPressureDTO");

class BloodPressureModel {
  async getAllData() {
    return await BloodPressureDTO.findAll();
  }
  async deleteById(id, t) {
    return await BloodPressureDTO.destroy(
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
    return await BloodPressureDTO.destroy({
      where: {
        rec_id: rec_id,
      }
    })
  }
  async add(rec) {
    return await BloodPressureDTO.create({
      id: rec.id,
      rec_id: rec.rec_id,
    });
  }
  async checkById(id) {
    return await BloodPressureDTO.findOne({
      where: {
        id: id,
      },
    });
  }
  async updateById(rec, id) {
    return await BloodPressureDTO.update(
      {
        rec_id: rec.rec_id,
      },
      {
        where: {
          id: id,
        },
      }
    );
  }
  async getRecordByRecordId(recordId) {
    return await BloodPressureDTO.findAll({
      where: {
        rec_id: recordId,
      },
    });
  }
}

module.exports = new BloodPressureModel();
