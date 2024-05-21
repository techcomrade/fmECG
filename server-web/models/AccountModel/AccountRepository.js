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

  async deleteById(id,t) {
    return await AccountDTO.destroy({
      where: {
        id: id,
      },
    },
    t && {
      transaction: t,
    });
  }

  async updateById(account,t) {
    return await AccountDTO.update(
      {
        password: account.password,
      },
      {
        where: {
          id: account.id,
        },
      },
      t && {
        transaction: t,
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

  async getAccountById(id) {
    return await AccountDTO.findOne({
      where: {
        id: id,
      }
    });
  }

}

module.exports = new AccountRepository();
