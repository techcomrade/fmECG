const express = require('express');
const StatisticController = require('../controllers/StatisticController');

const router = express.Router();

router.get('/', StatisticController.getTotal);

module.exports = router;