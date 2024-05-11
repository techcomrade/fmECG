const CommonService = require("./CommonService");
const Joi = require("joi");
const UserRepository = require("../models/UserModel/UserRepository");
const DeviceRepository = require("../models/DeviceModel/DeviceRepository");
const RecordRepository = require("../models/RecordModel/RecordRepository");
const AuthenService = require("./AuthenService");

class UserService extends CommonService {
  async getAll() {
    const data = await UserRepository.getAllData();
    const dataUpdate = await Promise.all(
      data.map(async (user) => {
        const deviceUser = await DeviceRepository.checkByUserId(user.id);
        return {
          ...user,
          devices: deviceUser.length,
        };
      })
    );
    return dataUpdate;
  }

  validateUser(user) {
    const schema = Joi.object({
      username: Joi.string().required(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
      password: Joi.string().required(),
      birth: Joi.number().required(),
      phone_number: Joi.number().allow(""),
      image: Joi.string().allow(""),
      role: Joi.number().required(),
    });
    return schema.validate(user);
  }
  validateUpdateUser(user) {
    const schema = Joi.object({
      username: Joi.string().required(),
      birth: Joi.number().required(),
      phone_number: Joi.number(),
      image: Joi.string(),
    });
    return schema.validate(user);
  }

  async getUserById(userId) {
    if (!userId) {
      return false;
    }
    const data = await UserRepository.getUserById(userId);
    const deviceUser = await DeviceRepository.checkByUserId(userId);
    const recordUser = await RecordRepository.getRecordByUserId(userId)
    data[0].dataValues = {
      ...data[0].dataValues,
      devices: deviceUser.length,
      records: recordUser.length,
    };
    return data;
  }

  async createUser(data) {
    return await UserRepository.add(data);
  }

  async updateUser(data) {
    const { password, ...newData } = data;
    return await this.transaction(async (t) => {
      await AuthenService.updatePassword({
        password: password,
        id: data.account_id,
      },t);
      await UserRepository.updateById(newData,t);
    });
  }

  async deleteUserById(userId) {
    return await UserRepository.deleteById(userId);
  }
}

module.exports = new UserService();
