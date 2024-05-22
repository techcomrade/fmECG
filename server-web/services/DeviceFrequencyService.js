const CommonService = require('./CommonService');
const DeviceFreqRepository = require('../models/DeviceFrequencyModel/DeviceFrequencyRepository');

const { v4: uuidv4} = require("uuid");
const Joi = require("joi");

class DeviceFreqService extends CommonService {
    async getByDeviceId(deviceId){
        return await DeviceFreqRepository.checkByDeviceId(deviceId);
    }

    async updateById(deviceFreq, id) {
        deviceFreq.updated_at = Date.now();
        return DeviceFreqRepository.updateById(deviceFreq, id);
    }

    async deleteById(id) {
        return DeviceFreqRepository.deleteById(id);
    }

    async add(deviceFreq) {
        deviceFreq.id = uuidv4();
        deviceFreq.created_at = Date.now();
        return DeviceFreqRepository.add(deviceFreq);
    }

    async getById(id) {
        return DeviceFreqRepository.checkById(id);
    }

    validateDeviceFreq(deviceFreq, checkId){
        const schema = Joi.object({
            id: (checkId) ? Joi.string().required() : Joi.string().allow(' '),
            device_id: Joi.string().required(),
            frequency_name: Joi.string().required(),
            information: Joi.string(),
            value: Joi.number().min(0).required(),
            dummy_data: Joi.boolean()
        })
        return schema.validate(deviceFreq);
    }
};

module.exports = new DeviceFreqService();