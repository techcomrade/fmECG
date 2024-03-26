const RecordDTO = require("./RecordDTO");
class RecordModel {
  async getAllData() {
    return await RecordDTO.findAll();
  }
}

module.exports = new RecordModel();
