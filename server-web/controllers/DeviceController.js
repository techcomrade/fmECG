const DeviceService = require("../services/DeviceService");
const UserService = require("../services/UserService");
const RecordService = require("../services/RecordService");

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
        console.log(err);
        return res.status(400).json({
          message: "get devices failed",
        });
      });
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
      if (!checkExistRecord[0].dataValues) {
        return res.status(200).json({
          message: "Get device by id",
          metadata: checkExistDevice.dataValues,
        });
      }
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
        },
      });
    } catch (err) {
      return res.status(500).json({
        message: "get device by id failed",
      });
    }
  }

  async getDeviceByStartDateInterval(req, res, next) {
    console.log(
      `[P]:::Get device by start date interval: `,
      req.params.startDate,
      req.params.endDate
    );
    const deviceByStartDateInterval =
      await DeviceService.getDeviceByStartDateInterval(
        req.params.startDate,
        req.params.endDate
      );
    return res.status(200).json({
      message: "Get device by start date interval successful!",
      metadata: deviceByStartDateInterval,
    });
  }

  async getDeviceByEndDateInterval(req, res, next) {
    console.log(
      `[P]:::Get device by end date interval: `,
      req.params.startDate,
      req.params.endDate
    );
    const deviceByEndDateInterval =
      await DeviceService.getDeviceByEndDateInterval(
        req.params.startDate,
        req.params.endDate
      );
    return res.status(200).json({
      message: "Get device by end date interval successful!",
      metadata: deviceByEndDateInterval,
    });
  }

  async getDeviceByUsername(req, res, next) {
    console.log(`[P]:::Get device by username: `, req.params.username);
    const deviceByUsername = await DeviceService.getDeviceByUsername(
      req.params.username
    );
    return res.status(200).json({
      message: "Get device by username successful!",
      metadata: deviceByUsername,
    });
  }

  async getDeviceByDeviceName(req, res, next) {
    console.log(`[P]:::Get device by device name: `, req.params.device_name);
    const deviceByDeviceName = await DeviceService.getDeviceByDeviceName(
      req.params.device_name
    );
    return res.status(200).json({
      message: "Get device by device name successful!",
      metadata: deviceByDeviceName,
    });
  }
}

module.exports = new DeviceController();
