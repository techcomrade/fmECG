const express = require('express');
const authRoute = express.Router();
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const authController = require('../Controllers/authController');

authRoute.post("/register", authController.register);
authRoute.post("/login", authController.login);
authRoute.post("/reset-password", authController.resetPasswordToken);
authRoute.post("/reset-password/reset", authController.resetPassword);
authRoute.get("/logout", authController.logout);
authRoute.get("/is-login", authController.isLogin);


module.exports = authRoute;
