const express = require("express");
const PatientDoctorAssignmentController = require("../controllers/PatientDoctorAssignmentController");
const PatientDoctorAssignmentMiddleware = require("../middlewares/PatientDoctorAssignmentMiddleware");
const {
  commonMiddleware,
  roleGroup,
} = require("../middlewares/CommonMiddleware");

const router = express.Router();

router.get("", commonMiddleware.validationToken, PatientDoctorAssignmentController.getAllAssignment);
router.get(
  "/patient/:doctor_id",
  commonMiddleware.validationToken,
  PatientDoctorAssignmentMiddleware.checkByDoctorId,
  PatientDoctorAssignmentController.getPatientByDoctorId
);

router.get(
  "/doctor/:patient_id",
  commonMiddleware.validationToken,
  PatientDoctorAssignmentController.getDoctorByPatientId
);

module.exports = router;
