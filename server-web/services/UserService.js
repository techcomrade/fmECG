const UserModel = require('../models/UserModel')
const CommonService = require('./CommonService')

class UserService extends CommonService {
    async getAll(){
        return await UserModel.executeQuery(UserModel.getAllData());
    }
    async checkUser(id){
        return await UserModel.executeQuery(UserModel.checkUser(id));
    }
}

module.exports = new UserService()