const CommonService = require("./CommonService");
const PatientDoctorAssignmentRepository = require("../models/PatientDoctorAssignModel/PatientDoctorAssignmentRepository");
const UserRepository = require("../models/UserModel/UserRepository");

class PatientDoctorAssignmentService extends CommonService {
  async getAll() {
    const assignments = await PatientDoctorAssignmentRepository.getAllData();
    const total = assignments.length;
    for (let i = 0; i < total; i++) {
      const patient = await UserRepository.getUserById(
        assignments[i].dataValues.patient_id
      );
      const doctor = await UserRepository.getUserById(
        assignments[i].dataValues.doctor_id
      );
      assignments[i].dataValues = {
        ...assignments[i].dataValues,
        patient_name: patient[0].dataValues.username,
        doctor_name: doctor[0].dataValues.username,
      };
    }
    return assignments;
  }

  async checkByDoctorId(doctor_id) {
    return await PatientDoctorAssignmentRepository.checkByDoctorId(doctor_id);
  }

  async getPatientByDoctorId(doctor_id) {
    return await PatientDoctorAssignmentRepository.getPatientByDoctorId(
      doctor_id
    );
  }
  async getDoctorByPatientId(patient_id) {
    return await PatientDoctorAssignmentRepository.getDoctorByPatientId(
      patient_id
    );
  }
}

module.exports = new PatientDoctorAssignmentService();
