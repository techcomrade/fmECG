const CommonService = require('./CommonService')
const Joi = require('joi')
const { convertArrayToString } = require('../utils/arrayUtils');
const UserModel = require('../models/UserModel/UserRepository');

class UserService extends CommonService {
    async getAll(){
        return await UserModel.getAllData();
    }
    
    validateUser(user) {
        const schema = Joi.object({
            username: Joi.string().required(),
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
            password: Joi.string().required(),
            birth: Joi.number().required(),
            phone_number: Joi.number(),
            image: Joi.string(),
            role: Joi.number().required(),
        })
        return schema.validate(user);
    }

    async getUserById(userId) {
        if(!userId) {
            return false;
        }
        return await UserModel.getUserById(userId);
    }

    async createUser(data) {
        return await UserModel.add(data);
    }

    async updateUser(data) {
        if(!data) {
            return false;
        }
        return await UserModel.updateById(data);
    }

    async deleteUserById(userId) {
        if(!userId) {
            return false;
        }
        return await UserModel.deleteById(userId);
    }
}

module.exports = new UserService()