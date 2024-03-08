const express = require('express');

const AuthenController = require('../controllers/AuthenController');

const AuthenRouter = express.Router();

AuthenRouter.post('/', AuthenController.login);
AuthenRouter.get('/get', AuthenController.getAllTokens);

module.exports = AuthenRouter;