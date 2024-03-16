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
        const foundUser = await this.getUserById(data.id);
        if(foundUser) {
            
        }
        return await UserModel.executeQuery(UserModel.add(data));
    }

    async updateUser(data) {
        const foundUser = await this.getUserById(data.id);
        if(!foundUser) {

        }
        return await UserModel.executeQuery(UserModel.updateById(data))
    }

    async deleteUserById(userId) {
        const foundUser = await this.getUserById(userId);
        if(!foundUser) {

        }
        return await UserModel.executeQuery(UserModel.deleteById(userId))
    }
}

module.exports = new UserService()