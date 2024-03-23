const express = require("express");
const AuthenController = require("../controllers/AuthenController");

const router = express.Router();

router.get("/", AuthenController.getAllData);
router.post("/login", AuthenController.login);

router.post("/create-user", AuthenController.register);

module.exports = router;
