const express = require("express");
const AuthenRouter = require("./AuthenRouter");
const DeviceRouter = require("./DeviceRouter");
const UserRouter = require("./UserRouter");

const HeartRecRouter = require("./HeartRecRouter");

const RecordRouter = require("./RecordRouter");
const BloodPressureRouter = require("./BloodPressureRouter");
const DeviceFreqRouter = require("./DeviceFrequencyRouter");

const router = express.Router();

router.use("/heart_rec", HeartRecRouter);

router.use("/auth", AuthenRouter);

router.use("/user", UserRouter);

router.use("/device", DeviceRouter);

router.use("/record", RecordRouter);

router.use("/bp", BloodPressureRouter);

router.use("/df", DeviceFreqRouter);

module.exports = router;
