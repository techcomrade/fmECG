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
    console.log(`[G]::: Get all assignment: `);
    const assignments = await PatientDoctorAssignmentService.getAll();
    return res.status(200).json({
      message: "Get all data successful!",
      metadata: assignments,
    });
  }

  async getPatientByDoctorId(req, res, next) {
    console.log(`[G]::: Get patient by doctor id: `, req.params.doctor_id);
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
    console.log(`[G]::: Get doctor by patient id: `, req.params.patient_id);
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
  async updateAssignment(req,res){
    const assignment = req.body;
    console.log(`[P]::: Update assignment by id: `, assignment.id);
    try {
      await PatientDoctorAssignmentService.updateAssignment(assignment);
      return res.status(200).json({
        message: "Updated assignment successful!",
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Updated assignment failed!",
      });
    }

  }
  async deleteAssignmentById(req,res){
    console.log(`[D]::: Delete assignment by id: `,req.params.id);
    try {
      await PatientDoctorAssignmentService.deleteAssignmentById(req.params.id);
      return res.status(200).json({
        message: "Delete assignment successful!",
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Delete assignment failed!",
      });
    }
  }
}
module.exports = new PatientDoctorAssignmentController();
