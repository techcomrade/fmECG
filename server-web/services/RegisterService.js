const CommonService = require("./CommonService");
const RegisterModel = require("../models/RegisterModel/RegisterRepository");
const { v4: uuidv4 } = require("uuid");
const Joi = require("joi");
const bcrypt = require("bcrypt");

class RegisterService extends CommonService {
  async getAllData() {
    return await RegisterModel.getAllData();
  }

  async getById(id) {
    return await RegisterModel.getUserById(id);
  }

  async createRegister(user) {
    user.id = uuidv4();
    user.password = await bcrypt.hash(user.password, 10);
    user.created_at = Date.now();
    return await RegisterModel.add(user);
  }

  async checkEmail(email) {
    const emails = await RegisterModel.getRegisterByEmail(email);
    return emails === null;
  }

  validateRegister(user) {
    const schema = Joi.object({
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
      password: Joi.string().required(),
      username: Joi.string().required(),
      gender: Joi.number().integer().required(),
      birth: Joi.number().integer().required(),
      phone_number: Joi.string().required(),
      image: Joi.string(),
      status: Joi.number().integer().required(),
      information: Joi.string(),
      role: Joi.number().integer().required(),
    });
    return schema.validate(user);
  }

  async deleteById(id) {
    return await RegisterModel.deleteById(id);
  }

  async updateById(user) {
    return await RegisterModel.updateById(user);
  }
}

module.exports = new RegisterService();
