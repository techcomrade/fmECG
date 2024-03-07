const UserModel = require("../models/UserModel");
const AuthenModel = require("../models/AuthenModel");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

class AuthenController {
  async login(req, res, next) {
    await UserModel.findByEmail(req.body.email)
      .then((account) => {
        if (account[0]) {
          console.log(account[0]);
          bcrypt.compare(req.body.pass, account[0].pass, (same, err) => {
            if (err) throw err;
            if (!same) {
              const token = jwt.sign(
                {
                  id: account[0].id,
                  email: account[0].email,
                  pass: account[0].pass,
                  create_time: account[0].create_time,
                },
                process.env.JWT_KEY,
                {

                  expiresIn: "30s",
                }
              )
              AuthenModel.insertToken(token, account[0].id);
              res.status(200).json({
                token: token,
                message: "Token added successfully"
              })
            }
          });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(403).json({ message: error });
      });
  }
}

module.exports = new AuthenController();
