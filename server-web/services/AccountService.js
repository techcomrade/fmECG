const AccountModel = require("../models/AccountModel");
const CommonService = require("./CommonService");

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
  async register(account) {
    return await AccountModel.executeQuery(AccountModel.add(account));
  }
}

module.exports = new AccountService();
