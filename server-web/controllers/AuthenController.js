const AuthenService = require("../services/AuthenService");

class AuthenController {
  async register(req, res) {
    const user = req.body;
    const account = {};
    account.email = req.body.email;
    account.password = req.body.password;
    if (account.email && account.password) {
      const checkExistEmail = await AuthenService.checkEmail(account.email);
      if (checkExistEmail) {
        return res.status(400).json("Email exist");
      } else {
        try {
          await AuthenService.register(account, user)
            .then(() => {
              return res.status(200).json({
                id: account.id,
                email: account.email,
                password: account.password,
              });
            })
            .catch((err) => {
              return res.status(500).json(err);
            });
        } catch (err) {
          return res.status(500).json(err);
        }
      }
    } else {
      return res.status(400).json("Register error");
    }
  }
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

  async getAllData(req, res) {
    const accounts = await AuthenService.getAll();
    if (accounts.length) {
      return res.status(200).json(accounts);
    } else {
      return res.status(400).json("Get accounts failed");
    }
  }
}

module.exports = new AuthenController();
