const CommonModel = require("../../models/CommonModel");
const UserDTO = require("./UserDTO");

class UserModel extends CommonModel {
  async getAllData() {
    return await UserDTO.findAll();
  }

  async getUserById(id) {
    return await UserDTO.findAll({where: {
      id:id
    }});
  }

  async add(user) {
    return await UserDTO.create({
      id: user.id,
      account_id: user.account_id,
      username: user.username,
      birth: user.birth,
      phone_number: user.phone_number ?? "",
      image: user.image ?? "",
      role: user.role,
    });
  }

  async deleteById(id) {
    return await UserDTO.destroy({where: {
      id: id
    }});
  }
  
  async updateById(user) {
    return await UserDTO.update({
      username: user.username,
      birth: user.birth,
      phone_number: user.phone_number,
      image: user.image,
      role: user.role
    },{
      where: {
        id: user.id
      }
    }
    )
  }

}

module.exports = new UserModel();
