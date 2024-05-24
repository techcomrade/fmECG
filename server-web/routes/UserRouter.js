const express = require("express");
const UserController = require("../controllers/UserController");
const {
  commonMiddleware,
  roleGroup,
} = require("../middlewares/CommonMiddleware");
const UserMiddleware = require("../middlewares/UserMiddleware");
const router = express.Router();

router.post("", UserMiddleware.validateCreateData, UserController.createUser);
router.post(
  "/update",
  UserMiddleware.validateUpdateData,
  UserController.updateUser
);
router.get(
  "",
  commonMiddleware.validationToken,
  commonMiddleware.restrictRole(roleGroup.admin),
  UserController.getAll
);
router.get("/:id", UserMiddleware.checkUserId, UserController.getUserById);
router.delete("", UserMiddleware.checkUserId, UserController.deleteUser);

module.exports = router;
