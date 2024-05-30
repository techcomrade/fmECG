const express = require("express");
const DeviceController = require("../controllers/DeviceController");
const DeviceMiddleware = require("../middlewares/DeviceMiddleware");
const {
  commonMiddleware,
  roleGroup,
} = require("../middlewares/CommonMiddleware");
const router = express.Router();

router.get("/", commonMiddleware.validationToken, DeviceController.getAllData);
router.delete("/:id", commonMiddleware.validationToken, DeviceController.delete);

router.post(
  "/create",
  commonMiddleware.validationToken,
  DeviceMiddleware.validateCreateData,
  DeviceController.add
);
router.post("/update", commonMiddleware.validationToken, DeviceMiddleware.validateData, DeviceController.update);
router.get("/doctor/:id", commonMiddleware.validationToken, DeviceController.getDeviceByDoctorId);
router.get("/user/:id", commonMiddleware.validationToken, DeviceController.getDevicesById);

router.get("/id/:id", commonMiddleware.validationToken, DeviceController.getDeviceById);
router.get(
  "/start/interval/:startDate/:endDate",
  commonMiddleware.validationToken,
  DeviceMiddleware.checkStartDateInterval,
  DeviceController.getDeviceByStartDateInterval
);
router.get(
  "/end/interval/:startDate/:endDate",
  commonMiddleware.validationToken,
  DeviceMiddleware.checkEndDateInterval,
  DeviceController.getDeviceByEndDateInterval
);
router.get(
  "/username/:username",
  commonMiddleware.validationToken,
  DeviceMiddleware.checkUsername,
  DeviceController.getDeviceByUsername
);
router.get(
  "/device_name/:device_name",
  commonMiddleware.validationToken,
  DeviceMiddleware.checkDeviceName,
  DeviceController.getDeviceByDeviceName
);

module.exports = router;
