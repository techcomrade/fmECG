const CommonService = require("./CommonService");
const AccountRepository = require("../models/AccountModel/AccountRepository");
const UserRepository = require("../models/UserModel/UserRepository");
const RegisterRepository = require("../models/RegisterModel/RegisterRepository");
const TokenRepository = require("../models/TokenModel/TokenRepository");
const RegisterService = require("../services/RegisterService");
const TokenService = require('./TokenService');
const bcrypt = require("bcrypt");
const Joi = require("joi");
const { v4: uuidv4 } = require("uuid");

class AuthenService extends CommonService {
  async login(account) {
    await TokenService.autoDeleteExpiredTokens();
    const expiredTime = 120 * 1800;
    try {
      const accountData = await AccountRepository.getAccountByEmail(
        account.email
      );
      if (accountData?.dataValues) {
        const result = await bcrypt.compare(
          account.password,
          accountData.dataValues.password
        );
        if (!result) return result;
        const accountInfo = await UserRepository.getUserByAccountId(accountData.dataValues?.id)
        if (!accountInfo) return false;
        const userInfo = {
          id: accountInfo.dataValues.id,
          role: accountInfo.dataValues.role
        }
        const access_token = TokenService.renderToken(userInfo, 0.1);
        const refresh_token = TokenService.renderToken(
          userInfo,
          12
        );
        var token = {
          id: uuidv4(),
          account_id: accountData.dataValues.id,
          access_token: access_token,
          refresh_token: refresh_token,
          created_at: Number(new Date()),
        };
        await TokenRepository.add(token);
        
        return {...accountInfo.dataValues,
        access_token: access_token,
        refresh_token: refresh_token,
        expired_time: expiredTime
        };
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
  async register(account, checkRegister) {
    const registerId = account.id;
    account.id = uuidv4();
    account.password = checkRegister ? account.password : await bcrypt.hash(account.password, 10);
    console.log(account);
    const user = {
      id: uuidv4(),
      account_id: account.id,
      username: account.username,
      birth: account.birth,
      gender: account.gender,
      phone_number: account.phone_number,
      image: account.image,
      status: checkRegister ? 0 : account.status,
      information: account.information,
      role: account.role,
    };
    await this.transaction(async (t) => {
      await AccountRepository.add(account, t);
      await UserRepository.add(user, t);
      if(checkRegister) await RegisterService.deleteById(registerId);
    });
  }

  async getAll() {
    return await AccountRepository.getAllData();
  }

  async updatePassword (account){
    return await AccountRepository.updateById(account);
  }

  async getAccountById(id) {
    return await AccountRepository.getAccountById(id);
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

  async logOut() {
    
  }
}
module.exports = new AuthenService();
