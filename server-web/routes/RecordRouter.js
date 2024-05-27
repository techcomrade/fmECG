const express = require("express");
const RecordController = require("../controllers/RecordController");
const RecordMiddleware = require("../middlewares/RecordMiddleware");
const router = express.Router();


const fileUploader = require("../services/FileService");
const RecordService = require("../services/RecordService");
const uploadController = require("../controllers/uploadController");

router.get("", RecordController.getAll);
router.post(
  "",
  uploadController.setUploadToDisk,
  RecordController.uploadFileRecord,
  RecordController.createRecord
);
router.get("/data/:length", RecordController.getDataRecord);
router.get(
  "/getbyid/:recordId",
  RecordMiddleware.checkId,
  RecordController.getRecordById
);
router.get(
  "/device/:deviceId",
  RecordMiddleware.checkDeviceId,
  RecordController.getRecordByDeviceId
);
router.get(
  "/user/:userId",
  RecordMiddleware.checkUserId,
  RecordController.getRecordByUserId
);
router.get(
  "/start/:time",
  RecordMiddleware.checkStartTime,
  RecordController.getRecordByStartTime
);
router.get(
  "/end/:time",
  RecordMiddleware.checkEndTime,
  RecordController.getRecordByEndTime
);
router.post(
  "/update",
  RecordMiddleware.checkUpdate,
  RecordController.updateRecordById
);
router.delete(
  "/:recordId",
  RecordMiddleware.checkId,
  RecordController.deleteRecordById
);
router.get(
  "/start/interval/:startTime/:endTime",
  RecordMiddleware.checkStartTimeInterval,
  RecordController.getRecordByStartTimeInterval
);
router.get(
  "/end/interval/:startTime/:endTime",
  RecordMiddleware.checkEndTimeInterval,
  RecordController.getRecordByEndTimeInterval
);
router.get("/download/:id", RecordController.downloadRecordFile)
router.get("/check-file/:id",RecordController.checkRecordFile)
router.post("/upload-file", RecordController.uploadFileRecord, (req, res) => {
  if (req.file) res.status(200).json({ file: req.file });
  else
    res.status(400).json({
      message: "No file was uploaded",
    });
});

router.get("/read/:id",RecordController.readFileRecord);
router.delete("/delete/:id", RecordController.deleteFileRecord);

router.post('/getData', RecordController.getDataRecordFile);
module.exports = router;
