const jwt = require("jsonwebtoken");
const redis = require('../config/redis.config');
require("dotenv").config();


class TokenService {
  renderToken(account, expiredTime) {
    // expiredTime was minutes
    return jwt.sign(
      {
        account_id: account.id,
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
      const decoded = await jwt.verify(refresh_token, process.env.JWT_SECRET);
      const newAccessToken = await this.renderToken(
        {
          account_id: decoded.account_id,
          role: decoded.role,
          exp: Math.floor(Date.now() / 1000) + expiredTime * 60,
        },
        process.env.JWT_SECRET
      );
      return newAccessToken;
    } catch (err) {
      console.log("Refresh token verification failed:", err.message);
      return false;
    }
  }

  async autoDeleteExpiredTokens() {
    try {
      const keys = await redis.keys('token_user_*');
      
      const currentTime = Math.floor(Date.now() / 1000);
      
      for (const key of keys) {
        const token = await redis.hget(key, 'refresh_token');
        
        if (token) {
          const decodedToken = jwt.decode(token);

          if (decodedToken && decodedToken.exp && currentTime > decodedToken.exp) {
            await redis.del(key);
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
