const express = require("express");
const RecordController = require("../controllers/RecordController");
const router = express.Router();
const fileUploader = require("../services/FileService");
const RecordService = require("../services/RecordService");

router.get("", RecordController.getAll);
router.post("", RecordController.createRecord);
router.get("/:recordId", RecordController.getRecordById);
router.get("/device/:deviceId", RecordController.getRecordByDeviceId);
router.post("/update/:recordId", RecordController.updateRecordById);
router.delete("", RecordController.deleteRecordById);

console.log(RecordController.UploadFileRecord, 1234);
router.post("/uploadfile", RecordController.UploadFileRecord);

module.exports = router;
