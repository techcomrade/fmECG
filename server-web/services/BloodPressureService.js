const CommonService = require("../services/CommonService");
const BloodPressureModel = require("../models/BloodPressureModel/BloodPressureRepository");
const { v4: uuidv4 } = require("uuid");
const Joi = require("joi");

class BloodPressureService extends CommonService {
  async add(rec) {
    rec.id = uuidv4();
    return await BloodPressureModel.add(rec);
  }
  async deleteById(id) {
    return await BloodPressureModel.deleteById(id);
  }
  async updateById(rec, id) {
    return await BloodPressureModel.updateById(rec, id);
  }
  async getAllData() {
    return await BloodPressureModel.getAllData();
  }
  async getRecordById(id) {
    return await BloodPressureModel.checkById(id);
  }
  ValidateBloodPressureRec(rec) {
    const schema = Joi.object({
      rec_id: Joi.string().required(),
    });
    return schema.validate(rec);
  }
}

module.exports = new BloodPressureService();
