const PatientDoctorAssignmentService = require("../services/PatientDoctorAssignmentService");

class PatientDoctorAssignmentMiddleware {
  async checkByDoctorId(req, res, next) {
    const patient = await PatientDoctorAssignmentService.checkByDoctorId(
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
