const express = require('express')
const UserController = require('../controllers/UserController')
const {commonMiddleware} = require('../middlewares/CommonMiddleware');
const UserMiddleware = require('../middlewares/UserMiddleware');
const roleGroup = require
const router = express.Router()

router.post('', UserMiddleware.validateCreateData, UserController.createUser);
router.post('/update', UserMiddleware.validateUpdateData, UserController.updateUser);
router.get('', commonMiddleware.validationToken, UserController.getAll);
router.get('/:id', UserMiddleware.checkUserId , UserController.getUserById);
router.delete('', UserMiddleware.checkUserId, UserController.deleteUser);


module.exports = router;