const express = require("express");
const DeviceController = require("../controllers/DeviceController");
const DeviceMiddleware = require("../middlewares/DeviceMiddleware");
const CommonMiddleware = require('../middlewares/CommonMiddleware');

const router = express.Router();

router.get("/", DeviceController.getAllData);
router.delete("/:id", DeviceController.delete);

router.post("/create", DeviceMiddleware.validateCreateData, DeviceController.add);
router.post("/update", DeviceMiddleware.validateData, DeviceController.update);

router.get("/get/:id", DeviceController.getDeviceById);

module.exports = router;
