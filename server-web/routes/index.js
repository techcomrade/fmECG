const express = require('express');
const authController = require('../controllers/AuthenController');
const loginController = require('../controllers/LoginController');

let router = express.Router();

router.get('/login', loginController)


module.exports = router;