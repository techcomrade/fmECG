const AuthenService = require("../services/AuthenService");

class AuthenController {
  async login(req, res) {
    const account = req.body;
    const loginResult = await AuthenService.login(account);
    return loginResult
      ? res.status(200).json("login successfully")
      : res.status(400).json("login failed");
  }
  async register(req, res) {
    const account = req.body;
    if (account.email && account.password) {
      const checkExistEmail = await AuthenService.checkEmail(account.email);
      if (!checkExistEmail) {
        return res.status(400).json("Email exist");
      } else {
        try {
          await AuthenService.register(account);
          return res.status(200).json("Register successfully");
        } catch (err) {
          console.log("controler: ", err);
          return res.status(500).json("Register error");
        }
      }
    } else {
      return res.status(400).json("Register error");
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
