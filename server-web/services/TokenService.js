const jwt = require("jsonwebtoken");
const redis = require("../config/redis.config");
const TokenRepository = require("../models/TokenModel/TokenRepository");
const { refreshToken } = require("../controllers/AuthenController");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

class TokenService {
  renderToken(account, expiredTime) {
    // expiredTime was minutes
    return jwt.sign(
      {
        account_id: account.account_id,
        role: account.role,
        exp: Math.floor(Date.now() / 1000) + expiredTime * 60,
      },
      process.env.JWT_SECRET
    );
  }

  decodeToken(token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return decoded;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async refreshToken(refresh_token, expiredTime) {
    try {
      // Kiểm tra refresh_token có tồn tại và hợp lệ không
      const storedToken = await TokenRepository.findByToken(refresh_token);
      if (!storedToken) {
        console.log("Invalid refresh token.");
        return false;
      }

      // Giải mã refresh_token
      const decoded = await jwt.verify(refresh_token, process.env.JWT_SECRET);
      if (!decoded) {
        console.log("Unauthorized refresh token.");
        return false;
      }

      // Tạo Access Token mới
      const newAccessToken = this.renderToken(
        {
          account_id: decoded.account_id,
          role: decoded.role,
          exp: Math.floor(Date.now() / 1000) + expiredTime * 60,
        },
        process.env.JWT_SECRET
      );

      // Cập nhật token mới trong cơ sở dữ liệu và Redis
      var token = {
        id: uuidv4(),
        account_id: decoded.account_id,
        access_token: newAccessToken,
        refresh_token: refresh_token,
        created_at: Number(new Date()),
      };

      // Xóa token cũ trước khi thêm token mới để tránh race condition
      await TokenRepository.deleteByAccountId(decoded.account_id);

      // Thêm token mới vào cơ sở dữ liệu
      await TokenRepository.add(token);

      // Cập nhật Access Token mới trong Redis
      await redis.hset(
        `token_user_${decoded.account_id}`,
        "access_token",
        newAccessToken
      );

      return newAccessToken;
    } catch (err) {
      console.log("Refresh token verification failed:", err.message);
      return false;
    }
  }

  async autoDeleteExpiredTokens() {
    try {
      const keys = await redis.keys("token_user_*");

      const currentTime = Math.floor(Date.now() / 1000);

      for (const key of keys) {
        const token = await redis.hget(key, "refresh_token");

        if (token) {
          const decodedToken = this.decodeToken(token);
          const account_id = key.split("_")[2];

          if (!decodedToken) {
            await redis.del(key);
            await TokenRepository.deleteByAccountId(account_id);

            console.log(`Deleted expired token for key: ${key}`);
          }
        }
      }
      console.log("Expired token cleanup completed.");
    } catch (err) {
      console.error("Error during token cleanup:", err);
    }
  }
}
module.exports = new TokenService();
