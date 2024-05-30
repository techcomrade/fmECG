const PatientDoctorAssignmentDTO = require("./PatientDoctorAssignmentDTO");
const Sequelize = require("sequelize");
const sequelize = require("../../config/sequelize");
const { QueryTypes } = require("sequelize");

class PatientDoctorAssignmentModel {
  async createAssigment(assignment) {
    return await PatientDoctorAssignmentDTO.create({
      id: assignment.id,
      patient_id: assignment.patient_id,
      doctor_id: assignment.doctor_id,
      start_date: assignment.start_date,
      created_at: Date.now(),
      updated_at: Date.now(),
    });
  }

  async getAllData() {
    return await PatientDoctorAssignmentDTO.findAll();
  }

  async checkAssignmentByDoctorId(doctor_id) {
    return await PatientDoctorAssignmentDTO.findAll({
      where: {
        doctor_id: doctor_id,
      },
    });
  }

  async checkAssignmentByPatientId(patient_id) {
    return await PatientDoctorAssignmentDTO.findAll({
      where: {
        patient_id: patient_id,
      },
    });
  }

  async getPatientByDoctorId(doctor_id) {
    return await sequelize.query(
      "SELECT * FROM fmecg.users JOIN fmecg.patient_doctor_assignment pda ON users.id = pda.patient_id WHERE pda.doctor_id = :doctor",
      {
        replacements: { doctor: doctor_id },
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
