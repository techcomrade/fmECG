const jwt = require("jsonwebtoken");
require("dotenv").config();

class TokenService {
  renderToken(account_id, expiredTime) {
    // expiredTime was minutes
    return jwt.sign(
      {
        account_id: account_id,
        exp: Math.floor(Date.now() / 1000) + expiredTime * 60,
      },
      process.env.JWT_SECRET
    );
  }
  decodeToken(token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);
      return decoded;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}
module.exports = new TokenService();
