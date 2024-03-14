const express = require('express');
const UserRouter = require('./UserRouter')

const router = express.Router();

// const AuthenRouter = require('./AuthenRouter');

// router.use('/login', AuthenRouter);
router.use('/user', UserRouter)

module.exports = router;