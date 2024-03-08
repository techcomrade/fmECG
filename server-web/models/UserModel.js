const CommonModel = require("./CommonModel");

class UserModel extends CommonModel{
    async getAllData(){
        return await this.executeQuery(`SELECT * FROM account`);
    }
    async findByEmail(email){
        return await this.executeQuery(`SELECT * FROM account WHERE email = '${email}'`);
    }
    async register(dataInsert){
        return await this.executeQuery(`INSERT INTO account (id, email, password, create_time) VALUES ('${dataInsert.id}', '${dataInsert.email}', '${dataInsert.password}', '${dataInsert.create_time}')`)
    }
    async checkExistEmail(email){
        const emails = await this.executeQuery(
            `SELECT COUNT(*) FROM account WHERE email = '${email}'`
        )
        return emails[0]['COUNT(*)'] > 0; 
    }
}

module.exports = new UserModel();