const RecordDTO = require("./RecordDTO");
class RecordModel {
  async getAllData() {
    return await RecordDTO.findAll();
  }
  async deleteById(id) {
    return await RecordDTO.destroy({ where: { id: id } });
  }
}

module.exports = new RecordModel();
