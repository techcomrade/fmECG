const AuthenService = require("../services/AuthenService");

class AuthenController {
  async login(req, res) {
    const account = req.body;
    const loginResult = await AuthenService.login(account);
    return loginResult
      ? res.status(200).json({
          message: "login successfully",
          metadata: loginResult,
        })
      : res.status(400).json({
          message: "login failed",
        });
  }

  async register(req, res) {
    const account = req.body;
    if (account.email && account.password) {
      const checkExistEmail = await AuthenService.checkEmail(account.email);
      if (!checkExistEmail) {
        return res.status(400).json({
          message: "Email exist, please try again",
        });
      } else {
        try {
          await AuthenService.register(account);
          return res.status(200).json({
            message: "Register successfully",
          });
        } catch (err) {
          return res.status(500).json({
            message: "Register error",
          });
        }
      }
    }
  }

  async getAllData(req, res) {
    await AuthenService.getAll()
      .then((data) => {
        return res.status(200).json(data);
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).json("Get accounts failed");
      });
  }
}

module.exports = new AuthenController();
