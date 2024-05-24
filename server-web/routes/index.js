const express = require("express");
const AuthenRouter = require("./AuthenRouter");
const DeviceRouter = require("./DeviceRouter");
const UserRouter = require("./UserRouter");
const RecordRouter = require("./RecordRouter");
const DeviceFreqRouter = require("./DeviceFrequencyRouter");
const PatientDoctorAssignmentRouter = require("./PatientDoctorAssignmentRouter");

const router = express.Router();

router.use("/auth", AuthenRouter);

router.use("/user", UserRouter);

router.use("/device", DeviceRouter);

router.use("/record", RecordRouter);

router.use("/df", DeviceFreqRouter);

router.use("/pda", PatientDoctorAssignmentRouter);

module.exports = router;
