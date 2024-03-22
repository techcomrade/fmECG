const UserService = require('../services/UserService')
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

class UserController {
  async getAll (req,res,next) {
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
