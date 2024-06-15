const jwt = require("jsonwebtoken");
require("dotenv").config();

class TokenService {
  renderToken(account, expiredTime) {
    // expiredTime was minutes
    return jwt.sign(
      {
        account_id: account.id,
        role: account.role,
        exp: Math.floor(Date.now() / 1000) + expiredTime * 3600,
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
}
module.exports = new TokenService();
