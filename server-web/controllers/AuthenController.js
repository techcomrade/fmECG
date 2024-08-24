const AuthenService = require("../services/AuthenService");
const RegisterService = require("../services/RegisterService");

class AuthenController {
  async login(req, res) {
    const account = req.body;
    const loginResult = await AuthenService.login(account);
    if (loginResult && loginResult.status === 400) {
      return res.status(400).json({
        message: loginResult.message,
      });
    }
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
      const checkExistEmail = await RegisterService.checkEmail(account.email);
      if (!checkExistEmail) {
        return res.status(400).json({
          message: "Email exist, please try again",
        });
      } else {
        try {
          await RegisterService.createRegister(account);
          return res.status(200).json({
            message: "Create register successfully",
          });
        } catch (err) {
          return res.status(500).json({
            message: "Create register error",
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

  async logout(req, res) {
    const account = req.body;
    try {
      await AuthenService.logout(account);
      return res.status(200).json({ message: "Logout successful" });
    } catch (err) {
      console.log(err);
      return res
        .status(400)
        .json({ message: "Logout failed", error: err.message });
    }
  }
}

module.exports = new AuthenController();
