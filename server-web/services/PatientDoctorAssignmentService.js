const CommonService = require("./CommonService");
const PatientDoctorAssignmentRepository = require("../models/PatientDoctorAssignModel/PatientDoctorAssignmentRepository");

class PatientDoctorAssignmentService extends CommonService {
  async checkByDoctorId(doctor_id) {
    return await PatientDoctorAssignmentRepository.checkByDoctorId(doctor_id);
  }

  async getPatientByDoctorId(doctor_id) {
    return await PatientDoctorAssignmentRepository.getPatientByDoctorId(
      doctor_id
    );
  }
}

module.exports = new PatientDoctorAssignmentService();
