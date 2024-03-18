const CommonService = require("./CommonService");
const DeviceModel = require("../models/DeviceModel");

class DeviceService extends CommonService {
  async add(device) {
    return await DeviceModel.executeQuery(DeviceModel.add(device));
  }
  async deleteById(id) {
    return await DeviceModel.executeQuery(DeviceModel.deleteById(id));
  }
  async updateById(device) {
    return await DeviceModel.executeQuery(DeviceModel.updateById(device));
  }
  async getAllData() {
    return await DeviceModel.executeQuery(DeviceModel.getAllData());
  }
  async checkDevice(id) {
    const Device = DeviceModel.executeQuery(DeviceModel.checkDevice(id));
    return Device.length > 0;
  }
}

module.exports = new DeviceService();
