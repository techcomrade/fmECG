const { where } = require("sequelize");
const RegisterDTO = require("./RegisterDTO");

class RegisterModel {
  async getAllData() {
    return await RegisterDTO.findAll({
      attributes: {
        exclude: ["created_at", "updated_at"],
      },
      raw: true,
    });
  }

  async getUserById(id) {
    return await RegisterDTO.findAll({
      where: {
        id: id,
      },
      attributes: {
        exclude: ["created_at", "updated_at"],
      },
    });
  }
  async add(user) {
    return await RegisterDTO.create({
      id: user.id,
      email: user.email,
      password: user.password,
      username: user.username,
      birth: user.birth,
      gender: user.gender,
      phone_number: user.phone_number ?? "",
      image: user.image ?? "",
      status: user.status,
      information: user.information ?? "",
      role: user.role,
      created_at: Date.now(),
      updated_at: Date.now(),
    });
  }

  async deleteById(id) {
    return await RegisterDTO.destroy(
      {
        where: {
          id: id,
        },
      }
    );
  }

  async updateById(user) {
    return await RegisterDTO.update(
      {
        email: user.email,
        password: user.password,
        username: user.username,
        birth: user.birth,
        gender: user.gender,
        phone_number: user.phone_number ?? "",
        image: user.image ?? "",
        status: user.status,
        information: user.information ?? "",
        role: user.role,
        updated_at: Date.now(),
      },
      {
        where: {
          id: user.id,
        },
      }
    );
  }

  async count() {
    return await RegisterDTO.count();
  }
}
module.exports = new RegisterModel();
