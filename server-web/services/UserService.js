const UserModel = require('../models/UserModel')
const CommonService = require('./CommonService')

class UserService extends CommonService {
    async getAll(){
        return await UserModel.executeQuery(UserModel.getAllData());
    }
}

module.exports = new UserService()