const PatientDoctorAssignmentService = require("../services/PatientDoctorAssignmentService");

class PatientDoctorAssignmentController {
  async getPatientByDoctorId(req, res, nex) {
    console.log(`[P]::: Get patient by doctor id: `, req.params.doctor_id);
    try {
      const patient = await PatientDoctorAssignmentService.getPatientByDoctorId(
        req.params.doctor_id
      );
      return res.status(200).json({
        message: "Get patient by doctor id successful!",
        metadata: patient,
      });
    } catch (err) {
      return res.status(500).json({
        message: "Error when get patient by doctor id!",
      });
    }
  }
}
module.exports = new PatientDoctorAssignmentController();
