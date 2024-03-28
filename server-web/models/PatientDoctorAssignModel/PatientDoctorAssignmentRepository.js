const PatientDoctorAssignmentDTO = require("./PatientDoctorAssignmentDTO");
class PatientDoctorAssignmentModel {
  async getAllData() {
    return await PatientDoctorAssignmentDTO.findAll();
  }
  async deleteById(id,t){
    return await PatientDoctorAssignmentDTO.destroy({
      where:{
        id:id
      }
    },
    t && {
      transaction: t,
    })
  }
}

module.exports = new PatientDoctorAssignmentModel();
