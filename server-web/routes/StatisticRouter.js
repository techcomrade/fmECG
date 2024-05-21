const express = require('express');
const StatisticController = require('../controllers/StatisticController')

const router = express.Router();

router.get("/user", StatisticController.CountUsers);
router.get("/device", StatisticController.CountDevices);
router.get("/record", StatisticController.CountRecords);

module.exports = router;