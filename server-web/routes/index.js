const express = require('express');

let router = express.Router();

const AuthenRouter = require('./AuthenRouter');

router.use('/login', AuthenRouter);

module.exports = router;