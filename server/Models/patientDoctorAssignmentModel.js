const { DataTypes } = require('sequelize');
const sequelize = require('../util/db');
const User = require('./userModel');

const PatientDoctorAssignment = sequelize.define('patient_doctor_assignment', {
  assign_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  patient_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User.scope('patient'),
      key: 'user_id',
    },
  },
  doctor_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User.scope('doctor'),
      key: 'user_id',
    },
  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  updatedAt: 'updated_at',
  createdAt: 'created_at',
  tableName: 'patient_doctor_assignment'
});

module.exports = PatientDoctorAssignment;
