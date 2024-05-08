const express = require("express");
const RecordController = require("../controllers/RecordController");
const router = express.Router();
const fileUploader = require("../services/FileService");
const RecordService = require("../services/RecordService");

router.get("", RecordController.getAll);
router.post("", RecordController.UploadFileRecord, RecordController.createRecord);
router.get("/:recordId", RecordController.getRecordById);
router.get("/device/:deviceId", RecordController.getRecordByDeviceId);
router.post("/update/:recordId", RecordController.updateRecordById);
router.delete("", RecordController.deleteRecordById);

router.post("/uploadfile", RecordController.UploadFileRecord, (req, res) => {
  if (req.file) res.status(200).json({ file: req.file });
  else
    res.status(400).json({
      Message: "No file was uploaded",
    });
});

module.exports = router;
