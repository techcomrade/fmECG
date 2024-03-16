const express = require("express");
const AccountController = require("../controllers/AccountController");
const router = express.Router();

router.get("/", AccountController.getAll);
router.post("/register", AccountController.register);

module.exports = router;
