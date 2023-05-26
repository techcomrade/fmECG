const express = require('express');
const ecgrecordsroute = express.Router();
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const ecgrecordscontroller = require('../Controllers/ecgrecordcontroller');
const multer = require('multer');



ecgrecordsroute.post('/upload', ecgrecordscontroller.uploadEcgData);

module.exports = ecgrecordsroute;