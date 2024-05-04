const CommonService = require("./CommonService");
const RecordRepository = require("../models/RecordModel/RecordRepository");
const HeartRecRepository = require("../models/HeartRecModel/HeartRecRepository");
const BloodPressureRepository = require("../models/BloodPressureModel/BloodPressureRepository");
const { v4: uuidv4 } = require("uuid");
const Joi = require("joi")
class RecordService extends CommonService {
  async getAll() {
    return await RecordRepository.getAllData();
  }

  async add(record) {
    record.id = uuidv4();
    return await RecordRepository.add(record);
  }

  validateRecord(record) {
    const schema = Joi.object({
      user_id: Joi.string().required(),
      device_id: Joi.string().required(),
      device_type: Joi.number().integer().min(0).max(100).required(),
      start_time: Joi.number().integer().required(),
      end_time: Joi.number()
        .integer()
        .greater(Joi.ref("start_time"))
        .required(),
      data_rec_url: Joi.string().required(),
    });
    return schema.validate(record);
  }

  async getRecordById(id) {
    const recordById = await RecordRepository.getRecordById(id);
    return recordById;
  }

  async getRecordByUserId(id) {
    const recordByUser = await RecordRepository.getRecordByUserId(id);
    return recordByUser;
  }

  async getRecordByDeviceId(id) {
    const recordByDevice = await RecordRepository.getRecordByDeviceId(id);
    return recordByDevice;
  }

  async getRecordByStartTime(time) {
    const recordByStartTime = await RecordRepository.getRecordByStartTime(time);
    return recordByStartTime;
  }

  async getRecordByEndTime(time) {
    const recordByEndTime = await RecordRepository.getRecordByEndTime(time);
    return recordByEndTime;
  }

  async updateRecordById(record, id) {
    return await RecordRepository.updateById(record, id);
  }

  async deleteRecordById(id) {
    return await this.transaction(async (t) => {
      await HeartRecRepository.deleteByRecordId(id, t);
      await BloodPressureRepository.deleteByRecordId(id, t);
      await RecordRepository.deleteById(id, t);
    });
  }
}

module.exports = new RecordService();
