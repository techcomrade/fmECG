const CommonService = require("./CommonService");
const AccountModel = require("../models/AccountModel");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

class AuthenService extends CommonService {
  // async login(user) {}
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
