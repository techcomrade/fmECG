const express = require("express");
const RecordController = require("../controllers/RecordController");
const RecordMiddleware = require("../middlewares/RecordMiddleware");
const router = express.Router();
const fileUploader = require("../services/FileService");
const RecordService = require("../services/RecordService");
const uploadController = require('../controllers/uploadController');
const {
  commonMiddleware,
  roleGroup,
} = require("../middlewares/CommonMiddleware");
router.get("", commonMiddleware.validationToken, RecordController.getAll);
router.post(
  "",
  commonMiddleware.validationToken,
  uploadController.setUploadToDisk,
  RecordController.uploadFileRecord,
  RecordController.createRecord
);
router.get("/data/:length", commonMiddleware.validationToken, RecordController.getDataRecord);
router.get(
  "/id/:recordId",
  commonMiddleware.validationToken,
  RecordMiddleware.checkId,
  RecordController.getRecordById
);
router.get("/doctor/:id", commonMiddleware.validationToken, RecordController.getRecordByDoctorId);
router.get(
  "/device/:deviceId",
  commonMiddleware.validationToken,
  RecordMiddleware.checkDeviceId,
  RecordController.getRecordByDeviceId
);
router.get(
  "/user/:userId",
  commonMiddleware.validationToken,
  RecordMiddleware.checkUserId,
  RecordController.getRecordByUserId
);
router.get(
  "/start/:time",
  commonMiddleware.validationToken,
  RecordMiddleware.checkStartTime,
  RecordController.getRecordByStartTime
);
router.get(
  "/end/:time",
  commonMiddleware.validationToken,
  RecordMiddleware.checkEndTime,
  RecordController.getRecordByEndTime
);
router.post(
  "/update",
  commonMiddleware.validationToken,
  RecordMiddleware.checkUpdate,
  RecordController.updateRecordById
);
router.delete(
  "/:recordId",
  commonMiddleware.validationToken,
  RecordMiddleware.checkId,
  RecordController.deleteRecordById
);
router.get(
  "/start/interval/:startTime/:endTime",
  commonMiddleware.validationToken,
  RecordMiddleware.checkStartTimeInterval,
  RecordController.getRecordByStartTimeInterval
);
router.get(
  "/end/interval/:startTime/:endTime",
  commonMiddleware.validationToken,
  RecordMiddleware.checkEndTimeInterval,
  RecordController.getRecordByEndTimeInterval
);
router.get("/download/:id", commonMiddleware.validationToken, RecordController.downloadRecordFile);
router.get("/check-file/:id", commonMiddleware.validationToken, RecordController.checkRecordFile);
router.post("/upload-file", commonMiddleware.validationToken, RecordController.uploadFileRecord, (req, res) => {
  if (req.file) res.status(200).json({ file: req.file });
  else
    res.status(400).json({
      message: "No file was uploaded",
    });
});

router.get("/read/:id",RecordController.readFileRecord);
router.delete("/delete/:id", RecordController.deleteFileRecord);

router.get("/getData/:id", RecordController.getDataRecordFile);
module.exports = router;
