const PatientDoctorAssignmentService = require("../services/PatientDoctorAssignmentService");

class PatientDoctorAssignmentController {
  async createAssigment(req, res, next) {
    const assigment = req.body;
    console.log(`[P]:::Create patient doctor assigment`, assigment);
    try {
      await PatientDoctorAssignmentService.createAssignment(assigment);
      return res.status(200).json({
        message: "Create assignment successful!",
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Create assignment failed!",
      });
    }
  }

  async getAllAssignment(req, res, next) {
    console.log(`[P]::: Get all assignment: `);
    const assignments = await PatientDoctorAssignmentService.getAll();
    return res.status(200).json({
      message: "Get all data successful!",
      metadata: assignments,
    });
  }

  async getPatientByDoctorId(req, res, next) {
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
