const express = require('express');
const loginController = require('../controllers/loginController');
const authController = require('../controllers/authController');

let router = express.Router();

router.get('/login', loginController);
router.post('/auth/login', authController.login);

module.exports = router;