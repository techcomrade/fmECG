const CommonService = require("../services/CommonService");
const RecordModel = require("../models/RecordModel/RecordRepository");
const { v4: uuidv4 } = require("uuid");
const Joi = require("joi");

class RecordService extends CommonService {
  async getRecordById(id) {
    return await RecordModel.checkById(id);
  }
}

module.exports = new RecordService();
