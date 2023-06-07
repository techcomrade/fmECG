const express = require('express');
const ecgRecordsRoute = express.Router();
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const ecgRecordsController = require('../Controllers/ecgRecordController');
const multer = require('multer');



ecgRecordsRoute.post('/upload', ecgRecordsController.uploadEcgData);

module.exports = ecgRecordsRoute;
