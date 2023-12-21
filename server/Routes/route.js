const login = require('./login');
const register = require('./register');
const express = require('express');

let router = express.Router();

router.get('/login', login);
router.get('/register', register);

module.exports = router;
