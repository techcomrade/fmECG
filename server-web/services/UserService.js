const UserModel = require('../models/UserModel');
const { convertArrayToString } = require('../utils/arrayUtils');
const CommonService = require('./CommonService')

class UserService extends CommonService {
    async getAll(){
        return await UserModel.executeQuery(UserModel.getAllData());
    }

    async getUserById(userId) {
        if(!userId) {
            return false;
        }
        return await UserModel.executeQuery(UserModel.getUserById(userId));
    }

    async createUser(data) {
        return await UserModel.executeQuery(UserModel.add(data));
    }

    async updateUser(data, userId) {
        if(!data || !userId) {
            return false;
        }
        return await UserModel.executeQuery(UserModel.updateById(data, userId))
    }

    // async deleteUserById(userId) {
    //     const foundUser = await this.getUserById(userId);
    //     if(!foundUser) {
    //         return false
    //     }
    //     return await UserModel.executeQuery(UserModel.deleteById(userId))
    // }

    async deleteUserById(arrayId) {
        if(!arrayId) {
            return false;
        }

        if(arrayId.length === 1) {
            return await UserModel.executeQuery(UserModel.deleteById(arrayId[0]));
        }
        else {
            return await UserModel.executeQuery(UserModel.deleteByMultipleId(convertArrayToString(arrayId)));
        }
    }
}

module.exports = new UserService()