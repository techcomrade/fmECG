const database = require('../config/database');
const CommonModel = require('./CommonModel');

class User extends CommonModel {

    getTableName() { return 'users'; }
    getAllData() {
        return `SELECT * FROM account WHERE delete_flag = 0`;
    }
    displayById(id) {
        return `SELECT * FROM account WHERE id = ${id} and delete_flag = 0`;
    }
    findOneById(id) {
        return `SELECT * FROM account WHERE id = ${id}`;
    }
}

module.exports = new User;