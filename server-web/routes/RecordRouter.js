const express = require("express");
const RecordController = require("../controllers/RecordController");
const RecordMiddleware = require("../middlewares/RecordMiddleware");
const router = express.Router();

router.get("", RecordController.getAll);
router.post("", RecordMiddleware.validateRecord, RecordController.createRecord);
router.get("/:recordId", RecordMiddleware.checkId, RecordController.getRecordById);
router.get("/device/:deviceId", RecordMiddleware.checkDeviceId, RecordController.getRecordByDeviceId);
router.get("/user/:userId", RecordMiddleware.checkUserId, RecordController.getRecordByUserId);
router.get("/start/:time", RecordMiddleware.checkStartTime, RecordController.getRecordByStartTime);
router.get("/end/:time", RecordMiddleware.checkEndTime, RecordController.getRecordByEndTime);
router.post("/update/:recordId", RecordController.updateRecordById);
router.delete("", RecordController.deleteRecordById);

module.exports = router;
