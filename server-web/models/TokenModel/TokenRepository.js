const TokenDTO = require("./TokenDTO");
const Redis = require("ioredis");
const redis = new Redis(6381); 

class TokenRepository {
  async getAllData() {
    return await TokenDTO.findAll();
  }
  async add(token) {
    await TokenDTO.create({
      id: token.id,
      account_id: token.account_id,
      access_token: token.access_token,
      refresh_token: token.refresh_token,
      created_at: token.created_at,
      updated_at: Number(new Date())
    });

    await redis.set(`refresh_token:${token.account_id}`, token.refresh_token);

    return true;
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
}
module.exports = new TokenRepository();
