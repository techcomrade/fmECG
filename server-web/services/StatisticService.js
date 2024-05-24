const CommonService = require("./CommonService");
const DeviceRepository = require("../models/DeviceModel/DeviceRepository");
const UserRepository = require("../models/UserModel/UserRepository");
const RecordRepository = require("../models/RecordModel/RecordRepository");

class StatisticService extends CommonService {
    async getStatistics(){
        const device = await DeviceRepository.countDevice();
        const user = await UserRepository.countUser();
        const record = await RecordRepository.countRecord();

        return {
            device_count: device,
            user_count: user,
            record_count: record,
        }
    }
};

module.exports = new StatisticService();