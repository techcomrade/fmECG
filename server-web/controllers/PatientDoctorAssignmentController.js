const PatientDoctorAssignmentService = require("../services/PatientDoctorAssignmentService");

class PatientDoctorAssignmentController {
  async getAllAssignment(req, res, nex) {
    console.log(`[P]::: Get all assignment: `);
    const assignments = await PatientDoctorAssignmentService.getAll();
    return res.status(200).json({
      message: "Get all data successful!",
      metadata: assignments,
    });
  }

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
  async getDoctorByPatientId(req,res) {
    console.log(`[P]::: Get doctor by patient id: `, req.params.patient_id);
    try {
      const patient = await PatientDoctorAssignmentService.getDoctorByPatientId(
        req.params.patient_id
      );
      return res.status(200).json({
        message: "Get doctor by patient id successful!",
        metadata: patient,
      });
    } catch (err) {
      return res.status(500).json({
        message: "Error when get doctor by patient id!",
      });
    }
  }
}
module.exports = new PatientDoctorAssignmentController();
