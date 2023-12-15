const database = require('../config/database')
const CommonModel = require('./CommonModel')

class User extends CommonModel {

    getTableName() { return 'user'; }
    getALLData() {
        return `SELECT * FROM user where delete_flag = 0`;
    }
    displaybyId(id) { 
        return `SELECT * FROM user where id = ${id} and delete_flag = 0`;
    }
    findOnebyEmail(Email){
        return `SELECT * FROM user where email = '${Email}'`;
    }
}

module.exports = new User;