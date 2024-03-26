const HeartRecDTO = require("./HeartRecDTO");
class HeartRecModel {
  async getAllData() {
    return await HeartRecDTO.findAll();
  }
  async deleteById(id) {
    return await HeartRecDTO.destroy({
      where: { id: id }
    });
  }
}

module.exports = new HeartRecModel();
