const UserService = require('../services/UserService')
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const FileService = require("../services/FileService");
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
    req.body.id = req.body.id ?? req.params.id;
    console.log(`[P]:::Update user by id: `, req.body);
    const buffer = req.file.buffer;
    const filename = req.file.originalName;
    const link = await FileService.uploadDrive(buffer, filename);
    if(link) {
      req.body.image = link;
    }
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
