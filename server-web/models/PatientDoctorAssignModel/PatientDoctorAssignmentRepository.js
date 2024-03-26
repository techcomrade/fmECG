const PatientDoctorAssignmentDTO = require("./PatientDoctorAssignmentDTO");
class PatientDoctorAssignmentModel {
  async getAllData() {
    return await PatientDoctorAssignmentDTO.findAll();
  }
  async deleteById(id) {
    return await PatientDoctorAssignmentDTO.destroy({
      where: { id: id }
    });
  }
}

module.exports = new PatientDoctorAssignmentModel();
