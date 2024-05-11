const { convertDateNormal, convertTimeToString } = require("../../utils/processTime");
const DeviceDTO = require("./DeviceDTO");
class DeviceModel {
  async getAllData() {
    const devices =  await DeviceDTO.findAll({
      attributes: {
        exclude: ['created_at', 'updated_at']
      }    
    });
    return devices;
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
  async deleteById(id,t) {
    return await DeviceDTO.destroy({
      where: {
        id: id,
      },
    },
    t && {
      transaction: t,
    });
  }
  async checkById(id) {
    return await DeviceDTO.findOne({
      where: {
        id: id,
      }});
  }
  async checkByUserId(user_id) {
    return await DeviceDTO.findAll({
      where: {
        user_id: user_id,
      }
    })
  }
  async updateById(device, id) {
    device.updated_at = Date.now();
    return await DeviceDTO.update({
      user_id: device.user_id,
      device_name: device.device_name,
      information: device.information,
      device_type: device.device_type,
      start_date: device.start_date,
      end_date: device.end_date,
      updated_at: device.updated_at
    }, {
      where: {
        id: id,
      }
    });
  }
}

module.exports = new DeviceModel();
