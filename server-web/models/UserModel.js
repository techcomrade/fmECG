const CommonModel = require("./CommonModel");

class UserModel extends CommonModel{
    async getAllData(){
        return await this.executeQuery(`SELECT * FROM users`);
    }

    // async register(dataInsert){
    //     return await this.executeQuery(`INSERT INTO account (id, email, pass, create_time) VALUES ('${dataInsert.id}', '${dataInsert.email}', '${dataInsert.pass}', '${dataInsert.create_time}')`)
    // }
    async add(){
        
    }
}


module.exports = new UserModel();

