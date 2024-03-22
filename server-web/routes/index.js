const express = require("express");
const AuthenRouter = require("./AuthenRouter");
const DeviceRouter = require("./DeviceRouter");
const UserRouter = require("./UserRouter");

const router = express.Router();

router.use("/auth", AuthenRouter);
router.use("/user", UserRouter);
router.use("/device", DeviceRouter);

module.exports = router;
