const UserService = require('../services/UserService')
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

class UserController {
  // async register(req, res) {
  //   const account = req.body;
  //   if (account.email && account.pass) {
  //     const checkExistEmail = await UserModel.checkExistEmail(account.email);
  //     if (checkExistEmail) {
  //       return res.status(400).json("Email exist");
  //     } else {
  //       try {
  //         account.id = uuidv4();
  //         const time = new Date();
  //         account.create_time = time.toString();
  //         account.pass = await bcrypt.hash(account.pass, 10);
  //         UserModel.register(account)
  //           .then(() => {
  //             return res.status(200).json({
  //               id: account.id,
  //               email: account.email,
  //               pass: account.pass,
  //               create_time: account.create_time,
  //             });
  //           })
  //           .catch((err) => {
  //             return res.status(500).json(err);
  //           });
  //       } catch (err) {
  //         return res.status(500).json(err);
  //       }
  //     }
  //   } else {
  //     return res.status(400).json("Register error");
  //   }
  // }
  async getAll (req, res, next) {
    const users = await UserService.getAll();
    return res.status(200).json({
      message: 'Get all users successful!',
      metadata: users
    });
    // return res.status(400).json("get users failed");
  }

  async createUser(req, res, next) {
    return res.status(200).json({
      message: 'Create user successful!',
      metadata: await UserService.createUser(req.body)
    });
  }

  async getUserById(req, res, next) {
    return res.status(200).json({
      message: 'Get user by id successful!',
      metadata: await UserService.getUserById(req.params.userId)
    });
  }

  async updateUser(req, res, next) {
    return res.status(200).json({
      message: 'Update user successful!',
      metadata: await UserService.updateUser(req.params.userId)
    });
  }

  async deleteUser(req, res, next) {
    return res.status(200).json({
      message: 'Delete user successful!',
      metadata: await UserService.deleteUserById(req.params.userId)
    });
  }
}

module.exports = new UserController();
