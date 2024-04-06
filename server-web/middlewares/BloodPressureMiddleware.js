const BloodPressureService = require("../services/BloodPressureService");

class BloodPressureMiddleware {
  async validateData(req, res, next) {
    let validated = BloodPressureService.ValidateBloodPressureRec(
      req.body
    ).error;
    if (validated === undefined) next();
    else
      return res
        .status(500)
        .json(`invalid request: ${validated.details[0].message}`);
  }
}

module.exports = new BloodPressureMiddleware();
