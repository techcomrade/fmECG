const express = require("express");
const AuthenRouter = require("./AuthenRouter");
const DeviceRouter = require("./DeviceRouter");

const router = express.Router();

router.use("/auth", AuthenRouter);
router.use("/device", DeviceRouter);

module.exports = router;
