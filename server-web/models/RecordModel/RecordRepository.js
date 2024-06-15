const { Sequelize, QueryTypes } = require("sequelize");
const RecordDTO = require("./RecordDTO");
const sequelize = require("../../config/sequelize");
class RecordRepository {
  async getAllData() {
    return await sequelize.query(
      "SELECT re.*, de.device_name, u.username FROM fmecg.records as re LEFT JOIN fmecg.devices as de ON re.device_id = de.id LEFT JOIN fmecg.users AS u ON re.user_id = u.id",
      {
        type: QueryTypes.SELECT,
      }
    );
  }

  async getRecordById(id) {
    return await RecordDTO.findAll({
      where: {
        id: id,
      },
    });
  }

  async getRecordByDeviceId(id) {
    return await RecordDTO.findAll({
      where: {
        device_id: id,
      },
    });
  }

  async getRecordByUserId(id) {
    return await sequelize.query(
      "SELECT re.*, de.device_name, u.username FROM fmecg.records as re LEFT JOIN fmecg.devices as de ON re.user_id = de.user_id LEFT JOIN fmecg.users AS u ON u.id = re.user_id  WHERE re.user_id = :user",
      {
        replacements: { user: id },
        type: QueryTypes.SELECT,
      }
    );
  }

  async getRecordByStartTime(time) {
    return await RecordDTO.findAll({
      where: {
        start_time: {
          [Sequelize.Op.between]: [
            parseInt(time) - 86400000,
            parseInt(time) + 86400000,
          ],
        },
      },
    });
  }

  async getRecordByStartTimeInterval(startTime, endTime) {
    return await RecordDTO.findAll({
      where: {
        start_time: {
          [Sequelize.Op.between]: [startTime, endTime],
        },
      },
    });
  }

  async getRecordByEndTime(time) {
    return await RecordDTO.findAll({
      where: {
        end_time: {
          [Sequelize.Op.between]: [
            parseInt(time) - 86400000,
            parseInt(time) + 86400000,
          ],
        },
      },
    });
  }

  async getRecordByEndTimeInterval(startTime, endTime) {
    return await RecordDTO.findAll({
      where: {
        end_time: {
          [Sequelize.Op.between]: [startTime, endTime],
        },
      },
    });
  }

  async add(record, t) {
    return await RecordDTO.create(
      {
        id: record.id,
        user_id: record.user_id,
        device_id: record.device_id,
        record_type: record.record_type,
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
        record_type: record.record_type,
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

  async count() {
    return await RecordDTO.count();
  }

  async getRecordByDoctorId(doctor_id) {
    return await sequelize.query(
      "SELECT re.*, de.device_name, u.username FROM fmecg.records as re LEFT JOIN fmecg.patient_doctor_assignment pda ON re.user_id = pda.patient_id LEFT JOIN fmecg.devices as de ON re.user_id = de.user_id LEFT JOIN fmecg.users AS u ON u.id = re.user_id  WHERE pda.doctor_id = :doctor",
      {
        replacements: { doctor: doctor_id },
        type: QueryTypes.SELECT,
      }
    );
  }
}
module.exports = new RecordRepository();
