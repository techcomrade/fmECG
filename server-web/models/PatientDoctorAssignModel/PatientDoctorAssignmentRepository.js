const PatientDoctorAssignmentDTO = require("./PatientDoctorAssignmentDTO");
const Sequelize = require("sequelize");
const sequelize = require("../../config/sequelize");
const { QueryTypes } = require("sequelize");

class PatientDoctorAssignmentModel {
  async getAllData() {
    return await PatientDoctorAssignmentDTO.findAll();
  }

  async checkByDoctorId(doctor_id) {
    return await PatientDoctorAssignmentDTO.findAll({
      where: {
        doctor_id: doctor_id,
      },
    });
  }

  async getPatientByDoctorId(doctor_id) {
    return await sequelize.query(
      "SELECT user.* FROM fmecg.users as user JOIN fmecg.patient_doctor_assignment pda ON user.id = pda.patient_id WHERE pda.doctor_id = :doctor",
      {
        replacements: { doctor: doctor_id },
        type: QueryTypes.SELECT,
      }
    );
  }

  async getDoctorByPatientId(patient_id){
    return await sequelize.query(
      "SELECT user.* FROM fmecg.users as user JOIN fmecg.patient_doctor_assignment pda ON user.id = pda.doctor_id WHERE pda.patient_id = :patient",
      {
        replacements: { patient: patient_id },
        type: QueryTypes.SELECT,
      }
    );

  }

  async deleteById(id, t) {
    return await PatientDoctorAssignmentDTO.destroy(
      {
        where: {
          id: id,
        },
      },
      t && {
        transaction: t,
      }
    );
  }
}

module.exports = new PatientDoctorAssignmentModel();
