const AccountDTO = require('./AccountDTO');

const CommonModel = require("./../CommonModel");

class AccountRepository extends CommonModel {
  async getAllData() {
    return await AccountDTO.findAll();
  }
  async add(account){
    return await AccountDTO.create({
        id: account.id,
        email: account.email,
        password: account.password,
    })
  }
  async deleteById(id) {
    return await AccountDTO.destroy();
  }
  updateById(account) {
    return `UPDATE accounts SET email = '${account.email}', password = '${account.password}' WHERE id ='${id}'`;
  }
  checkExistEmail(email) {
    return `SELECT * FROM accounts WHERE email = '${email}'`;
  }
}

module.exports = new AccountRepository();
