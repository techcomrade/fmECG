const SoundRecDTO = require("./SoundRecDTO");
class SoundRecModel {
  async getAllData() {
    return await SoundRecDTO.findAll();
  }

  async add(sound_rec, t) {
    return await SoundRecDTO.create(
      {
        id: sound_rec.id,
      },
      t && {
        transaction: t,
      }
    );
  }

  async getSoundRecByRecordId(record_id) {
    return await SoundRecDTO.findAll({
      where: {
        rec_id: record_id,
      },
    });
  }
  async updateSoundRecByDeviceId(device_id) {
    where: {
      id: device_id;
    }
  }
  async deleteById(id, t) {
    return await SoundRecDTO.destroy(
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
    return await SoundRecDTO.destroy({
      where: {
        rec_id: rec_id,
      },
    });
  }
}

module.exports = new SoundRecModel();
