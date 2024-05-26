const express = require("express");
const DeviceController = require("../controllers/DeviceController");
const DeviceMiddleware = require("../middlewares/DeviceMiddleware");

const router = express.Router();

router.get("/", DeviceController.getAllData);
router.delete("/:id", DeviceController.delete);

router.post(
  "/create",
  DeviceMiddleware.validateCreateData,
  DeviceController.add
);
router.post("/update", DeviceMiddleware.validateData, DeviceController.update);

router.get("/:id", DeviceController.getDeviceById);
router.get(
  "/start/interval/:startDate/:endDate",
  DeviceMiddleware.checkStartDateInterval,
  DeviceController.getDeviceByStartDateInterval
);
router.get(
  "/end/interval/:startDate/:endDate",
  DeviceMiddleware.checkEndDateInterval,
  DeviceController.getDeviceByEndDateInterval
);
router.get(
  "/username/:username",
  DeviceMiddleware.checkUsername,
  DeviceController.getDeviceByUsername
);
router.get(
  "/device_name/:device_name",
  DeviceMiddleware.checkDeviceName,
  DeviceController.getDeviceByDeviceName
);

module.exports = router;
