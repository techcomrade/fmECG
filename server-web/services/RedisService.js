const redis = require("../config/redis");
const TokenService = require("./TokenService");

class RedisService {
  async addTokenToRedis(token) {
    try {
      await Promise.all([
        redis.hset(
          `token_user_${token.account_id}`,
          "access_token",
          token.access_token
        ),
        redis.hset(
          `token_user_${token.account_id}`,
          "refresh_token",
          token.refresh_token
        ),
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

  async autoDeleteExpiredToken() {
    const keys = await redis.keys("token_user_*");
    const currentTime = Math.floor(Date.now() / 1000);
    try {
      for (const key of keys) {
        const token = await redis.hget(key, "refresh_token");
        if (token) {
          const decodedToken = TokenService.decodeToken(token);
          const account_id = key.split("_")[2];

          if (!decodedToken) {
            await redis.del(key);
            console.log(`Deleted expired token for key: ${key}`);
          }
        }
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}

module.exports = new RedisService();
