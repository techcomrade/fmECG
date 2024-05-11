const CommonService = require("./CommonService");
const RecordRepository = require("../models/RecordModel/RecordRepository");
const HeartRecRepository = require("../models/HeartRecModel/HeartRecRepository");
const BloodPressureRepository = require("../models/BloodPressureModel/BloodPressureRepository");
const UserRepository = require("../models/UserModel/UserRepository");
const DeviceRepository = require("../models/DeviceModel/DeviceRepository");
const FileService = require("./FileService");
const util = require("util");
const { v4: uuidv4 } = require("uuid");

const Joi = require("joi");
const { dummyArray } = require("../utils/arrayUtils");

class RecordService extends CommonService {
  async getAll() {
    const records = await RecordRepository.getAllData();
    const total = records.length;
    for (let i = 0; i < total; i++) {
      const userName = await UserRepository.getUserById(
        records[i].dataValues.user_id
      );
      const deviceName = await DeviceRepository.checkById(
        records[i].dataValues.device_id
      );
      records[i].dataValues = {
        ...records[i].dataValues,
        username: userName[0].username,
        device_name: deviceName.device_name,
      };
    }
    return records;
  }

  async add(record) {
    record.id = uuidv4();
    let path = './public/upload' + record.filename; 
    record.data_rec_url = path;
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
    if (recordById.length != 0) {
      const userName = await UserRepository.getUserById(
        recordById[0].dataValues.user_id
      );
      const deviceName = await DeviceRepository.checkById(
        recordById[0].dataValues.device_id
      );
      recordById[0].dataValues = {
        ...recordById[0].dataValues,
        username: userName[0].dataValues.username,
        device_name: deviceName.dataValues.device_name,
      };
      return recordById;
    }
    return false;
  }

  async getRecordByUserId(id) {
    return await RecordRepository.getRecordByUserId(id);
  }

  async getRecordByDeviceId(id) {
    return await RecordRepository.getRecordByDeviceId(id);
  }

  async getRecordByStartTime(time) {
    return await RecordRepository.getRecordByStartTime(time);
  }

  async getRecordByEndTime(time) {
    return await RecordRepository.getRecordByEndTime(time);
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

  getDataRecord(length) {
    const data = {
      x: dummyArray(length),
      y: dummyArray(length)
    };
    return data;
  }

  async uploadFileRecord(req, res, next){
   return FileService.uploadFile(req, res, next);

  }
}

module.exports = new RecordService();
