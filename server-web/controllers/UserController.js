const UserService = require('../services/UserService');
const StatisticService = require('../services/StatisticService');
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

class UserController {
  async getAll (req,res,next) {
    console.log(`[P]:::Get all user: `);
    const users = await UserService.getAll();
    return res.status(200).json({
      message: 'Get all users successful!',
      metadata: users
    });
  }

  async createUser(req, res, next) {
    console.log(`[P]:::Create user: `, req.body);
    return res.status(200).json({
      message: 'Create user successful!',
      metadata: await UserService.createUser(req.body)
    });
  }

  async getUserById(req, res, next) {
    console.log(`[G]:::Get user by id: `, req.params.id);
    const foundUser = await UserService.getUserById(req.params.id);
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
    console.log(`[P]:::Update user by id: `, req.body);
    const result = await UserService.updateUser(req.body);
    if(result) {
      return res.status(200).json({
        message: 'Update user successful!'
      });
    }
    else {
      return res.status(404).json({
        message: 'Error when update user!'
      });
    }
  }

  async deleteUser(req, res, next) {
    console.log(`[D]:::Delete user by id: `, req.body.id);
    const result = await UserService.deleteUserById(req.body.id);
    if(result) {
      return res.status(200).json({
        message: 'Delete user successful!'
      });
    }
    else {
      return res.status(404).json({
        message: 'Error when delete user!'
      });
    }
  }
}

module.exports = new UserController();
