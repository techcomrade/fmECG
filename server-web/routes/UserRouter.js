const express = require("express");
const UserController = require("../controllers/UserController");
const {
  commonMiddleware,
  roleGroup,
} = require("../middlewares/CommonMiddleware");
const UserMiddleware = require("../middlewares/UserMiddleware");

const uploadController = require("../controllers/uploadImageDriverController");
const FileUploadService = require("../services/FileService");

const router = express.Router();

router.post("", commonMiddleware.validationToken, UserMiddleware.validateCreateData, UserController.createUser);
router.post(
  "/update",
  commonMiddleware.validationToken,
  UserMiddleware.validateUpdateData,
  UserController.updateUser
);

router.post(
  "/upload",
  uploadController.setUploadToDrive,
  FileUploadService.uploadFile.bind(FileUploadService),
  UserMiddleware.checkUserId,
  UserController.uploadImage
);
router.get(
  "",
  commonMiddleware.validationToken,
  // commonMiddleware.restrictRole(roleGroup.admin),
  UserController.getAll
);
router.get("/id/:id", UserController.getUserById);
router.delete("", UserMiddleware.checkUserId, UserController.deleteUser);

module.exports = router;
