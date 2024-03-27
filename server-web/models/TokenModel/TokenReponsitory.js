const TokenDTO = require("./TokenDTO");

class TokenRepository {
  async getAllData() {
    return await TokenDTO.findAll();
  }
  async add(token) {
    return await TokenDTO.create({
      id: token.id,
      account_id: token.account_id,
      access_token: token.access_token,
      refresh_token: token.refresh_token,
      created_at: token.created_at,
      updated_at: Number(new Date())
    });
  }
  async deleteByAccountId(id) {
    return await TokenDTO.destroy({
      where: {
        account_id: id,
      },
    });
  }
  async deleteById(id) {
    return await TokenDTO.destroy({
      where: {
        id: id,
      },
    });
  }
}
module.exports = new TokenRepository();
