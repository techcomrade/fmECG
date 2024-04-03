const express = require("express");
const RecordController = require("../controllers/RecordController");
const router = express.Router();

router.get("", RecordController.getAll);
router.post("", RecordController.createRecord);
router.get("/:recordId", RecordController.getRecordById);
router.get("/device/:deviceId", RecordController.getRecordByDeviceId);
router.post("/update/:recordId", RecordController.updateRecordById);
router.delete("", RecordController.deleteRecordById);

module.exports = router;
