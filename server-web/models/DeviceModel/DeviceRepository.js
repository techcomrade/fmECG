const DeviceDTO = require("./DeviceDTO");
class DeviceModel {
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
    return await DeviceDTO.destroy({
      where: {
        id: id,
      },
    });
  }
  async checkById(id) {
    return await DeviceDTO.findOne({
      where: {
        id: id,
      }});
  }
  async updateById(device, id) {
    return await DeviceDTO.update({
      user_id: device.user_id,
      device_name: device.device_name,
      information: device.information,
      device_type: device.device_type,
      start_date: device.start_date,
      end_date: device.end_date,
      created_at: device.created_at,
      updated_at: device.updated_at
    }, {
      where: {
        id: id,
      }
    });
  }
}

module.exports = new DeviceModel();
