const UserService = require("../services/UserService");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const FileService = require("../services/FileService");
class UserController {
  async getAll(req, res, next) {
    console.log(`[P]:::Get all user: `);
    const users = await UserService.getAll();
    return res.status(200).json({
      message: "Get all users successful!",
      metadata: users,
    });
  }

  async createUser(req, res, next) {
    console.log(`[P]:::Create user: `, req.body);
    return res.status(200).json({
      message: "Create user successful!",
      metadata: await UserService.createUser(req.body),
    });
  }

  async getUserById(req, res, next) {
    console.log(`[G]:::Get user by id: `, req.params.id);
    const foundUser = await UserService.getUserById(req.params.id);
    if (foundUser) {
      return res.status(200).json({
        message: "Get user by id successful!",
        metadata: foundUser,
      });
    } else {
      return res.status(404).json({
        message: "User not existed!",
      });
    }
  }

  async updateUser(req, res, next) {
    console.log(`[P]:::Update user by id: `, req.body);
    result = await UserService.updateUser(req.body);
    if (result) {
      return res.status(200).json({
        message: "Update user successful!",
      });
    } else {
      return res.status(404).json({
        message: "Error when update user!",
      });
    }
  }

  async deleteUser(req, res, next) {
    console.log(`[D]:::Delete user by id: `, req.body.id);
    const result = await UserService.deleteUserById(req.body.id);
    if (result) {
      return res.status(200).json({
        message: "Delete user successful!",
      });
    } else {
      return res.status(404).json({
        message: "Error when delete user!",
      });
    }
  }

  async uploadImage(req, res, next) {
    console.log(`[D]:::Upload image by id: `, req.body);
    const buffer = req.file.buffer;
    const fileName = req.file.originalName;
    const link = await FileService.uploadDrive(buffer, fileName);
    if(!link) {
      return res.status(400).json({
        message: "Upload image failed"
      })
    }
    const result = await UserService.uploadImageById(link, req.body.id);
    if (result) {
      return res.status(200).json({
        message: "Upload image successfully",
      });
    } else {
      return res.status(404).json({
        message: "Error when upload user!",
      });
    }
  }
}

module.exports = new UserController();
