
const CommonModel = require("./CommonModel");

class AccountModel extends CommonModel {
  getAllData() {
    return `SELECT * FROM accounts`;
  }
  add(account) {
    return `INSERT INTO accounts (id, email, password) 
      VALUES ('${account.id}', '${account.email}', '${account.password}')`
  }
  deleteById(id) {
    return `DELETE FROM accounts WHERE id ='${id}'`;
  }
  updateById(account) {
    return `UPDATE accounts SET email = '${account.email}', password = '${account.password}' WHERE id ='${id}'`
  }
}

module.exports = new AccountModel();
