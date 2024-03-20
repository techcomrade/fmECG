const UserService = require('../services/UserService')
class UserController {

  async getAll (req,res,next) {
    const users = await UserService.getAll();
    return res.status(200).json({
      message: 'Get all users successful!',
      metadata: users
    });
  }

  async createUser(req, res, next) {
    console.log(`[P]:::Create user: `, req.body);
    const result = await UserService.createUser(req.body);
    if(result) {
      return res.status(200).json({
        message: 'Create user successful!'
      });
    }
  }

  async getUserById(req, res, next) {
    console.log(`[G]:::Get user by id: `, req.params.userId);
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
    console.log(`[P]:::Update user by id: `, req.body);
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
    console.log(`[D]:::Delete user by id: `, req.body.id);
    const result = await UserService.deleteUserById(req.body.id);
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
