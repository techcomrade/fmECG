const database = require('../config/database');
const CommonModel = require('./CommonModel');

class User extends CommonModel {

    getTableName() { return 'users'; }
    getAllData() {
        return `SELECT * FROM user WHERE delete_flag = 0`;
    }
    displayById(id) {
        return `SELECT * FROM user WHERE id = ${id} and delete_flag = 0`;
    }
    findOneById(email) {
        return `SELECT * FROM user WHERE email = ${email} and delete_flag = 0`;
    }
}

module.exports = new User;