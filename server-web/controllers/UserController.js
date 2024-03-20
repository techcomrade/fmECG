const UserService = require('../services/UserService')
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

class UserController {
  async getAll (req,res,next) {
    const users = await UserService.getAll();

      return res.status(200).json(users);
    
    // return res.status(400).json("get users failed");
  }
}

module.exports = new UserController();
