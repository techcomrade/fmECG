const CommonService = require("../services/CommonService");

const RecordRepository = require("../models/RecordModel/RecordRepository");
const DeviceRepository = require("../models/DeviceModel/DeviceRepository");
const UserRepository = require("../models/UserModel/UserRepository");

const Joi = require("joi");

class StatisticService extends CommonService {
    async getAllUsers(){
        const users = await UserRepository.getAllData();
        const total = users.length;
        return total;
    }

    async getAllDevices(){
        const devices = await DeviceRepository.getAllData();
        const total = devices.length;
        return total;
    }

    async getAllRecords() {
        const records = await RecordRepository.getAllData();
        const total = records.length;
        return total;
    }
};

module.exports = new StatisticService();
