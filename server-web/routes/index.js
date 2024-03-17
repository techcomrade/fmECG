const express = require("express");
const AuthenRouter = require("./AuthenRouter");

const router = express.Router();

router.use("/user", AuthenRouter);

module.exports = router;
