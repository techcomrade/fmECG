const { Sequelize } = require("sequelize");
const {
  convertDateNormal,
  convertTimeToString,
} = require("../../utils/processTime");
const DeviceDTO = require("./DeviceDTO");
const sequelize = require("../../config/sequelize");
class DeviceModel {
  async getAllData() {
    const devices = await DeviceDTO.findAll({
      attributes: {
        exclude: ["created_at", "updated_at"],
      },
    });
    return devices;
  }

  async getDeviceByStartDateInterval(startDate, endDate) {
    return await DeviceDTO.findAll({
      where: {
        start_date: {
          [Sequelize.Op.between]: [startDate, endDate],
        },
      },
    });
  }

  async getDeviceByEndDateInterval(startDate, endDate) {
    return await DeviceDTO.findAll({
      where: {
        end_date: {
          [Sequelize.Op.between]: [startDate, endDate],
        },
      },
    });
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

  async deleteById(id, t) {
    return await DeviceDTO.destroy(
      {
        where: {
          id: id,
        },
      },
      t && {
        transaction: t,
      }
    );
  }

  async checkById(id) {
    return await DeviceDTO.findOne({
      where: {
        id: id,
      },
    });
  }

  async checkByUserId(user_id) {
    return await DeviceDTO.findAll({
      where: {
        user_id: user_id,
      },
    });
  }

  async checkByDeviceName(device_name) {
    return await DeviceDTO.findAll({
      where: {
        device_name: device_name,
      },
    });
  }
  
  async updateById(device, id) {
    device.updated_at = Date.now();
    return await DeviceDTO.update(
      {
        user_id: device.user_id,
        device_name: device.device_name,
        information: device.information,
        device_type: device.device_type,
        start_date: device.start_date,
        end_date: device.end_date,
        updated_at: device.updated_at,
      },
      {
        where: {
          id: id,
        },
      }
    );
  }

  async count(){
    return await DeviceDTO.count();
  }
}

module.exports = new DeviceModel();
