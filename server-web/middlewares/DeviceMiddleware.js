const DeviceService = require("../services/DeviceService");
const { convertStringToDate } = require("../utils/processTime");
class DeviceMiddleware {
  async validateData(req, res, next) {
    console.log("[V]:::Validate Device: ");
    let validated = DeviceService.ValidateDevice(req.body).error;
    if (validated === undefined) next();
    else
      return res.status(500).json({
        message: `invalid request: ${validated.details[0].message}`,
      });
  }

  async validateCreateData(req, res, next) {
    console.log("[V]:::Validate Create Device : ");
    let validated = DeviceService.ValidateDevice(req.body, false).error;
    if (validated === undefined) next();
    else
      return res.status(500).json({
        message: `invalid request: ${validated.details[0].message}`,
      });
  }

  async checkStartDateInterval(req, res, next) {
    if (
      isNaN(Number(req.params.startDate)) ||
      isNaN(Number(req.params.endDate))
    )
      return res.status(400).json({
        message: "Date is not a number!",
      });
    const deviceByStartDateInterval =
      await DeviceService.getDeviceByStartDateInterval(
        req.params.startDate,
        req.params.endDate
      );
    if (deviceByStartDateInterval.length === 0)
      return res.status(404).json({
        message: "Device not existed!",
      });
    next();
  }

  async checkEndDateInterval(req, res, next) {
    if (
      isNaN(Number(req.params.startDate)) ||
      isNaN(Number(req.params.endDate))
    )
      return res.status(400).json({
        message: "Date is not a number!",
      });
    const deviceByEndDateInterval =
      await DeviceService.getDeviceByEndDateInterval(
        req.params.startDate,
        req.params.endDate
      );
    if (deviceByEndDateInterval.length === 0)
      return res.status(404).json({
        message: "Device not existed!",
      });
    next();
  }

  async checkUsername(req, res, next) {
    const username = req.params.username;
    const checkUsername = await DeviceService.getDeviceByUsername(username);
    if (!checkUsername)
      return res.status(404).json({
        message: "Device not existed!",
      });
    next();
  }
}

module.exports = new DeviceMiddleware();
