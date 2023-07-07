const express = require('express');
const dasboardHelperRoute = express.Router();
// const bodyParser = require('body-parser')
// const urlencodedParser = bodyParser.urlencoded({ extended: false })
const dasboardHelperController = require('../Controllers/dasboardHelperController');


dasboardHelperRoute.get("/dashboard-data", dasboardHelperController.getDashboardData);
dasboardHelperRoute.get("/dashboard-miles-stat-data/month", dasboardHelperController.getUserMileStatsDataByMonth);
dasboardHelperRoute.get("/dashboard-miles-stat-data/week", dasboardHelperController.getUserMileStatsDataByWeek);
dasboardHelperRoute.get("/dashboard-helper/doctor-email-list", dasboardHelperController.getListDoctorsProp);
dasboardHelperRoute.get("/dashboard-helper/patient-email-list", dasboardHelperController.getListPatientsProp);

dasboardHelperRoute.post("/upload/news/image", dasboardHelperController.uploadNewsImage);
dasboardHelperRoute.post("/convert-excel-to-json", dasboardHelperController.converExceltoJson);




module.exports = dasboardHelperRoute;
