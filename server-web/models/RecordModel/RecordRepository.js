const RecordDTO = require("./RecordDTO");
class RecordRepository {
  async getAllData() {
    return await RecordDTO.findAll();
  }

  async getRecordById(id) {
    return await RecordDTO.findAll({
      where: {
        id: id,
      },
    });
  }

  async getRecordsByDeviceId(id) {
    return await RecordDTO.findAll({
      where: {
        device_id: id,
      },
    });
  }

  async add(record, t) {
    return await RecordDTO.create(
      {
        id: record.id,
        user_id: record.user_id,
        device_id: record.device_id,
        device_type: record.device_type,
        start_time: record.start_time,
        end_time: record.end_time,
        data_rec_url: record.data_rec_url,
      },
      t && {
        transaction: t,
      }
    );
  }

  async updateById(record, id, t) {
    return await RecordDTO.update(
      {
        user_id: record.user_id,
        device_id: record.device_id,
        device_type: record.device_type,
        start_time: record.start_time,
        end_time: record.end_time,
        data_rec_url: record.data_rec_url,
        updated_at: record.updated_at,
      },
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

  async deleteById(id, t) {
    return await RecordDTO.destroy(
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
}
module.exports = new RecordRepository();
