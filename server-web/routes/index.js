const express = require('express');
const UserRouter = require('./UserRouter')

const router = express.Router();

router.use('/user', UserRouter)

module.exports = router;