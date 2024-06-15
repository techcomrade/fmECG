const PatientDoctorAssignmentService = require("../services/PatientDoctorAssignmentService");
const UserService = require("../services/UserService");

class PatientDoctorAssignmentMiddleware {
  validateAssignment(req, res, next) {
    const validation = PatientDoctorAssignmentService.validateAssignment(
      req.body
    ).error;
    if (validation === undefined) {
      console.log("Validate successful!");
      next();
    } else {
      return res.status(400).json({
        message: validation.details[0].message,
      });
    }
  }

  async checkAssignmentByPatientId(req, res, next) {
    const checkAssignment =
      await PatientDoctorAssignmentService.checkAssignmentByPatientId(
        req.body.patient_id
      );
    if (checkAssignment[0] != undefined)
      return res.status(400).json({
        message: "This patient has already had a doctor, please try again!",
      });
    next();
  }

  async checkPatientById(req, res, next) {
    const checkPatient = await UserService.getUserById(req.body.patient_id);
    if (!checkPatient)
      return res.status(404).json({
        message: "No patient found!",
      });
    if (checkPatient[0].dataValues.role === 1)
      return res.status(400).json({
        message: "Confusing patient id with doctor id, please try again",
      });
    next();
  }

  async checkDoctorById(req, res, next) {
    const checkDoctor = await UserService.getUserById(req.body.doctor_id);
    if (!checkDoctor)
      return res.status(404).json({
        message: "No doctor found!",
      });
    if (checkDoctor[0].dataValues.role === 0)
      return res.status(400).json({
        message: "Confusing doctor id with patient id, please try again",
      });
    next();
  }

  async checkAssignmentByDoctorId(req, res, next) {
    const patient =
      await PatientDoctorAssignmentService.checkAssignmentByDoctorId(
        req.params.doctor_id
      );
    if (patient.length === 0)
      return res.status(404).json({
        message: "No assigment found!",
      });
    next();
  }
}
module.exports = new PatientDoctorAssignmentMiddleware();
