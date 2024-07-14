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

  async add(device_detail, checked) {
    if(!checked) {
     
      return DeviceDetailsRepository.add(deviceFreq);
    }
    let device_freq = device_detail.frequency;
    device_freq.detail_type = 1;
    let device_conn = device_detail.connection;
    device_conn.detail_type = 2;
    let device_storage = device_detail.storage;
    device_storage.detail_type = 3;
    
    return await this.transaction(async (t) => {
      await DeviceDetailsRepository.add(device_freq, t);
      await DeviceDetailsRepository.add(device_conn, t);
      await DeviceDetailsRepository.add(device_storage, t);
    })
    
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
