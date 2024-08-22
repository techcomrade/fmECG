const jwt = require("jsonwebtoken");
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

  refreshToken(refresh_token, expiredTime) {
    try {
      const decoded = jwt.verify(refresh_token, process.env.JWT_SECRET);
      const newAccessToken = this.renderToken(
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
}
module.exports = new TokenService();
