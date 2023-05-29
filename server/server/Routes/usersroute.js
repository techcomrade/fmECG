const express = require('express');
const usersRoute = express.Router();
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const usersController = require('../Controllers/userController');

usersRoute.put("/profile", usersController.updateUserInfo);
usersRoute.put("/change-password", usersController.changePassword);
usersRoute.get("/profile", usersController.getUserProfile);
usersRoute.get("/", usersController.getAllUsers);
usersRoute.get("/:userId", usersController.getUserById);

module.exports = usersRoute;