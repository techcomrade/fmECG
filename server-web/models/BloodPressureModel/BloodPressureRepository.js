const BloodPressureDTO = require("./BloodPressureDTO");

class BloodPressureModel {
  async getAllData() {
    return await BloodPressureDTO.findAll();
  }
}

module.exports = new BloodPressureModel();
