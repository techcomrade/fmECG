
const CommonModel = require("./CommonModel");

class AccountModel extends CommonModel {
  async insertToken(dataInsert) {
    return await this.executeQuery(
      `INSERT INTO token (id, token, create_time, delete_flag) VALUES ('${dataInsert.id}', '${dataInsert.token}', '${dataInsert.create_time}', '${dataInsert.delete_flag}')`
    );
  }
  async checkExistEmail(email){
    const emails = await this.executeQuery(
        `SELECT COUNT(*) FROM account WHERE email = '${email}'`
    )
    return emails[0]['COUNT(*)'] > 0; 
  }
  async findByEmail(email){
    return await this.executeQuery(`SELECT * FROM account WHERE email = '${email}'`);
  }
}

module.exports = new AccountModel();
