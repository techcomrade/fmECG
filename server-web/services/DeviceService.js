const CommonService = require("./CommonService");
const DeviceModel = require("../models/DeviceModel/DeviceRepository");
const UserRepository = require("../models/UserModel/UserRepository");
const { v4: uuidv4 } = require("uuid");
const Joi = require("joi");

class DeviceService extends CommonService {
  async add(device) {
    device.id = uuidv4();
    device.created_at = Date.now();
    return await DeviceModel.add(device);
  }

  async deleteById(id) {
    return await DeviceModel.deleteById(id);
  }

  async updateById(device, id) {
    device.updated_at = Date.now();
    return await DeviceModel.updateById(device, id);
  }

  async getAllData() {
    return await DeviceModel.getAllData();
  }

  async getDeviceById(id) {
    return await DeviceModel.checkById(id);
  }

  async getDeviceByUserId(userId) {
    return await DeviceModel.checkByUserId(userId);
  }

  async getDeviceByStartDateInterval(startDate, endDate) {
    return await DeviceModel.getDeviceByStartDateInterval(startDate, endDate);
  }

  async getDeviceByEndDateInterval(startDate, endDate) {
    return await DeviceModel.getDeviceByEndDateInterval(startDate, endDate);
  }

  ValidateDevice(device, checkId) {
    const schema = Joi.object({
      id: checkId ? Joi.string().required() : Joi.string().allow(" "),
      user_id: Joi.string().required(),
      device_name: Joi.string().required(),
      information: Joi.string(),
      device_type: Joi.number().integer().min(0).max(100).required(),
      start_date: Joi.number().integer().required(),
      end_date: Joi.number()
        .integer()
        .greater(Joi.ref("start_date"))
        .required(),
      dummy_data: Joi.boolean(),
    });
    return schema.validate(device);
  }

  async getDeviceByUsername(username) {
    const user = await UserRepository.getUserByName(username);
    if (user) return await DeviceModel.checkByUserId(user.dataValues.id);
    return false;
  }
  
  async getDeviceByDeviceName(device_name) {
    return DeviceModel.checkByDeviceName(device_name);
  }
}

module.exports = new DeviceService();
