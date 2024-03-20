const DeviceService = require("../services/deviceService");
const UserService = require("../services/UserService");

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
      if (device.user_id && device.device_name && device.device_type && device.start_date && device.end_date) {
          const checkExistUser = await UserService.checkUser(device.user_id);
          if(!checkExistUser.length){
            return res.status(400).json("no user found");
          }
          //console.log(checkExistUser);
          await DeviceService.add(device)
          .then((checked) => {
            //console.log(checked);
            if(checked) return res.status(200).json("add device successfully");
            return res.status(500).json("err server add failed"); 
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
      if (device.user_id && device.device_name && device.device_type && device.start_date && device.end_date) {
        const checkExistUser = await UserService.checkUser(device.user_id);
          if(!checkExistUser.length){
            return res.status(400).json("no user found");
          }
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
      else {
        return res.status(400).json("bad request");
      }
    } catch (err) {
      return res.status(400).json(err, "update device failed");
    }
  }
}

module.exports = new DeviceController();
