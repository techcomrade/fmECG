const express = require("express");
const RecordController = require("../controllers/RecordController");
const router = express.Router();

router.get("", RecordController.getAll);
router.post("", RecordController.createRecord);
router.get("/:recordId", RecordController.getRecordById);
router.get("/device/:deviceId", RecordController.getRecordByDeviceId);
router.get("/user/:userId", RecordController.getRecordByUserId);
router.get("/start/:time", RecordController.getRecordByStartTime);
router.get("/end/:time", RecordController.getRecordByEndTime);
router.post("/update/:recordId", RecordController.updateRecordById);
router.delete("", RecordController.deleteRecordById);

module.exports = router;
