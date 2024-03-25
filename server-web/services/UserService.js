const UserModel = require('../models/UserModel')
const CommonService = require('./CommonService')
const Joi = require('joi')
const { convertArrayToString } = require('../utils/arrayUtils');

class UserService extends CommonService {
    async getAll(){
        return await UserModel.executeQuery(UserModel.getAllData());
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
    
    async checkUser(id){
        return await UserModel.executeQuery(UserModel.checkUser(id));
    }

    async getUserById(userId) {
        if(!userId) {
            return false;
        }
        return await UserModel.executeQuery(UserModel.getUserById(userId));
    }

    async createUser(data) {
        return await UserModel.executeQuery(UserModel.add(data));
    }

    async updateUser(data, userId) {
        if(!data || !userId) {
            return false;
        }
        return await UserModel.executeQuery(UserModel.updateById(data, userId))
    }

    async deleteUserById(arrayId) {
        if(!arrayId) {
            return false;
        }

        if(arrayId.length === 1) {
            return await UserModel.executeQuery(UserModel.deleteById(arrayId[0]));
        }
        else {
            return await UserModel.executeQuery(UserModel.deleteByMultipleId(convertArrayToString(arrayId)));
        }
    }
}

module.exports = new UserService()