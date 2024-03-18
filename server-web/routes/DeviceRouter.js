const express = require("express");
const Device = require("../controllers/DeviceController");

const router = express.Router();

router.get("/", Device.getAllData);
router.get("/delete/:id", Device.deleteById);

router.post("/create-device", Device.add);
router.post("/update/:id", Device.updateById);

module.exports = router;
    