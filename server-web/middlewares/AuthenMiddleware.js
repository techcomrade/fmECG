const AuthenService = require("../services/AuthenService");
const UserService = require("../services/UserService");
class AuthenMiddleware {
  validateUser(req, res, next) {
    const validation = UserService.validateUser(req.body).error;
    if (validation === undefined) {
      console.log("Validate successful!");
      next();
    } else {
      return res.status(400).json({
        message: validation.details[0].message,
      });
    }
  }
  validateAccount(req, res, next) {
    const validation = AuthenService.validateAccount(req.body);
    if (!validation?.error) next();
    else {
      return res.status(400).json({
        message: "validate account falied",
      });
    }
  }
}

module.exports = new AuthenMiddleware();
