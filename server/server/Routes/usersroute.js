const express = require('express');
const usersroute = express.Router();
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const userscontroller = require('../Controllers/usercontroller');

usersroute.put("/profile", userscontroller.updateUserInfo);
usersroute.put("/change-password", userscontroller.changePassword);
usersroute.get("/profile", userscontroller.getUserProfile);
usersroute.get("/", userscontroller.getAllUsers);

module.exports = usersroute;