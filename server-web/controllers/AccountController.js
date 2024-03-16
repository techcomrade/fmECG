const AccountService = require("../services/AccountService");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

class AccountController {
  async register(req, res) {
    const account = req.body;
    if (account.email && account.password) {
      const checkExistEmail = await AccountService.checkEmail(account.email);
      if (checkExistEmail) {
        return res.status(400).json("Email exist");
      } else {
        try {
          account.id = uuidv4();
          account.password = await bcrypt.hash(account.password, 10);
          AccountService.register(account)
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
  async getAll(req, res) {
    const accounts = await AccountService.getAll();
    if(accounts.length) {
      return res.status(200).json(accounts);
    }
    else {
      return res.status(400).json("get users failed");
    }
  }
}

module.exports = new AccountController();
