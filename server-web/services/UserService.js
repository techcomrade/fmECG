const UserModel = require('../models/UserModel')
const CommonService = require('./CommonService')

class UserService extends CommonService {
    async getAll(){
        return await UserModel.executeQuery(UserModel.getAllData());
    }

    async getUserById(userId) {
        return await UserModel.executeQuery(UserModel.getUserById(userId));
    }

    async createUser(data) {
        return await UserModel.executeQuery(UserModel.add(data));
    }

    async updateUser(data, userId) {
        return await UserModel.executeQuery(UserModel.updateById(data, userId))
    }

    async deleteUserById(userId) {
        const foundUser = await this.getUserById(userId);
        if(!foundUser) {
            return false
        }
        return await UserModel.executeQuery(UserModel.deleteById(userId))
    }
}

module.exports = new UserService()