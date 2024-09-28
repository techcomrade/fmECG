const express = require('express');
const StatisticController = require('../controllers/StatisticController');
const {
    commonMiddleware,
    roleGroup,
  } = require("../middlewares/CommonMiddleware");


const router = express.Router();

router.get('/', commonMiddleware.validationToken, StatisticController.getTotal);

module.exports = router;