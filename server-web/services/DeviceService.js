const CommonService = require("./CommonService");
const DeviceModel = require("../models/DeviceModel/DeviceRepository");
const DeviceDetailsService = require("../services/DeviceDetailsService");
const UserRepository = require("../models/UserModel/UserRepository");
const { v4: uuidv4 } = require("uuid");
const Joi = require("joi");

class DeviceService extends CommonService {
  async add(device) {
    device.id = uuidv4();
    device.created_at = Date.now();
    let device_detail = {
      frequency: {},
      storage: {},
      connection: {},
    };
    device_detail.frequency = device.frequency[0];
    device_detail.storage = device.storage[0];
    device_detail.connection = device.connection[0];

    return await this.transaction(async (t) => {
      await DeviceModel.add(device, t);
      await DeviceDetailsService.add(device_detail, true);
    });
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
    const frequency_validate = Joi.object({
      detail_name: Joi.string().required(),
      value: Joi.number().integer().required(),
      information: Joi.string()
    });
    const storage_validate = Joi.object({
      detail_name: Joi.string().required(),
      value: Joi.number().integer().required(),
      information: Joi.string(),
    });
    const connection_validate = Joi.object({
      detail_name: Joi.string().required(),
      value: Joi.number().integer().required(),
      information: Joi.string(),
    })
    const schema = Joi.object({
      id: checkId ? Joi.string().required() : Joi.string().allow(" "),
      user_id: Joi.string().required(),
      device_name: Joi.string().required(),
      information: Joi.string(),
      device_type: Joi.number().integer().min(0).max(100).required(),
      frequency: Joi.array().ordered(frequency_validate).items(Joi.any()),
      storage: Joi.array().ordered(storage_validate).items(Joi.any()),
      connection: Joi.array().ordered(connection_validate).items(Joi.any()),
      status: Joi.number(),
      start_date: Joi.number().required(),
      dummy_data: Joi.number(),
      created_at: Joi.number(),
      updated_at: Joi.number(),
      username: Joi.string(),
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
  async getDeviceByDoctorId(id) {
    return await DeviceModel.getByDoctorId(id);
  }
  async getDevicesByUserId(id) {
    return await DeviceModel.getDevicesByUserId(id);
  }
}

module.exports = new DeviceService();
