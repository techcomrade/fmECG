const { Sequelize, QueryTypes } = require("sequelize");
const sequelize = require("../../config/sequelize");
const {
  convertDateNormal,
  convertTimeToString,
} = require("../../utils/processTime");
const DeviceDTO = require("./DeviceDTO");
class DeviceModel {
  async getAllData() {
    return await sequelize.query(
      "SELECT de.*, u.username, def.frequency_name, def.information, def.value FROM fmecg.devices AS de LEFT JOIN fmecg.users AS u ON de.user_id = u.id LEFT JOIN fmecg.device_frequency AS def ON de.id = def.device_id",
      {
        type: QueryTypes.SELECT,
      }
    );
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

  async add(device) {
    return await DeviceDTO.create({
      id: device.id,
      user_id: device.user_id,
      device_name: device.device_name,
      information: device.information ?? "",
      device_type: device.device_type,
      start_date: device.start_date

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
        updated_at: device.updated_at,
      },
      {
        where: {
          id: id,
        },
      }
    );
  }

  async count() {
    return await DeviceDTO.count();
  }

  async getByDoctorId(id) {
    return await DeviceDTO.findAll({
      where: {
        doctor_id: id,
      },
    });
  }

  async getDevicesByUserId(id){
    return await DeviceDTO.findAll({
      where:{
        user_id:id
      }
    })
  }
}

module.exports = new DeviceModel();
