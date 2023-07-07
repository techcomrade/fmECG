const User = require('../Models/userModel');
const PatientDoctorAssignment = require('../Models/patientDoctorAssignmentModel');

exports.getPatientsByDoctor = async (req, res) => {
  try {
    const doctorId = req.params.doctorId;
    const page = req.query.page || 1; // Current page number
    const limit = req.query.limit || 10; // Number of patients per page

    // Calculate the offset based on the page and limit
    const offset = (page - 1) * limit;

    // Query the patient-doctor assignments with pagination
    const assignments = await PatientDoctorAssignment.findAndCountAll({
      where: { doctor_id: doctorId },
      offset,
      limit,
    });

    // Extract the patient ids from the assignments
    const patientIds = assignments.rows.map((assignment) => assignment.patient_id);

    // Query the users (patients) with the extracted patient ids
    const patients = await User.findAll({
      where: { user_id: patientIds },
      attributes: ['user_id', 'name', 'email', 'phone_number', 'role', 'doB'],
    });

    res.status(200).json({ status: 'success', count: assignments.count, data: patients });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', msg: 'An error occurred while retrieving the patients' });
  }
};



exports.getDoctorByPatient = async (req, res) => {
  try {
    const patientId = req.params.patientId;

    // Query the patient-doctor assignment to get the doctor_id
    const assignment = await PatientDoctorAssignment.findOne({
      where: { patient_id: patientId },
    });

    if (!assignment) {
      return res.status(404).json({ status: 'error', msg: 'Patient not found' });
    }

    const doctorId = assignment.doctor_id;

    // Query the user (doctor) with the doctor_id
    const doctor = await User.findOne({
      where: { user_id: doctorId },
      attributes: ['user_id', 'name', 'email', 'phone_number', 'role', 'doB'],
    });

    res.status(200).json({ status: 'success', data: doctor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', msg: 'An error occurred while retrieving the doctor' });
  }
};

  