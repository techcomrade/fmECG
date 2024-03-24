const UserService = require("../services/UserService");
class AuthenMiddleware {
  validateUser(req, res, next) {
    const validation = UserService.validateUser(req.body).error;
    if (validation === undefined) next();
    else {
      return res.status(400).json(validation.details[0].message);
    }
  }
}

module.exports = new AuthenMiddleware();
