const CommonModel = require("../../models/CommonModel");
const DeviceDTO = require('./DeviceDTO')
class DeviceModel extends CommonModel {
  async getAllData() {
    return await DeviceDTO.findAll();
  }
  async add(device) {
    return await DeviceDTO.create({
      id: device.id,
      user_id: device.user_id,
      device_name: device.device_name,
      information: device.information ?? "",
      device_type: device.device_type,
      start_date: device.start_date,
      end_date: device.end_date,
    });
  }
  async deleteById(id) {
    return await DeviceDTO.destroy({where:{
      id: id
    }});
  }
  
}

module.exports = new DeviceModel();
