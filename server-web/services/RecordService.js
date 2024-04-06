const CommonService = require("./CommonService");
const RecordRepository = require("../models/RecordModel/RecordRepository");
const HeartRecRepository = require("../models/HeartRecModel/HeartRecRepository");
const BloodPressureRepository = require("../models/BloodPressureModel/BloodPressureRepository");
const { v4: uuidv4 } = require("uuid");
class RecordService extends CommonService {
  async getAll() {
    return await RecordRepository.getAllData();
  }

  async add(record) {
    record.id = uuidv4();
    return await RecordRepository.add(record);
  }

  async getRecordById(id) {
    const record = await RecordRepository.getRecordById(id);
    if (record.length === 0) return false;
    return record;
  }

  async getRecordByDeviceId(id) {
    const recordByDevice = await RecordRepository.getRecordsByDeviceId(id);
    if (recordByDevice.length === 0) return false;
    return recordByDevice;
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
