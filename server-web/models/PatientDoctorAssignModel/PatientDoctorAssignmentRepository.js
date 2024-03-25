const PatientDoctorAssignmentDTO = require("./PatientDoctorAssignmentDTO");
class PatientDoctorAssignmentModel {
  async getAllData() {
    return await PatientDoctorAssignmentDTO.findAll();
  }
}

module.exports = new PatientDoctorAssignmentModel();
