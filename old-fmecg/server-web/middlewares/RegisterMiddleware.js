const RegisterService = require("../services/RegisterService");

class RegisterMiddleware {
  async validateRegister(req, res, next) {
    console.log(`[V]:::Validate Register data`, req.body);
    let validated = RegisterService.validateRegister(req.body).error;
    if (!validated) next();
    else
      return res.status(401).json({
        message: `invalid request: ${validated.details[0].message}`,
      });
  }
}

module.exports = new RegisterMiddleware();
