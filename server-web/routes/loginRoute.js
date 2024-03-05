const express = require('express');

const loginRouter = express.Router();

const LoginController = require('../controllers/LoginController');

loginRouter.get("/login", LoginController.login);

module.exports = loginRouter;