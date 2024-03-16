const AccountModel = require("../models/AccountModel");
const CommonService = require("./CommonService");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

class AccountService extends CommonService {
  async getAll() {
    return await AccountModel.executeQuery(AccountModel.getAllData());
  }
  async checkEmail(email) {
    const emails = await AccountModel.executeQuery(
      AccountModel.checkExistEmail(email)
    );
    return emails.length > 0; 
  }
  renderID() {
    return uuidv4();
  }
  async hashPassword(password) {
    return await bcrypt.hash(password, 10);
  }
  async register(account) {
    return await AccountModel.executeQuery(AccountModel.add(account));
  }
}

module.exports = new AccountService();
