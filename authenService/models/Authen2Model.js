const database = require('../config/database')
const CommonModel = require('./CommonModel')

class Authen2 extends CommonModel {

    getTableName() { return 'authen'; }
    getALLData() {
        return `SELECT * FROM user where delete_flag = 0`;
    }
    displaybyId(id) { 
        return `SELECT * FROM user where id = ${id} and delete_flag = 0`;
    }
    // findOnebyEmail(id){
    //     return `SELECT * FROM user where email = '${email}'`;
    // }
}

module.exports = new Authen2;