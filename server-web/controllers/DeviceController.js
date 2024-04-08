const DeviceService = require("../services/DeviceService");
const UserService = require("../services/UserService");
const Record = require("../services/RecordService");
const BloodPressureRecord = require("../services/BloodPressureService");
//const HeartRecord = require("../services/HeartRecordService");

class DeviceController {
  async getAllData(req, res) {
    console.log(`[P]:::Get all devices data`);
    await DeviceService.getAllData()
      .then((devices) => {
        if (devices.length)
          return res.status(200).json({
            message: "get all devices",
            metadata: devices,
          });
        return res.status(400).json({
          message: "No devices found",
        });
      })
      .catch((err) => {
        return res.status(400).json({
          message: "get devices failed",
        });
      });
  }
  async add(req, res) {
    console.log(`[P]:::Add device data`, req.body);
    const device = req.body;
    const checkExistUser = await UserService.getUserById(device.user_id);
    console.log(checkExistUser);
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
        return res.status(400).json({
          message: "add device failed",
        });
      });
  }
  async delete(req, res) {
    console.log(`[P]:::Delete device data`, req.params.id);
    const device_id = req.params.id;
    if (device_id) {
      let checkExistDevice = await DeviceService.checkDevice(device_id);
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
          return res.status(500).json({
            message: "delete device failed",
          });
        });
    }
  }
  async update(req, res) {
    console.log(`[P]:Update device data`, req.body);
    const id = req.params.id;
    const device = req.body;
    let checkExistDevice = await DeviceService.checkDevice(id);
    if (checkExistDevice?.dataValues) {
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
          return res.status(500).json({
            message: "update device failed",
          });
        });
    } else
      return res.status(400).json({
        message: "no device found",
      });
  }
  async getBloodPressureRecordByDeviceId(req, res) {
    console.log(`[P]:::Get Blood Pressure record by Device Id`, req.params.id);
    const id = req.params.id;
    let checkExistDevice = await DeviceService.checkDevice(id);
    if (!checkExistDevice?.dataValues) {
      return res.status(400).json({
        message: "device not found",
      });
    }
    let checkExistRecord = await Record.getRecordByDeviceId(id);
    if (!checkExistRecord[0]?.dataValues) {
      return res.status(400).json({
        message: "record not found",
      });
    }
    let record_id = checkExistRecord[0].dataValues.id;
    let checkExistBPRecord = await BloodPressureRecord.getRecordByRecordId(record_id);
    if (!checkExistBPRecord[0]?.dataValues) {
      return res.status(400).json({
        message: "No BloodPressure record by this device",
      });
    }
    let records = [];
    checkExistBPRecord.forEach(record => {
      records.push(record.dataValues);
    })
    console.log(records);
    return res.status(200).json({
      message: "get BP record by device successfully",
      metadata: records,
    });
  }
}

module.exports = new DeviceController();
