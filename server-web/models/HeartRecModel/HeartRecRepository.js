const HeartRecDTO = require("./HeartRecDTO");
class HeartRecMode {
  async getAllData() {
    return await HeartRecDTO.findAll();
  }
}

module.exports = new HeartRecModel();
