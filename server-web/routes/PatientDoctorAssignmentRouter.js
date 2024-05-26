const express = require("express");
const PatientDoctorAssignmentController = require("../controllers/PatientDoctorAssignmentController");
const PatientDoctorAssignmentMiddleware = require("../middlewares/PatientDoctorAssignmentMiddleware");

const router = express.Router();

router.get("", PatientDoctorAssignmentController.getAllAssignment);
router.get(
  "/patient/:doctor_id",
  PatientDoctorAssignmentMiddleware.checkByDoctorId,
  PatientDoctorAssignmentController.getPatientByDoctorId
);

module.exports = router;
