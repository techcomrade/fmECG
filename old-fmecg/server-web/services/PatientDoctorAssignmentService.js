const CommonService = require("./CommonService");
const PatientDoctorAssignmentRepository = require("../models/PatientDoctorAssignModel/PatientDoctorAssignmentRepository");
const UserRepository = require("../models/UserModel/UserRepository");
const { v4: uuidv4 } = require("uuid");
const Joi = require("joi");

class PatientDoctorAssignmentService extends CommonService {
  async createAssignment(assignment) {
    assignment.id = uuidv4();
    return PatientDoctorAssignmentRepository.createAssigment(assignment);
  }
  async updateAssignment(assignment){
    return PatientDoctorAssignmentRepository.updateById(assignment);
  }
  validateAssignment(assigment) {
    const schema = Joi.object({
      patient_id: Joi.string(),
      doctor_id: Joi.string(),
      start_date: Joi.number().required(),
      end_date: Joi.number(),
    });
    return schema.validate(assigment);
  }

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

  async checkAssignmentByDoctorId(doctor_id) {
    return await PatientDoctorAssignmentRepository.checkAssignmentByDoctorId(
      doctor_id
    );
  }

  async checkAssignmentByPatientId(patient_id) {
    return await PatientDoctorAssignmentRepository.checkAssignmentByPatientId(
      patient_id
    );
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
  async deleteAssignmentById(id){
    return await PatientDoctorAssignmentRepository.deleteById(id);
  }
}

module.exports = new PatientDoctorAssignmentService();
