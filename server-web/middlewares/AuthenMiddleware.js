const AuthenService = require("../services/AuthenService");
const UserService = require("../services/UserService");
class AuthenMiddleware {
  validateUser(req, res, next) {
    const validation = UserService.validateUser(req.body).error;
    console.log(validation);
    if (validation === undefined) next();
    else{
      return res.status(400).json(validation.details[0].message);
    }
  }
  validateAccount(req, res, next) {
    const validation = AuthenService.validateAccount(req.body);
    if (!validation?.error) next();
    else{
      return res.status(400).json("validate account error");
    }
  }
}

module.exports = new AuthenMiddleware();
