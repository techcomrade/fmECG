const DeviceService = require("../services/DeviceService");
const UserService = require("../services/UserService");

class DeviceController {
  async getAllData(req, res) {
    console.log(`[P]:::Get all devices data`);
    await DeviceService.getAllData()
      .then((devices) => {
        if (devices.length)
          return res.status(200).json({
            message: "get all devices",
            metaData: devices,
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
    const device = req.body;
    const checkExistUser = await UserService.getUserById(device.user_id);
    if (!checkExistUser.length) {
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
    const device_id = req.params.id;
    if (device_id) {
      let checkExistDevice = await DeviceService.checkDevice(device_id);
      if (checkExistDevice) {
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
          message: "no device found",
        });
    }
  }
  async update(req, res) {
    const id = req.params.id;
    const device = req.body;
    let checkExistDevice = await DeviceService.checkDevice(id);
    if (checkExistDevice) {
      const checkExistUser = await UserService.getUserById(device.user_id);
      if (!checkExistUser.length) {
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
}

module.exports = new DeviceController();
