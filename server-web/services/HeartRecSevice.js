const CommonService = require('../services/CommonService');
const HeartRecModel = require('../models/HeartRecModel/HeartRecRepository');
const Joi = require("joi");
const { v4: uuidv4} = require("uuid");

class HeartRecService extends CommonService {
    async add(heart_rec) {
        heart_rec.id = uuidv4();
        return await HeartRecModel.add(heart_rec);
    }
    async deleteById(id) {
        return await HeartRecModel.deleteById(id);
    }
    async getAllData() {
        return await HeartRecModel.getAllData();
    }
    async getHeartRecByEmail(email) {
        return await HeartRecModel.getHeartRecByEmail(email);
    }
    ValidateHeartRec(heart_rec) {
        const schema = Joi.object({
            id: Joi.string().required(),
            rec_id: Joi.string().required().ref('id'), 
        })
        return schema.validate(heart_rec);
    }
}

module.exports = new HeartRecService();