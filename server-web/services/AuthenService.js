const CommonService = require("./CommonService");
const AccountModel = require("../models/AccountModel");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const TokenModel = require("../models/TokenModel");

class AuthenService extends CommonService {
  async checkAccount(email, password) {
    const account = await AccountModel.executeQuery(
      AccountModel.checkExistEmail(email)
    );
    try {
      const compare = await bcrypt.compare(password, account[0].password);
      if (compare) {
        return true;
      } else return false;
    } catch (err) {
      return err;
    }
  }

  async renderToken(account) {
    const accessToken = jwt.sign(
      {
        id: account.id,
      },
      process.env.JWT_KEY,
      {
        expiresIn: 30 * 100,
      }
    );
    const refreshToken = jwt.sign(
      {
        id: account.id,
      },
      process.env.JWT_REFRESH_KEY,
      {
        expiresIn: 24 * 60 * 60 * 1000,
      }
    );
    return await TokenModel.executeQuery(
      TokenModel.add({
        id: uuidv4(),
        account_id: account.id,
        access_token: accessToken,
        refresh_token: refreshToken,
        created_at: Date.now(),
        updated_at: Date.now(),
      })
    );
  }

  async checkEmail(email) {
    const emails = await AccountModel.executeQuery(
      AccountModel.checkExistEmail(email)
    );
    return emails.length > 0;
  }
  async register(account) {
    account.id = uuidv4();
    account.password = await bcrypt.hash(account.password, 10);
    return await AccountModel.executeQuery(AccountModel.add(account));
  }
  async getAll() {
    return await AccountModel.executeQuery(AccountModel.getAllData());
  }
}
module.exports = new AuthenService();
