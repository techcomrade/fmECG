const CommonModel = require('./commonModel');

class AccountModel extends CommonModel {
    async register(dataInsert, date) {
        return await this.queryDB(
            `INSERT INTO account (id, email, password, create_time) VALUES ('${dataInsert.id}', '${dataInsert.email}', '${dataInsert.password}', '${date}')`
        )
    }
    async checkDuplicate(email) {
        const result = await this.queryDB(
            `SELECT * FROM account WHERE email = '${email}'`
        )
        return result.length > 0
    }
}    

module.exports = new AccountModel();