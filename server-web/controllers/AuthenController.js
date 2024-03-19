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
    await AccountModel.executeQuery(
      AccountModel.checkExistEmail(req.body.email)
    )
      .then((account) => {
        if (account[0]) {
          bcrypt.compare(req.body.password, account[0].password, (err, same) => {
            if (err) throw err;
            if (same) {
              const accessToken = jwt.sign(
                {
                  id: account[0].id
                },
                process.env.JWT_KEY,
                {
                  expiresIn: 30 * 100,
                }
              );
              const refreshToken = jwt.sign(
                {
                  id: account[0].id
                },
                process.env.JWT_REFRESH_KEY,
                {
                  expiresIn: 24 * 60 * 60 * 1000,
                }
              );
              TokenModel.executeQuery(TokenModel.add({
                id: uuidv4(),
                account_id: account[0].id,
                access_token: accessToken,
                refresh_token: refreshToken,
                created_at: Date.now(),
                updated_at: Date.now()
              }));
              res.status(200).json({
                id: uuidv4(),
                account_id: account[0].id,
                access_token: accessToken,
                refresh_token: refreshToken,
                created_at: Date.now(),
                updated_at: Date.now(),
                message: "Token added successfully"
              });
            }
          });
        }
      })

      .catch((err) => {
        console.log(err);
        res.status(403).json({ message: err });
      });
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
