const DeviceService = require("../services/DeviceService");
class DeviceMiddleware {
  async validateData(req, res, next) {
    let validated = DeviceService.ValidateDevice(req.body).error;
    if (validated === undefined) next();
    return res
      .status(500)
      .json(`invalid request: ${validated.details[0].message}`);
  }
}

module.exports = new DeviceMiddleware();
