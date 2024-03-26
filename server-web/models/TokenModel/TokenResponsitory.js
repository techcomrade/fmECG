const TokenDTO = require("./TokenDTO");

class TokenRepository {
  async getAllData() {
    return await TokenDTO.findAll();
  }
  async deleteById(id) {
    return await TokenDTO.destroy({ where: { id: id } });
  }
}
module.exports = new TokenRepository();
