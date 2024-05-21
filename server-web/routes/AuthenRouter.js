const express = require("express");
const AuthenController = require("../controllers/AuthenController");
const AuthenMiddleware = require("../middlewares/AuthenMiddleware");

const uploadController = require("../controllers/uploadImageDriverController");
const FileUploadService = require("../services/FileService");

const router = express.Router();

router.get("/", AuthenController.getAllData);
router.post("/login", AuthenMiddleware.validateAccount,AuthenController.login)
router.post("/register", AuthenMiddleware.validateUser, AuthenController.register);

router.post("/upload", uploadController.setUploadToDrive, FileUploadService.uploadFile.bind(FileUploadService), uploadController.upload);


module.exports = router;
