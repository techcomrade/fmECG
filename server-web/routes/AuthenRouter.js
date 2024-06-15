const express = require("express");
const AuthenController = require("../controllers/AuthenController");
const AuthenMiddleware = require("../middlewares/AuthenMiddleware");

const uploadController = require("../controllers/uploadController");
const FileUploadService = require("../services/FileService");

const router = express.Router();

router.get("/", AuthenController.getAllData);
router.get("/check", AuthenController.getAllRegistration);
router.post("/login", AuthenMiddleware.validateAccount, AuthenController.login);
router.post("/register", AuthenMiddleware.validateUser, AuthenController.register);


module.exports = router;
