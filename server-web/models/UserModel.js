const CommonModel = require("./CommonModel");

class UserModel extends CommonModel{
    async getAllData(){
        return await this.executeQuery("SELECT * FROM nguoi_dung");
    }
}