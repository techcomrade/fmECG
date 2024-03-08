const express = require('express')
const UserController = require('../controllers/UserController')
const router = express.Router()

router.post('/', UserController.register)
router.get('/get', UserController.getAllUser)

module.exports = router;