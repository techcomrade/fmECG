const express = require('express');
const userRouter = require('./UserRouter')
const router = express.Router()

router.use('/user', userRouter)

module.exports = router;