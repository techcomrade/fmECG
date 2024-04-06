const express = require("express");
const AuthenRouter = require("./AuthenRouter");
const DeviceRouter = require("./DeviceRouter");
const UserRouter = require("./UserRouter");
const HeartRecRouter = require("./HeartRecRouter");

const router = express.Router();

router.use("/heart_rec", HeartRecRouter);

router.use("/auth", AuthenRouter);

router.use("/user", UserRouter);

router.use("/device", DeviceRouter);

module.exports = router;
