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
      end_date: assignment.end_date,
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
      "SELECT user.* FROM fmecg.users as user JOIN fmecg.patient_doctor_assignment pda ON user.id = pda.patient_id WHERE pda.doctor_id = :doctor",
      {
        replacements: { doctor: doctor_id },
        type: QueryTypes.SELECT,
      }
    );
  }

  async getDoctorByPatientId(patient_id) {
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
  async updateById(assignment) {
    return await PatientDoctorAssignmentDTO.update(
      {
        // patient_id: assignment.patient_id,
        doctor_id: assignment.doctor_id,
        start_date: assignment.start_date,
        end_date: assignment.end_date,
        updated_at: Date.now(),
      },
      {
        where: {
          id: assignment.id,
        },
      }
    );
  }
}

module.exports = new PatientDoctorAssignmentModel();
