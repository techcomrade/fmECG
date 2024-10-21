const express = require("express");
const AuthenRouter = require("./AuthenRouter");
const DeviceRouter = require("./DeviceRouter");
const UserRouter = require("./UserRouter");
const RecordRouter = require("./RecordRouter");
const DeviceDetailsRouter = require("./DeviceDetailsRouter");
const PatientDoctorAssignmentRouter = require("./PatientDoctorAssignmentRouter");
const StatisticRouter = require("./StatisticRouter");
const RegisterRouter = require("./RegisterRouter");
const ChatGprRouter = require("./ChatGptRouter");

const router = express.Router();

router.use("/auth", AuthenRouter);

router.use("/user", UserRouter);

router.use("/device", DeviceRouter);

router.use("/record", RecordRouter);

router.use("/df", DeviceDetailsRouter);

router.use("/pda", PatientDoctorAssignmentRouter);

router.use("/statistic", StatisticRouter);

router.use('/chat', ChatGprRouter);

router.use('/register', RegisterRouter);

router.use('/test',(req,res)=>{
    res.json("test oke")
})

module.exports = router;
