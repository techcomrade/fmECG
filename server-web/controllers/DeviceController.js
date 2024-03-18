const DeviceService = require("../services/deviceService");

class DeviceController {
  async getAllData(req, res) {
    await DeviceService.getAllData()
      .then((devices) => {
        if (devices.length) return res.status(200).json(devices);
        else return res.status(400).json("No devices found");
      })
      .catch((err) => {
        return res.status(400).json(err, "get devices failed");
      });
  }
  async add(req, res) {
    try {
      const device = req.body;
      console.log(device);
      if (device.user_id && device.device_name && device.information && device.device_type && device.start_date && device.end_date) {
        await DeviceService.add(device)
          .then((Device) => {
            return res.status(200).json({
              id: Device.id,
              user_id: Device.user_id,
              name: Device.device_name,
              information: Device.information,
              type: Device.device_type,
              start_date: Device.start_date,
              end_date: Device.end_date,
            });
          })
          .catch((err) => {
            return res.status(400).json(err, "add device failed");
          });
      } else {
        return res.status(500).json(err, "no request received");
      }
    } catch (err) {
      return res.status(400).json(err, "add device failed");
    }
  }
  async delete(req, res) {
    try {
      const device_id = req.params.id;
      if (device_id) {
        await DeviceService.checkDevice(id)
          .then(async (checked) => {
            if (checked) {
              await DeviceService.deleteById(id);
              return res.status(200).json("delete device successfully");
            }
            return res.status(500).json("no device found");
          })
          .catch((err) => {
            return res.status(400).json(err);
          });
      }
    } catch (err) {
      return res.status(400).json(err, "delete device failed");
    }
  }
  async update(req, res) {
    try {
      const id = req.params.id;
      const device = req.body;
      if (device) {
        await DeviceService.checkDevice(id)
          .then(async (checked) => {
            if (checked) {
              await DeviceService.updateById(device, id);
              return res.status(200).json("update device successfully");
            }
            return res.status(500).json("no device found");
          })
          .catch((err) => {
            return res.status(400).json(err);
          });
      }
    } catch (err) {
      return res.status(400).json(err, "update device failed");
    }
  }
}

module.exports = new DeviceController();
