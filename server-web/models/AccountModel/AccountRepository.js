const AccountDTO = require("./AccountDTO");

const CommonModel = require("../CommonModel");

class AccountRepository extends CommonModel {
  async getAllData() {
    return await AccountDTO.findAll();
  }
  async add(account) {
    return await AccountDTO.create({
      id: account.id,
      email: account.email,
      password: account.password,
    });
  }
  async deleteById(id) {
    return await AccountDTO.destroy({
      where: {
        id: id,
      },
    });
  }
  async updateById(account) {
    return await AccountDTO.update(
      {
        email: account.email,
        password: account.password,
      },
      {
        where: {
          id: account.id,
        },
      }
    );
  }
  async checkExistEmail(email) {
    return await AccountDTO.findAll({
      where: {
        email: email,
      },
    });
  }
}

module.exports = new AccountRepository();
