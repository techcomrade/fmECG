const express = require("express");
const PatientDoctorAssignmentController = require("../controllers/PatientDoctorAssignmentController");
const PatientDoctorAssignmentMiddleware = require("../middlewares/PatientDoctorAssignmentMiddleware");

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
  PatientDoctorAssignmentMiddleware.checkAssignmentByDoctorId,
  PatientDoctorAssignmentController.getPatientByDoctorId
);

module.exports = router;
