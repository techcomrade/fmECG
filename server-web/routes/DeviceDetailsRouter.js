const express = require('express');
const DeviceDetailsController = require('../controllers/DeviceDetailsController');
const DeviceDetailsMiddleware = require('../middlewares/DeviceDetailsMiddleware');

const router = express.Router();

router.post("", DeviceDetailsMiddleware.validateCreateData,  DeviceDetailsController.add);
router.delete("/:id", DeviceDetailsController.delete);
router.post("/update", DeviceDetailsMiddleware.validateData, DeviceDetailsController.update);
module.exports = router;