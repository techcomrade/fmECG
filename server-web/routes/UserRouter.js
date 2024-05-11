const express = require('express')
const UserController = require('../controllers/UserController')
const CommonMiddleware = require('../middlewares/CommonMiddleware')
const router = express.Router()

router.post('', UserController.createUser);
router.get('', CommonMiddleware.validationToken, UserController.getAll);
router.post('/update',  UserController.updateUser);
router.get('/:userId',  UserController.getUserById);
router.delete('', UserController.deleteUser);


module.exports = router;