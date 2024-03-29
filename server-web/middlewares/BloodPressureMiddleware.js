const BloodPressureService = require("../services/BloodPressureService");

class BloodPressureMiddleware {
  async validateData(req, res, next) {
    let validated = BloodPressureService.validateData(req.body).error;
    if (validated === true) next();
    return res
      .status(500)
      .json(`invalid request: ${validated.details[0].message}`);
  }
}

module.exports = new BloodPressureMiddleware();
