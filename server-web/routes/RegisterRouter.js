const express = require("express");
const RegisterMiddleware = require("../middlewares/RegisterMiddleware");
const RegisterController = require("../controllers/RegisterController");
const FileUploadService = require("../services/FileService");
const UploadController = require("../controllers/UploadController");

const router = express.Router();

router.get("", RegisterController.getAllData);

router.post("", RegisterMiddleware.validateRegister, RegisterController.createRegister);

router.post("/update", RegisterController.updateRegister);

router.post("/accepted", RegisterController.accepted);

router.post("/rejected", RegisterController.rejected);

module.exports = router;
