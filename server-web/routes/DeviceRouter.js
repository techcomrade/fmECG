const express = require("express");
const DeviceController = require("../controllers/DeviceController");

const router = express.Router();

router.get("/", DeviceController.getAllData);
router.get("/delete/:id", DeviceController.delete);

router.post("/create-device", DeviceController.add);
router.post("/update/:id", DeviceController.update);

module.exports = router;
