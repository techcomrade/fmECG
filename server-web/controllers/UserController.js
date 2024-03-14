const UserModel = require("../models/UserModel");
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

}

module.exports = new UserController();
