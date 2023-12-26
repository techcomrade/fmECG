const login = require('./loginRoute');
const register = require('./registerRoute');
const express = require('express');

let router = express.Router();

router.get('/login', login);
router.get('/register', register);

module.exports = router;