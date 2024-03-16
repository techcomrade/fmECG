const express = require('express')
const UserController = require('../controllers/UserController')
const router = express.Router()

router.post('', UserController.createUser)
router.get('', UserController.getAll)
router.patch('/:userId', UserController.updateUser)
router.get('/:userId', UserController.getUserById)
router.delete('/:userId', UserController.deleteUser)


module.exports = router;