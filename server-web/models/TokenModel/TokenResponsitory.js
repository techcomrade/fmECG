const TokenDTO = require("./TokenDTO");

class TokenRepository {
  async getAllData() {
    return await TokenDTO.findAll();
  }
}
module.exports = new TokenRepository();
