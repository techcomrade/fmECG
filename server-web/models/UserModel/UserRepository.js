const { where } = require("sequelize");
const UserDTO = require("./UserDTO");

class UserModel {
  async getAllData() {
    return await UserDTO.findAll({
      attributes: {
        exclude: ['created_at', 'updated_at']
      },
      raw: true,   
    });
  }

  async getUserById(id) {
    return await UserDTO.findAll({
      where: {
        id: id,
      },
      attributes: {
        exclude: ['created_at', 'updated_at']
      },
    });
  }
  
  async getUserByAccountId(id) {
    return await UserDTO.findOne({
      where: {
        account_id: id,
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

  async deleteById(id, t) {
    return await UserDTO.destroy(
      {
        where: {
          id: id,
        },
      },
      t && {
        transaction: t,
      }
    );
  }

  async updateById(user, t) {
    return await UserDTO.update(
      {
        username: user.username,
        gender: user.gender,
        birth: user.birth,
        phone_number: user.phone_number,
        image: user.image,
      },
      {
        where: {
          id: user.id,
        },
      },
      t && {
        transaction: t,
      }
    );
  }
  async updateRoleById(id, role) {
    return await UserDTO.update(
      {
        role: role,
      },
      {
        where: {
          id: id,
        },
      }
    );
  }
}

module.exports = new UserModel();
