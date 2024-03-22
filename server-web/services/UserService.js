const UserModel = require('../models/UserModel')
const CommonService = require('./CommonService')
const Joi = require('joi')

class UserService extends CommonService {
    async getAll(){
        return await UserModel.executeQuery(UserModel.getAllData());
    }
    validation(account) {
        const schema = Joi.object({
            username: Joi.string().required(),
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
            password: Joi.string().required(),
            repeat_password: Joi.ref('password'),
            birth: Joi.number().required(),
            phone_number: Joi.number(),
            image: Joi.string(),
            role: Joi.number().required(),
        })
        return schema.validate(account);
    }
    async checkUser(id){
        return await UserModel.executeQuery(UserModel.checkUser(id));
    }
}

module.exports = new UserService()