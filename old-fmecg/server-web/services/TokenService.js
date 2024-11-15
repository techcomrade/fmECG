const jwt = require("jsonwebtoken");
require("dotenv").config();
const TokenRepository = require("../models/TokenModel/TokenRepository");
const { v4: uuidv4 } = require("uuid");
// const redis = require('../config/redis');

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

  // async refreshToken(refresh_token, expiredTime) {
  //   try {
  //     const isValidToken = this.decodeToken(refresh_token);
  //     if (!isValidToken) {
  //       return false;
  //     }
  
  //     const storedToken = await redis.exists(refresh_token);
  //     if (!storedToken) {
  //       storedToken = await TokenRepository.findByToken(refresh_token);
  //       if (!storedToken) {
  //         console.log("Invalid refresh token.");
  //         return false;
  //       }
  //     }
  
  //     const decoded = jwt.verify(refresh_token, process.env.JWT_SECRET);
  //     if (!decoded) {
  //       console.log("Invalid refresh token.");
  //       return false;
  //     }
  
  //     const newAccessToken = this.renderToken(
  //       {
  //         account_id: decoded.account_id,
  //         role: decoded.role,
  //         exp: Math.floor(Date.now() / 1000) + expiredTime * 60,
  //       },
  //       process.env.JWT_SECRET
  //     );
  
  //     var token = {
  //       id: uuidv4(),
  //       account_id: decoded.account_id,
  //       access_token: newAccessToken,
  //       refresh_token: refresh_token,
  //       expires_at: Number(new Date()) + expiredTime * 1000, // Chú ý đơn vị thời gian
  //     };
  
  //     try {
  //       await this.updateTokenToDb(token);
  //     }catch(err) {
  //       console.log(err);
  //     }
      
  //     try{
  //       await RedisService.updateTokenToRedis(token);
  //     }catch(err) {
  //       console.log(err);
  //     }
  
  //     return newAccessToken;
  //   } catch (err) {
  //     console.error(err);
  //     return false;
  //   }
  // }

  async updateTokenToDb(token) {
    try {
      await TokenRepository.deleteByAccountId(token.account_id);
      await TokenRepository.addTokenToDb(token);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async autoDeleteExpiredToken() {
    try{
      const tokens = await TokenRepository.getAllData();
      for (const token of tokens) {
        const decoded = this.decodeToken(token.refresh_token);
        if (!decoded) {
          await TokenRepository.deleteByToken(token.refresh_token);
        }
      }
    }catch(error){
      console.error(error);
      return false;
    }
  }
}
module.exports = new TokenService();
