const express = require('express');
const PatientDoctorAssignmentRoute = express.Router();
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const PatientDoctorAssignmentController = require('../Controllers/patientDoctorAssignmentController');

PatientDoctorAssignmentRoute.get('/doctor/:doctorId/patients', PatientDoctorAssignmentController.getPatientsByDoctor);
PatientDoctorAssignmentRoute.get('/patient/:patientId/doctor', PatientDoctorAssignmentController.getDoctorByPatient);

module.exports = PatientDoctorAssignmentRoute;
