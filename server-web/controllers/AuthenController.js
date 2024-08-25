const AuthenService = require("../services/AuthenService");
const RegisterService = require("../services/RegisterService");
const TokenService = require("../services/TokenService");

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

  async refreshToken(req, res) {
    const refresh_token = req.body.refresh_token;
    if (!refresh_token) {
      return res.status(401).json({ message: "Unauthorized." });
    }

    try{
      const access_token = await TokenService.refreshToken(refresh_token);
      if (!access_token) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      return res.status(200).json({ 
        message:'Refresh token successfully',
        access_token: access_token
      });
    } 
    catch (err) {
      return res.status(401).json({ message: "Failed to refresh token." });
    }
  }
}

module.exports = new AuthenController();
