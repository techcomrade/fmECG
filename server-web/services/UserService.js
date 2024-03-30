const CommonService = require('./CommonService')
const Joi = require('joi')
const UserRepository = require('../models/UserModel/UserRepository');
const AccountRepository = require("../models/AccountModel/AccountRepository");
const TokenRepository = require("../models/TokenModel/TokenRepository");
const DeviceRepository = require("../models/DeviceModel/DeviceRepository");
const RecordRepository = require("../models/RecordModel/RecordRepository");
const BloodPressureRepository = require("../models/BloodPressureModel/BloodPressureRepository");
const HeartRecRepository = require("../models/HeartRecModel/HeartRecRepository");
const PatientDoctorAssignmentRepository = require("../models/PatientDoctorAssignModel/PatientDoctorAssignmentRepository");

class UserService extends CommonService {
    async getAll(){
        return await UserRepository.getAllData();
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
    validateUpdateUser(user){
        const schema = Joi.object({
            username: Joi.string().required(),
            birth: Joi.number().required(),
            phone_number: Joi.number(),
            image: Joi.string(),
        })
        return schema.validate(user);
    }

    async getUserById(userId) {
        if(!userId) {
            return false;
        }
        return await UserRepository.getUserById(userId);
    }

    async createUser(data) {
        return await UserRepository.add(data);
    }

    async updateUser(data) {
        return await UserRepository.updateById(data);
    }

    async deleteUserById(userId) {
        await this.transaction(async (t) =>{
            
        })
    }
}

module.exports = new UserService()