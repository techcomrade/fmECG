const express = require("express");
const AuthenController = require("../controllers/AuthenController");

const router = express.Router();

router.get("/", AuthenController.getAllData);
router.post("/register", AuthenController.register);

module.exports = router;
