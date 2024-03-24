const express = require("express");
const DeviceController = require("../controllers/DeviceController");
const DeviceMiddleware = require("../middlewares/DeviceMiddleware");
const router = express.Router();

router.get("/", DeviceController.getAllData);
router.get("/delete/:id", DeviceController.delete);

router.post("/create-device", DeviceMiddleware.validateData, DeviceController.add);
router.post("/update/:id", DeviceMiddleware.validateData, DeviceController.update);

module.exports = router;
