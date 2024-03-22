const CommonModel = require("./CommonModel");

class UserModel extends CommonModel {
  getAllData() {
    return `SELECT * FROM users`;
  }

  getUserById(id) {
    return `SELECT * FROM users WHERE id ='${id}'`;
  }

  add(user) {
    return `INSERT INTO users (id, account_id, username, birth, phone_number, image, role, created_at, updated_at) 
      VALUES ('${user.id}','${user.account_id}','${user.username}','${user.birth}','${user.phone_number}','${user.image}','${user.role}','${user.created_at}','${user.updated_at}')`
    ;
  }
  deleteById(id) {
    return `DELETE FROM users WHERE id ='${id}'`;
  }
  updateById(user) {
    return `UPDATE users SET account_id = '${user.account_id}', username = '${user.username}', birth = '${user.birth}', phone_number = '${user.phone_number}', image = '${user.image}', role = '${user.role}', updated_at = '${user.updated_at}' 
      WHERE id ='${id}'`;
  }
  checkUser(id){
    return `SELECT * FROM users WHERE id = '${id}';`;
  }
}

module.exports = new UserModel();
