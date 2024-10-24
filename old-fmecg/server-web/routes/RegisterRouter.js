const express = require("express");
const RegisterMiddleware = require("../middlewares/RegisterMiddleware");
const RegisterController = require("../controllers/RegisterController");
const FileUploadService = require("../services/FileService");
const UploadController = require("../controllers/UploadController");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

router.get("", RegisterController.getAllData);

router.post("/update", RegisterController.updateRegister);

router.post("/accepted", RegisterController.accepted);

router.post("/rejected", RegisterController.rejected);

router.post("/upload-img", upload.single('file'), RegisterController.uploadImage);

module.exports = router;
