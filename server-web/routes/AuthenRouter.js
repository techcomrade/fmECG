const express = require('express');

const AuthenController = require('../controllers/AuthenController');

const AuthenRouter = express.Router();

AuthenRouter.get('/authen', AuthenController.login);

module.exports = AuthenRouter;