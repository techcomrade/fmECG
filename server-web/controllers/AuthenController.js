const UserModel = require("../models/UserModel");
const AuthenModel = require("../models/AccountModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

class AuthenController {
  // async login(req, res, next) {
  //   await UserModel.findByEmail(req.body.email)
  //     .then((user) => {
  //       if (user[0]) {
  //         bcrypt.compare(req.body.pass, user[0].pass, (err, same) => {
  //           if (err) throw err;
  //           if (same) {
  //             const token = jwt.sign(
  //               {
  //                 id: user[0].id,
  //                 email: user[0].email,
  //                 pass: user[0].pass,
  //                 create_time: user[0].create_time,
  //               },
  //               process.env.JWT_KEY,
  //               {
  //                 expiresIn: "30s",
  //               }
  //             );
  //             AuthenModel.insertToken({
  //               id: uuidv4(),
  //               token: token,
  //               create_time: new Date().toDateString(),
  //               delete_flag: 0,
  //             });
  //             res.status(200).json({
  //               id: uuidv4(),
  //               token: token,
  //               create_time: new Date().toDateString(),
  //               delete_flag: 0,
  //               message: "Token added successfully",
  //             });
  //           }
  //         });
  //       }
  //     })

  //     .catch((err) => {
  //       console.log(error);
  //       res.status(403).json({ message: err });
  //     });
  // }

  async getAllData(req, res, next) {
    await AuthenModel.getAllData()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.log(error);
    });
  }
}

module.exports = new AuthenController();
