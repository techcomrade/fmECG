const AuthenService = require("../services/AuthenService");
const TokenModel = require("../models/TokenModel");
const AccountModel = require("../models/AccountModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

class AuthenController {
  async register(req, res) {
    const account = req.body;
    if (account.email && account.password) {
      const checkExistEmail = await AuthenService.checkEmail(account.email);
      if (checkExistEmail) {
        return res.status(400).json("Email exist");
      } else {
        try {
          await AuthenService.register(account)
            .then(() => {
              return res.status(200).json({
                id: account.id,
                email: account.email,
                password: account.password,
              });
            })
            .catch((err) => {
              return res.status(500).json(err);
            });
        } catch (err) {
          return res.status(500).json(err);
        }
      }
    } else {
      return res.status(400).json("Register error");
    }
  }
  async login(req, res, next) {
    const account = req.body;
    const result = await AuthenService.checkAccount(account.email, account.password)
    console.log(result);
    if (result){
      try {
        await AuthenService.renderToken(account);
      }
      catch (err) {
        return res.status(404).json("Login error");
      }
    }
    else {
      return res.json("email not found");
    }
  }

  async getAllData(req, res) {
    const accounts = await AuthenService.getAll();
    if (accounts.length) {
      return res.status(200).json(accounts);
    } else {
      return res.status(400).json("Get accounts failed");
    }
  }
}

module.exports = new AuthenController();
