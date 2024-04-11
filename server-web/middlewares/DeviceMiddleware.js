const DeviceService = require("../services/DeviceService");
const { convertStringToDate } = require("../utils/processTime");
class DeviceMiddleware {
  async validateData(req, res, next) {
    console.log('[V]:::Validate Device: ')
    let validated = DeviceService.ValidateDevice(req.body).error;
    if (validated === undefined) next();
    else
      return res
        .status(500)
        .json(`invalid request: ${validated.details[0].message}`);
  }
}

module.exports = new DeviceMiddleware();
