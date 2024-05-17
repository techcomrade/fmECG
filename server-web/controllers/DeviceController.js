const DeviceService = require("../services/DeviceService");
const UserService = require("../services/UserService");
const RecordService = require("../services/RecordService");
const DeviceFreqService = require("../services/DeviceFrequencyService");

class DeviceController {
  async getAllData(req, res) {
    console.log(`[P]:::Get all devices data`);
    try {
      let devices = await DeviceService.getAllData();
      if (!devices.length)
        return res.status(400).json({
          message: "No devices found",
        });
      for (const device of devices) {
        let checkExistDF = await DeviceFreqService.getByDeviceId(device.id);
        let DFresult = [];
        checkExistDF.forEach((df) => {
          let DF = {
            frequency_name: df.frequency_name,
            information: df.information,
            value: df.value,
          };
          DFresult.push(DF);
        });
        device.dataValues.frequency = DFresult;
      }
      console.log(devices);
      return res.status(200).json({
        message: "get all devices",
        metadata: devices,
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        message: "get devices failed",
      });
    }
  }
  async add(req, res) {
    console.log(`[P]:::Add device data`, req.body);
    const device = req.body;
    const checkExistUser = await UserService.getUserById(device.user_id);
    if (!checkExistUser[0]?.dataValues) {
      return res.status(400).json({
        message: "no user found",
      });
    }
    await DeviceService.add(device)
      .then((checked) => {
        if (checked)
          return res.status(200).json({
            message: "add device successfully",
          });
        return res.status(500).json({
          message: "err server add failed",
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).json({
          message: "add device failed",
        });
      });
  }
  async delete(req, res) {
    console.log(`[P]:::Delete device data`, req.params.id);
    const device_id = req.params.id;
    if (device_id) {
      let checkExistDevice = await DeviceService.getDeviceById(device_id);
      if (!checkExistDevice?.dataValues) {
        return res.status(400).json({
          message: "no device found",
        });
      }
      await DeviceService.deleteById(device_id)
        .then((checked) => {
          if (checked)
            return res.status(200).json({
              message: "delete device successfully",
            });
          else
            return res.status(500).json({
              message: "delete device failed",
            });
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json({
            message: "delete device failed",
          });
        });
    } else
      return res.status(400).json({
        message: "no device id selected",
      });
  }
  async update(req, res) {
    console.log(`[P]:Update device data`, req.body);
    const id = req.body.id;
    const device = req.body;
    let checkExistDevice = await DeviceService.getDeviceById(id);
    if (!checkExistDevice?.dataValues)
      return res.status(400).json({
        message: "no device found",
      });
    const checkExistUser = await UserService.getUserById(device.user_id);
    if (!checkExistUser[0]?.dataValues) {
      return res.status(400).json({
        message: "no user found",
      });
    }
    await DeviceService.updateById(device, id)
      .then(() => {
        return res.status(200).json({
          message: "update device successfully",
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({
          message: "update device failed",
        });
      });
  }
  async getDeviceById(req, res) {
    console.log(`[P]:Get device by id`, req.params.id);
    const id = req.params.id;
    try {
      let checkExistDevice = await DeviceService.getDeviceById(id);
      if (!checkExistDevice?.dataValues) {
        return res.status(400).json({
          message: "no device found",
        });
      }
      let checkExistRecord = await RecordService.getRecordByDeviceId(id);
      let checkExistDF = await DeviceFreqService.getByDeviceId(id);
      let DFresult = [];
      checkExistDF.forEach((df) => {
        let DF = {
          frequency_name: df.frequency_name,
          information: df.information,
          value: df.value,
        };
        DFresult.push(DF);
      });

      return res.status(200).json({
        message: "Get device by id",
        metadata: {
          id: checkExistDevice.dataValues.id,
          user_id: checkExistDevice.dataValues.user_id,
          device_name: checkExistDevice.dataValues.device_name,
          information: checkExistDevice.dataValues.information,
          device_type: checkExistDevice.dataValues.device_type,
          start_date: checkExistDevice.dataValues.start_date,
          end_date: checkExistDevice.dataValues.end_date,
          recordCount: checkExistRecord.length,
          frequency: DFresult,
        },
      });
    } catch (err) {
      return res.status(500).json({
        message: "get device by id failed",
      });
    }
  }
}

module.exports = new DeviceController();
