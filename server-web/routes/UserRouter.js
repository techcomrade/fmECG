const express = require('express')
const UserController = require('../controllers/UserController')
const CommonMiddleware = require('../middlewares/CommonMiddleware');
const UserMiddleware = require('../middlewares/UserMiddleware');
const uploadController = require("../controllers/uploadImageDriverController");
const FileUploadService = require("../services/FileService");

const router = express.Router()

router.post('', UserMiddleware.validateCreateData, UserController.createUser);
router.post("/upload/:id", UserMiddleware.checkUserId );
//,uploadController.setUploadToDrive, FileUploadService.uploadFile.bind(FileUploadService), UserController.updateUser);
router.post('/update', UserMiddleware.validateUpdateData, UserController.updateUser);
router.get('', CommonMiddleware.validationToken, UserController.getAll);
router.get('/:id', UserMiddleware.checkUserId , UserController.getUserById);
router.delete('', UserMiddleware.checkUserId, UserController.deleteUser);


module.exports = router;