const CommonModel = require("./CommonModel");

class UserModel extends CommonModel{
    async getAllData(){
        return await this.executeQuery("SELECT * FROM account");
    }
    async findByEmail(email){
        return await this.executeQuery(`SELECT * FROM account WHERE email = '${email}'`);
    }
}

module.exports = new UserModel();