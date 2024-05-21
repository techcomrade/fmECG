const express = require('express');
const DeviceFreqController = require('../controllers/DeviceFrequencyController');
const DeviceFreqMiddleware = require('../middlewares/DeviceFrequencyMiddleware');
const DeviceFrequencyController = require('../controllers/DeviceFrequencyController');

const router = express.Router();

router.post("", DeviceFreqMiddleware.validateCreateData,  DeviceFreqController.add);
router.delete("/:id", DeviceFrequencyController.delete);
router.post("/update", DeviceFreqMiddleware.validateData, DeviceFrequencyController.update);
module.exports = router;