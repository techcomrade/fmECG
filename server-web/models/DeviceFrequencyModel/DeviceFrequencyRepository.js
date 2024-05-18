const DeviceFrequencyDTO = require("./DeviceFrequencyDTO");

class DeviceFrequencyModel {
  async getAllData() {
    const devices = await DeviceFrequencyDTO.findAll({
      attributes: {
        exclude: ["created_at", "updated_at"],
      },
    });
    return devices;
  }
  async deleteById(id, t) {
    return await DeviceFrequencyDTO.destroy(
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
    return await DeviceFrequencyDTO.findOne({
      where: {
        id: id,
      },
    });
  }
  async checkByUserId(user_id) {
    return await DeviceFrequencyDTO.findAll({
      where: {
        user_id: user_id,
      },
    });
  }

  async add(deviceFrequency) {
    return await DeviceFrequencyDTO.create({
      id: deviceFrequency.id,
      device_id: deviceFrequency.device_id,
      frequency_name: deviceFrequency.frequency_name,
      information: deviceFrequency.information ?? "",
      value: deviceFrequency.value,
      created_at: deviceFrequency.created_at
    });
  }
  
  async checkByDeviceId(deviceId) {
    return await DeviceFrequencyDTO.findAll({
      where: {
        device_id: deviceId,
      }
    })
  }
  
  async updateById(deviceFreq, id) {
    return await DeviceFrequencyDTO.update({
      device_id: deviceFreq.device_id,
      frequency_name: deviceFreq.frequency_name,
      information: deviceFreq.information,
      value: deviceFreq.value,
      updated_at: deviceFreq.updated_at,
    },{
      where: {
        id: id,
      }
    })
  }
}

module.exports = new DeviceFrequencyModel();
