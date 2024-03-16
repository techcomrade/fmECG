const express = require("express");
const AccountRouter = require("./AccountRouter");

const router = express.Router();

router.use("/user", AccountRouter);

module.exports = router;
