const AccountDTO = require("./AccountDTO");

class AccountRepository {
  async getAllData() {
    return await AccountDTO.findAll();
  }
  async add(account, t) {
    return await AccountDTO.create(
      {
        id: account.id,
        email: account.email,
        password: account.password,
      },
      t && {
        transaction: t,
      }
    );
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
  async getAccountByEmail(email) {
    return await AccountDTO.findOne({
      where: {
        email: email,
      }
    });
  }
}

module.exports = new AccountRepository();
