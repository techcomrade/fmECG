const DeviceDetailsDTO = require("./DeviceDetailsDTO");
const { Sequelize, QueryTypes } = require("sequelize");
const sequelize = require("../../config/sequelize");

const { v4: uuidv4 } = require("uuid");
class DeviceDetailsModel {
  async getAllData() {
    const devices = await DeviceDetailsDTO.findAll({
      attributes: {
        exclude: ["created_at", "updated_at"],
      },
    });
    return devices;
  }
  async deleteById(id, t) {
    return await DeviceDetailsDTO.destroy(
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
    return await DeviceDetailsDTO.findOne({
      where: {
        id: id,
      },
    });
  }
  async checkByUserId(user_id) {
    return await DeviceDetailsDTO.findAll({
      where: {
        user_id: user_id,
      },
    });
  }

  async add(DeviceDetails, t) {
    console.log(DeviceDetails);
    DeviceDetails.id = uuidv4();
    DeviceDetails.created_at = Date.now();
    return await DeviceDetailsDTO.create({
      id: DeviceDetails.id,
      device_id: DeviceDetails.device_id,
      detail_name: DeviceDetails.detail_name,
      information: DeviceDetails.information ?? "",
      status: DeviceDetails.status ?? "0",
      value: DeviceDetails.value,
      detail_type: DeviceDetails.detail_type,
      created_at: DeviceDetails.created_at,
    }, 
    t && {
      transaction: t
    }
  );
  }

  async getByDeviceId(deviceId) {
    return await DeviceDetailsDTO.findAll({
      where: {
        device_id: deviceId,
      },
    });
  }

  async getByDeviceIdAndFreq(device_id) {
    return await sequelize.query(
      "SELECT detail.detail_name, detail.information, detail.value FROM fmecg.devices as de LEFT JOIN fmecg.device_details as detail ON de.id = detail.device_id WHERE detail.detail_type = 1 AND de.id = :id",
      {
        replacements: { id: device_id },
        type: QueryTypes.SELECT,
      }
    );
  }

  async getByDeviceIdAndConnection(device_id) {
    return await sequelize.query(
      "SELECT detail.detail_name, detail.information, detail.value FROM fmecg.devices as de LEFT JOIN fmecg.device_details as detail ON de.id = detail.device_id WHERE detail.detail_type = 2 AND de.id = :id",
      {
        replacements: { id: device_id },
        type: QueryTypes.SELECT,
      }
    );
  }

  async getByDeviceIdAndStorage(device_id) {
    return await sequelize.query(
      "SELECT detail.detail_name, detail.information, detail.value FROM fmecg.devices as de LEFT JOIN fmecg.device_details as detail ON de.id = detail.device_id WHERE detail.detail_type = 3 AND de.id = :id",
      {
        replacements: { id: device_id },
        type: QueryTypes.SELECT,
      }
    );
  }

  async updateById(deviceFreq, id, t) {
    return await DeviceDetailsDTO.update(
      {
        device_id: deviceFreq.device_id,
        detail_name: deviceFreq.detail_name,
        information: deviceFreq.information,
        value: deviceFreq.value,
        status: deviceFreq.status,
        updated_at: deviceFreq.updated_at,
      },
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
}

module.exports = new DeviceDetailsModel();
