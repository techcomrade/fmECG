const CommonService = require("./CommonService");
const DeviceRepository = require("../models/DeviceModel/DeviceRepository");
const UserRepository = require("../models/UserModel/UserRepository");
const RecordRepository = require("../models/RecordModel/RecordRepository");

class StatisticService extends CommonService {
    async getStatistics(){
        const device = await DeviceRepository.count();
        const user = await UserRepository.count();
        const record = await RecordRepository.count();
        const countNewRecordInMonth = await RecordRepository.countNewRecordInMonth();

        return {
            device_count: device,
            user_count: user,
            record_count: record,
            countNewRecordInMonth: countNewRecordInMonth
        }
    }
};

module.exports = new StatisticService();