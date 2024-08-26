const redis = require("../config/redis");

class RedisService {
  async addTokenToRedis(token) {
    try {
      await Promise.all([
        redis.hset(`token_user_${token.account_id}`, "access_token", token.access_token),
        redis.hset(`token_user_${token.account_id}`, "refresh_token", token.refresh_token),
      ]);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteKey(account_id) {
    try {
      await redis.del(`token_user_${account_id}`);
    } catch (error) {
      console.log(error);
    }
  }

  async updateTokenToRedis(token) {
    try {
      await this.deleteKey(token.account_id);
      await this.addTokenToRedis(token);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}

module.exports = new RedisService();
