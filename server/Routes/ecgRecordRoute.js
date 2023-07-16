const express = require('express');
const ecgRecordsRoute = express.Router();
const bodyParser = require('body-parser')
const ecgRecordsController = require('../Controllers/ecgRecordController');

ecgRecordsRoute.post('/upload', ecgRecordsController.uploadEcgData);
ecgRecordsRoute.get('/patient/:userId', ecgRecordsController.getEcgRecordsByUserId);
ecgRecordsRoute.get('/doctor/:doctorId', ecgRecordsController.getEcgRecordsByDoctor);
ecgRecordsRoute.get('/record-data/:record_id', ecgRecordsController.convertExceltoJson);



module.exports = ecgRecordsRoute;
