const express = require('express')
const UserController = require('../controllers/UserController')
const CommonMiddleware = require('../middlewares/CommonMiddleware')
const router = express.Router()

router.post('', UserController.createUser);
router.get('', CommonMiddleware.validationToken, UserController.getAll);
router.post('/update', CommonMiddleware.validationToken, UserController.updateUser);
router.get('/:userId', CommonMiddleware.validationToken, UserController.getUserById);
router.delete('', CommonMiddleware.validationToken, UserController.deleteUser);


module.exports = router;