const TokenDTO = require("./TokenDTO");
const Redis = require("ioredis");
const redis = new Redis(6381); 

class TokenRepository {
  async getAllData() {
    return await TokenDTO.findAll();
  }
  async addTokenToDb(token) {
    return await TokenDTO.create({
      id: token.id,
      account_id: token.account_id,
      access_token: token.access_token,
      refresh_token: token.refresh_token,
      expires_at: token.expires_at,
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
  async deleteById(id,t) {
    return await TokenDTO.destroy({
      where: {
        id: id,
      },
    },
    t && {
      transaction: t,
    });
  }

  async findByToken(token) {
    return await TokenDTO.findOne({
      where: {
        refresh_token: token,
      }
    })
  }
}
module.exports = new TokenRepository();
