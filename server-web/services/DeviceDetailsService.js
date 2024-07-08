const CommonService = require("./CommonService");
const DeviceDetailsRepository = require("../models/DeviceDetailsModel/DeviceDetailsRepository");

const { v4: uuidv4 } = require("uuid");
const Joi = require("joi");

class DeviceDetailsService extends CommonService {
  async getByDeviceId(deviceId) {
    return await DeviceDetailsRepository.getByDeviceId(deviceId);
  }

  async getByDeviceIdAndFreq(deviceId) {
    return await DeviceDetailsRepository.getByDeviceIdAndFreq(deviceId);
  }

  async getByDeviceIdAndConnection(deviceId) {
    return await DeviceDetailsRepository.getByDeviceIdAndConnection(deviceId);
  }

  async getByDeviceIdAndStorage(deviceId) {
    return await DeviceDetailsRepository.getByDeviceIdAndStorage(deviceId);
  }

  async updateById(deviceFreq, id) {
    deviceFreq.updated_at = Date.now();
    return DeviceDetailsRepository.updateById(deviceFreq, id);
  }

  async deleteById(id) {
    return DeviceDetailsRepository.deleteById(id);
  }

  async add(deviceFreq) {
    deviceFreq.id = uuidv4();
    deviceFreq.created_at = Date.now();
    return DeviceDetailsRepository.add(deviceFreq);
  }

  async getById(id) {
    return DeviceDetailsRepository.checkById(id);
  }

  validateDeviceFreq(deviceFreq, checkId) {
    const schema = Joi.object({
      id: checkId ? Joi.string().required() : Joi.string().allow(" "),
      device_id: Joi.string().required(),
      detail_name: Joi.string().required(),
      information: Joi.string(),
      value: Joi.number().min(0).required(),
      dummy_data: Joi.boolean(),
    });
    return schema.validate(deviceFreq);
  }
}

module.exports = new DeviceDetailsService();
