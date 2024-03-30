const CommonService = require("./CommonService");
const AccountRepository = require("../models/AccountModel/AccountRepository");
const UserRepository = require("../models/UserModel/UserRepository");
const TokenRepository = require("../models/TokenModel/TokenReponsitory");
const TokenService = require("./TokenService");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const { v4: uuidv4 } = require("uuid");

class AuthenService extends CommonService {
  async login(account) {
    try {
      const accountData = await AccountRepository.getAccountByEmail(
        account.email
      );
      if (accountData?.dataValues) {
        const result = bcrypt.compare(
          account.password,
          accountData.dataValues.password
        );
        if (!result) return result;
        var token = {
          id: uuidv4(),
          account_id: accountData.dataValues.id,
          access_token: TokenService.renderToken(accountData.dataValues.id, 60),
          refresh_token: TokenService.renderToken(
            accountData.dataValues.id,
            120
          ),
          created_at: Number(new Date()),
        };
        await TokenRepository.add(token);
        return true;
      }
      return false;
    } catch (e) {
      console.log("login error", e);
      return false;
    }
  }
  async checkEmail(email) {
    const emails = await AccountRepository.getAccountByEmail(email);
    return emails === null;
  }
  async register(account) {
    account.id = uuidv4();
    account.password = await bcrypt.hash(account.password, 10);
    const user = {
      id: uuidv4(),
      account_id: account.id,
      username: account.username,
      birth: account.birth,
      phone_number: account.phone_number,
      image: account.image,
      role: account.role,
    };
    await this.transaction(async (t) => {
      await AccountRepository.add(account, t);
      await UserRepository.add(user, t);
    });
  }
  async getAll() {
    await AccountRepository.getAllData();
  }
  validateAccount(account) {
    const schema = Joi.object({
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
      password: Joi.string().required(),
    });
    return schema.validate(account);
  }
}
module.exports = new AuthenService();
