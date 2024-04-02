const CommonService = require("./CommonService");
const DeviceModel = require("../models/DeviceModel/DeviceRepository");
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
  async checkDevice(id) {
    const Device = await DeviceModel.checkById(id);
    if(Device) return true;
    return false;
  }
  async getDeviceByUserId(userId) {
    return await DeviceModel.getDeviceByUserId(userId);
  }
  ValidateDevice(device) {
    const schema = Joi.object({
      user_id: Joi.string().required(),
      device_name: Joi.string().required(),
      information: Joi.string(),
      device_type: Joi.number()
                      .integer()
                      .min(0)
                      .max(100)
                      .required(),
      start_date: Joi.number()
                      .integer()
                      .required(),
      end_date: Joi.number()
                   .integer()
                   .greater(Joi.ref('start_date'))
                   .required()      
    });
    return schema.validate(device);
  }
}

module.exports = new DeviceService();
