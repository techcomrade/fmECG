const CommonService = require("./CommonService");
const DeviceModel = require("../models/DeviceModel");
const { v4: uuidv4 } = require("uuid");

class DeviceService extends CommonService {
  async add(device) {
    device.id = uuidv4();
    device.created_at = Date.now();
    //device.update_at = device.created_at;
    console.log(device);
    console.log(typeof device.created_at);
    console.log(device.created_at);
    return await DeviceModel.executeQuery(DeviceModel.add(device))
  }
  async deleteById(id) {
    return await DeviceModel.executeQuery(DeviceModel.deleteById(id));
  }
  async updateById(device, id) {
    device.updated_at = Date.now();
    return await DeviceModel.executeQuery(DeviceModel.updateById(device, id));
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
