

const PatientDoctorAssignment = require('../../Models/patientDoctorAssignmentModel.js');
const {Components} = require('../Component/CustomComponent.js')


const PatientDoctorAssignmentResource = {
    resource: PatientDoctorAssignment,
    options: {
      parent: {
        // icon: 'Assignment',
      },
      properties: {
        assign_id: {
          isVisible: { list: true, show: true },
          position: 1
        },
        patient_id: {
          position: 3,
          isVisible: { list: true, show: true, edit: true },
          components: {
            edit: Components.PatientDoctorAssignmentPatientIDProp, // this is our custom component
          },
          props: {
            onChange: 'onChange',
          },
  
        },
        doctor_id: {
          position: 2,
          isVisible: { list: true, show: true, edit: true },
          components: {
            edit: Components.PatientDoctorAssignmentDoctorIDProp, // this is our custom component
          },
          props: {
            onChange: 'onChange',
          },
  
        },
        start_date: {
          position: 4,
          isVisible: { list: true, show: true, edit: true }
        },
      },
      actions: {
        new: {
          // before: [customDocto2rBefore],
          before: async (request, context) => {
            const { selectedDoctorEmail } = request.payload;
            console.log("selectedPatientId: ", selectedDoctorEmail);
            return request;
          },
          
          after: async (request, context) => {
            try {
              console.log('after ok');
            } catch (err) {
              console.log(err);
            }
  
            return request;
          },
        },
        // component: Components.PatientDoctorAssignmentNew,
        delete: { isVisible: true },
        edit: {
  
        },
      },
  
  
  
    },
  };

  module.exports = PatientDoctorAssignmentResource