const express = require("express");
const DeviceController = require("../controllers/DeviceController");
const DeviceMiddleware = require("../middlewares/DeviceMiddleware");
const router = express.Router();

router.get("/", DeviceController.getAllData);
router.delete("/:id", DeviceController.delete);

router.post("/create", DeviceMiddleware.validateData, DeviceController.add);
router.post("/update/:id", DeviceMiddleware.validateData, DeviceController.update);

router.get("/BPrecord/:id", DeviceController.getBloodPressureRecordByDeviceId);
router.get("/HeartRec/:id", DeviceController.getHeartRecordByDeviceId);

module.exports = router;
