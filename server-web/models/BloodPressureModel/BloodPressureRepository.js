const BloodPressureDTO = require("./BloodPressureDTO");

class BloodPressureModel {
  async getAllData() {
    return await BloodPressureDTO.findAll();
  }
  async deleteById(id) {
    return await BloodPressureDTO.destroy({
      where: { id: id },
    });
  }
}

module.exports = new BloodPressureModel();
