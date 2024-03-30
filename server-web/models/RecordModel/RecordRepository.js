const RecordDTO = require("./RecordDTO");
class RecordRepository {
  async getAllData() {
    return await RecordDTO.findAll();
  }
<<<<<<< HEAD

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
=======
  async getRecordsByUserId(id){
    return await RecordDTO.findAll({where:{
      user_id:id
    }})
  }
  async deleteById(id,t){
    return await RecordDTO.destroy({
      where: {
        id:id
      }
    },
    t && {
      transaction: t,
    })
>>>>>>> d362c074fbca3e75b96e06aff1f2125268797cdd
  }
}

module.exports = new RecordRepository();
