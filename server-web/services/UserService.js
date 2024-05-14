const CommonService = require("./CommonService");
const Joi = require("joi");
const UserRepository = require("../models/UserModel/UserRepository");
const DeviceRepository = require("../models/DeviceModel/DeviceRepository");
const RecordRepository = require("../models/RecordModel/RecordRepository");
const { v4: uuidv4 } = require("uuid");

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
      account_id: Joi.string().required(),
      username: Joi.string().required(),
      birth: Joi.number().required(),
      phone_number: Joi.number().allow(""),
      gender: Joi.number(),
      image: Joi.string().allow(""),
      role: Joi.number().required(),
    });
    return schema.validate(user);
  }

  validateUpdateUser(user) {
    const schema = Joi.object({
      id: Joi.string().required(),
      username: Joi.string().required(),
      birth: Joi.number().required(),
      phone_number: Joi.number().required(),
      gender: Joi.number().required(),
      image: Joi.string()
    });
    return schema.validate(user);
  }

  async getUserById(userId) {
    if (!userId) {
      return false;
    }
    const data = await UserRepository.getUserById(userId);
    if(!data[0]) {
      return false;
    }
    const deviceUser = await DeviceRepository.checkByUserId(userId);
    const recordUser = await RecordRepository.getRecordByUserId(userId);
    data[0].dataValues = {
      ...data[0]?.dataValues,
      devices: deviceUser.length,
      records: recordUser.length,
    };
    return data;
  }

  async createUser(data) {
    data.id = uuidv4();
    return await UserRepository.add(data);
  }

  async updateUser(data) {
    return await this.transaction(async (t) => {
      await UserRepository.updateById(data, t);
    });
  }

  async deleteUserById(userId) {
    return await UserRepository.deleteById(userId);
  }
}

module.exports = new UserService();
