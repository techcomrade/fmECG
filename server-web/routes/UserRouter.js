const express = require('express')
const UserController = require('../controllers/UserController')
const CommonMiddleware = require('../middlewares/CommonMiddleware');
const UserMiddleware = require('../middlewares/UserMiddleware');
const router = express.Router()

router.post('', UserMiddleware.validateCreateData, UserController.createUser);
router.post('/update', UserMiddleware.validateUpdateData, UserController.updateUser);
router.get('', CommonMiddleware.validationToken, UserController.getAll);
router.get('/:userId', UserMiddleware.checkUserId , UserController.getUserById);
router.delete('', UserMiddleware.checkUserId, UserController.deleteUser);


module.exports = router;