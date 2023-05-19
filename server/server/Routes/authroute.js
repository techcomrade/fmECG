const express = require('express');
const authroute = express.Router();
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const authcontroller = require('../Controllers/authcontroller');

authroute.post("/register", authcontroller.register);
authroute.post("/login", authcontroller.login);
authroute.post("/reset-password", authcontroller.resetPasswordToken);
authroute.post("/reset-password/reset", authcontroller.resetPassword);
authroute.get("/logout", authcontroller.logout);

module.exports = authroute;