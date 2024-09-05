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
// const RedisService = require("./RedisService");

class AuthenService extends CommonService {
  async login(account) {
    try{
      await RedisService.autoDeleteExpiredToken();
    }catch(error){
      console.log(error);
    }

    try{
      await TokenService.autoDeleteExpiredToken();
    }catch(error){
      console.log(error);
    }
    
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
          account_id: accountInfo.dataValues.account_id,
          role: accountInfo.dataValues.role
        }
        const access_token = TokenService.renderToken(userInfo, 0.2);
        const refresh_token = TokenService.renderToken(
          userInfo,
          5
        );

        var token = {
          id: uuidv4(),
          account_id: accountInfo.dataValues.account_id,
          access_token: access_token,
          refresh_token: refresh_token,
          expires_at: Number(new Date()) + expiredTime,
          created_at: Number(new Date()),
        };
        try{
          await TokenRepository.addTokenToDb(token);

        }catch(error){
          console.log(error);
        }

        // try{
        //   await RedisService.addTokenToRedis(token);
        // }catch(error){
        //   console.log(error);
        // }
        
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
    
    const user = {
        id: uuidv4(),
        account_id: account.account_id,
        username: account.username,
        birth: account.birth,
        gender: account.gender,
        phone_number: account.phone_number,
        image: account.image,
        status: checkRegister ? 0 : account.status,
        information: account.information,
        role: account.role,
    };
    
    try {
        await this.transaction(async (t) => {
            await AccountRepository.add(account, t);
            await UserRepository.add(user, t);
            if (checkRegister) await RegisterService.deleteById(registerId, t);
        });
        console.log('Transaction successful.');
    } catch (error) {
        console.error('Transaction failed:', error);
        throw error; 
    }
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

  async refreshToken(refresh_token) {
    // const newAccessToken = await TokenService.refreshToken(refresh_token, 5);
      // if (!newAccessToken) {
      //   return res.status(401).json({ message: "Unauthorized2" });
      // }
      // return res.status(200).json({ 
      //   message:'Refresh token successfully',
      //   access_token: newAccessToken
      // });
  }
}
module.exports = new AuthenService();
