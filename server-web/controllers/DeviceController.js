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
      if (device) {
        device.created_at = new Date();
        device.updated_at = this.created_at;
        await DeviceService.add(device)
          .then((device) => {
            return res.status(200).json({
              id: device.id,
              user_id: device.user_id,
              name: device.device_name,
              information: device.information,
              type: device.device_type,
              start_date: device.start_date,
              end_date: device.end_date,
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
              await DeviceService.updateById(device);
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
