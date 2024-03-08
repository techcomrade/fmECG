const { insertDatatoDB } = require("../../server/models/Authen2Model");
const CommonModel = require("./CommonModel");

class AuthenModel extends CommonModel {
  async insertToken(dataInsert) {
    return await this.executeQuery(
      `INSERT INTO token (id, token, create_time, delete_flag) VALUES ('${dataInsert.id}', '${dataInsert.token}', '${dataInsert.create_time}', '${dataInsert.delete_flag}')`
    );
  }
  async getAllData(){
    return await this.executeQuery(`SELECT * FROM token`);
}
}

module.exports = new AuthenModel();
