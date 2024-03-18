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
  }

  async createUser(req, res, next) {
    const result = await UserService.createUser(req.body);
    if(result) {
      return res.status(200).json({
        message: 'Create user successful!'
      });
    }
  }

  async getUserById(req, res, next) {
    const foundUser = await UserService.getUserById(req.params.userId);
    if(foundUser) {
      return res.status(200).json({
        message: 'Get user by id successful!',
        metadata: foundUser
      });
    }
    else {
      return res.status(404).json({
        message: 'User not existed!'
      });
    }
  }

  async updateUser(req, res, next) {
    const result = await UserService.updateUser(req.body, req.params.userId);
    if(result) {
      return res.status(200).json({
        message: 'Update user successful!'
      });
    }
    else {
      return res.status(404).json({
        message: 'User not existed!'
      });
    }
  }

  async deleteUser(req, res, next) {
    const result = await UserService.deleteUserById(req.params.userId);
    if(result) {
      return res.status(200).json({
        message: 'Delete user successful!'
      });
    }
    else {
      return res.status(404).json({
        message: 'User not existed!'
      });
    }
  }
}

module.exports = new UserController();
