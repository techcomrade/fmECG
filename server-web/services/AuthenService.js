const CommonService = require("./CommonService");
const AccountModel = require("../models/AccountModel");
const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

class AuthenService extends CommonService {
  async login(user) {}
  async checkEmail(email) {
    const emails = await AccountModel.executeQuery(
      AccountModel.checkExistEmail(email)
    );
    return emails.length > 0;
  }
  async register(account, user) {
    account.id = uuidv4();
    account.password = await bcrypt.hash(account.password, 10);
    user.id = uuidv4();
    user.password = account.password;
    user.account_id = account.id;
    user.birth = Number(new Date(user.birth));
    user.created_at = Number(new Date());
    user.updated_at = Number(new Date());
    await AccountModel.executeQuery(AccountModel.add(account));
    await UserModel.executeQuery(UserModel.add(user));
  }
  async getAll() {
    return await AccountModel.executeQuery(AccountModel.getAllData());
  }
}
module.exports = new AuthenService();
