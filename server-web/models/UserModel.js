const database = require('../config/database');
const CommonModel = require('./CommonModel');

class UserModel extends CommonModel {

    // getTableName() { return 'users'; }
    async getAllData() {
        return await this.executeQuery("SELECT * FROM nguoi_dung");
    }
    async displayById(id) {
        return await this.executeQuery("SELECT * FROM account WHERE id = ${id} and delete_flag = 0");
    }
    async findOneById(id) {
        return await this.executeQuery("SELECT * FROM account WHERE id = ${id}");
    }
}

module.exports = new UserModel;