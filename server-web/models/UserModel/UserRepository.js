const UserDTO = require("./UserDTO");

class UserModel {
  async getAllData() {
    return await UserDTO.findAll();
  }

  async getUserById(id) {
    return await UserDTO.findAll({
      where: {
        id: id,
      },
    });
  }

  async add(user, t) {
    return await UserDTO.create(
      {
        id: user.id,
        account_id: user.account_id,
        username: user.username,
        birth: user.birth,
        phone_number: user.phone_number ?? "",
        image: user.image ?? "",
        role: user.role,
      },
      t && {
        transaction: t,
      }
    );
  }

  async deleteById(id) {
    return await UserDTO.destroy({
      where: {
        id: id,
      },
    });
  }

  async updateById(user) {
    return await UserDTO.update(
      {
        username: user.username,
        birth: user.birth,
        phone_number: user.phone_number,
        image: user.image,
        role: user.role,
      },
      {
        id: user.id,
      }
    );
  }
}

module.exports = new UserModel();
