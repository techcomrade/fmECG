const express = require("express");
const AuthenController = require("../controllers/AuthenController");
const AuthenMiddleware = require("../middlewares/AuthenMiddleware");

const router = express.Router();

router.get("/", AuthenController.getAllData);
router.post("/register", AuthenMiddleware.validateUser, AuthenController.register);

module.exports = router;
