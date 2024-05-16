const AuthenService = require("../services/AuthenService");
const UserService = require("../services/UserService");

class UserMiddleware {
    async validateCreateData(req, res, next) {
        console.log('[V]:::Validate Create Device : ');
        let validated = UserService.validateUser(req.body).error;
        if (!validated) {
          const account = await AuthenService.getAccountById(req.body.account_id);
          if (!account)
            return res.status(401).json({
              message: "Not authorized!",
            });
          next()
        }
        else
          return res
            .status(500)
            .json({
              message: `invalid request: ${validated.details[0].message}`,
            });
    }

    async validateUpdateData(req, res, next) {
      console.log('[V]:::Validate Update User: ')
      let validated = UserService.validateUpdateUser(req.body).error;
      if (!validated) next();
      else
        return res
          .status(500)
          .json({
            message: `invalid request: ${validated.details[0].message}`,
          });
    }

    async checkUserId(req, res, next) {
        const user = await UserService.getUserById(req.body.id);
        if (!user)
          return res.status(404).json({
            message: "User not existed!",
          });
        next();
      }

  }
  
  module.exports = new UserMiddleware();