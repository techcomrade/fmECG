const express = require("express");
const PatientDoctorAssignmentController = require("../controllers/PatientDoctorAssignmentController");
const PatientDoctorAssignmentMiddleware = require("../middlewares/PatientDoctorAssignmentMiddleware");
const {
  commonMiddleware,
  roleGroup,
} = require("../middlewares/CommonMiddleware");

const router = express.Router();

router.post(
  "/create",
  PatientDoctorAssignmentMiddleware.validateAssignment,
  PatientDoctorAssignmentMiddleware.checkDoctorById,
  PatientDoctorAssignmentMiddleware.checkPatientById,
  PatientDoctorAssignmentMiddleware.checkAssignmentByPatientId,
  PatientDoctorAssignmentController.createAssigment
);
router.get("", PatientDoctorAssignmentController.getAllAssignment);
router.get(
  "/patient/:doctor_id",
  commonMiddleware.validationToken,
  PatientDoctorAssignmentMiddleware.checkAssignmentByDoctorId,
  PatientDoctorAssignmentController.getPatientByDoctorId
);

router.get(
  "/doctor/:patient_id",
  commonMiddleware.validationToken,
  PatientDoctorAssignmentController.getDoctorByPatientId
);

module.exports = router;
