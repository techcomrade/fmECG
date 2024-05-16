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

  async add(deviceFrequency) {
    return await DeviceDTO.create({
      id: deviceFrequency.id,
      device_id: deviceFrequency.device_id,
      frequency_name: deviceFrequency.frequency_name,
      information: deviceFrequency.information ?? "",
      value: deviceFrequency.value,
    });
  }
}
