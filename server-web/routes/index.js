const express = require('express');

const loginRoute = require('./loginRoute');

let router = express.Router();

router.use('/user', loginRoute);


module.exports = router;    