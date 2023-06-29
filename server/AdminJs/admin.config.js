const AdminJS = require('adminjs');
const { News, NewsCategory } = require('../Models/newsModel.js');
const User = require('../Models/userModel.js');
const EcgRecords = require('../Models/ecgRecordModel.js');
const AdminJSExpress = require('@adminjs/express');
const AdminJSSequelize = require('@adminjs/sequelize');
const { ComponentLoader } = require('adminjs');
const componentLoader = new ComponentLoader();
const PatientDoctorAssignment = require('../Models/patientDoctorAssignmentModel.js');


const Components = {
  Dashboard: componentLoader.add('Dashboard', '../Views/pages/Dashboard.jsx'),
  // PatientDoctorAssignmentNew: componentLoader.override('DefaultNewAction', '../Views/pages/AddFormPatientDoctorAssignment'),
  PatientDoctorAssignmentDoctorIDProp: componentLoader.add('PatientDoctorAssignmentDoctorIDProp', '../Views/pages/PropertyDoctorIDAssignment.jsx'),
  PatientDoctorAssignmentPatientIDProp: componentLoader.add('PatientDoctorAssignmentPatientIDProp', '../Views/pages/PropertyPatientIDAssignment.jsx'),

  // other custom components
};

AdminJS.registerAdapter({
  Resource: AdminJSSequelize.Resource,
  Database: AdminJSSequelize.Database,
});



const UserResource = {
  resource: User,
  options: {
    parent: null,
    navigation: false,
    properties: {
      user_id: {
        position: 1,
        isVisible: { list: true, edit: false, filter: false, show: true },
      },
      name: {
        position: 2,
        isVisible: { list: true, edit: true, filter: false, show: true  },
      },
      email: {
        position: 3,
        isVisible: { list: true, edit: false, filter: false, show: true  },
      },
      phone_number: {
        position: 4,
        isVisible: { list: true, edit: true, filter: false, show: true  },
      },
      doB: {
        position: 5,
        isVisible: { list: true, edit: true, filter: false, show: true },
      },
      role: {
        position: 6,
        isVisible: { list: true, edit: false, filter: true, show: true  },
        isRequired: true,
        availableValues: [
          { value: 0, label: 'Patient' },
          { value: 1, label: 'Doctor' },
          { value: 2, label: 'Admin' },
        ],
      },
    },
   
  },

};

const NewsResource = {
  resource: News,
  options: {
    parent: {
      icon: 'newspaper',
    },
  },
};

const NewsCategoryResource = {
  resource: NewsCategory,
  options: {
    parent: {
      icon: 'Category',
    },
  },
};



const customDoctorBefore = (request, context) => {
  const { query = {} } = request
  const newQuery = {
    ...query,
    ['filters.role']: 1,
  }

  request.query = newQuery

  return request
}

const customPatientBefore = (request, context) => {
  const { query = {} } = request
  const newQuery = {
    ...query,
    ['filters.role']: 0,
  }

  request.query = newQuery

  return request
}

const customAdminBefore = (request, context) => {
  const { query = {} } = request
  const newQuery = {
    ...query,
    ['filters.role']: 2,
  }

  request.query = newQuery

  return request
}


const DoctorResource = {
  resource: User,
  options: {
    id: 'Doctor',
    parent: {
      icon: 'User',
    },
    properties: {
      user_id: {
        position: 1,
        isVisible: { list: true, edit: false, filter: false, show: true },
      },
      name: {
        position: 2,
        isVisible: { list: true, edit: true, filter: false, show: true  },
      },
      email: {
        position: 3,
        isVisible: { list: true, edit: true, filter: false, show: true },
      },
      phone_number: {
        position: 4,
        isVisible: { list: true, edit: true, filter: false, show: true  },
      },
      doB: {
        position: 5,
        isVisible: { list: true, edit: true, filter: false, show: true },
      },
      role: {
        isVisible: { list: true, filter: false, show: true },
        position: 6,
        isRequired: true,
        availableValues: [
          { value: 1, label: 'Doctor' },
        ],
      },
    },

    actions: {
      list: {
        before:[customDoctorBefore],
      },
    },

  },


};

const AdminResource = {
  resource: User,
  options: {
    id: 'Admin',
    parent: {
      icon: 'User',
    },
    properties: {
      user_id: {
        position: 1,
        isVisible: { list: true, edit: false, filter: false, show: true },
      },
      name: {
        position: 2,
        isVisible: { list: true, edit: true, filter: false, show: true  },
      },
      email: {
        position: 3,
        isVisible: { list: true, edit: false, filter: false, show: true  },
      },
      phone_number: {
        position: 4,
        isVisible: { list: true, edit: true, filter: false, show: true  },
      },
      doB: {
        position: 5,
        isVisible: { list: true, edit: true, filter: false, show: true },
      },
      role: {
        isVisible: { list: true, filter: true, show: true },
        position: 6,
        isRequired: true,
        availableValues: [
          { value: 2, label: 'Admin' },
        ],
      },
    },
    actions: {
      list: {
        before:[customAdminBefore],
      },
      new: { isVisible: true },
      delete: { isVisible: true },
      edit: { isVisible: true },
    },
    filter: { role: 2 },
  },
};

const PatientResource = {
  resource: User,
  options: {
    id: 'Patient',
    parent: {
      icon: 'User',
    },
    properties: {
      user_id: {
        position: 1,
        isVisible: { list: true, edit: false, filter: false, show: true },
      },
      name: {
        position: 2,
        isVisible: { list: true, edit: true, filter: false, show: true  },
      },
      email: {
        position: 3,
        isVisible: { list: true, edit: false, filter: false, show: true  },
      },
      phone_number: {
        position: 4,
        isVisible: { list: true, edit: true, filter: false, show: true  },
      },
      doB: {
        position: 5,
        isVisible: { list: true, edit: true, filter: false, show: true },
      },
      role: {
        isVisible: { list: true, filter: false, show: true },
        position: 6,
        isRequired: true,
        availableValues: [
          { value: 0, label: 'Patient' },
        ],
      },
    },
    actions: {
      list: {
        before:[customPatientBefore],
      },
      new: { isVisible: true },
      delete: { isVisible: true },
      edit: { isVisible: true },
    },
    filter: { role: 0 },
  },
};


const EcgRecordsResource = {
  resource: EcgRecords,
  options: {
    parent: {
      icon: 'List',
    },
  },
};

const PatientDoctorAssignmentResource = {
  resource: PatientDoctorAssignment,
  options: {
    parent: {
      icon: 'Assignment',
    },
    properties: {
      assign_id: {
         isVisible: { list: true, show: true },
        position: 1 },
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
         isVisible: { list: true, show: true, edit: true } },
    },
    actions: {
      new: {
        // before: [customDocto2rBefore],
        before: async (request, context) => {
         try {
          console.log('before ok');
         } catch (err) {
          console.log(err);
         }
        // const selectedPatientId = request.payload.doctor_id;
        // const { selectedPatientId } = request.payload;
        const { selectedDoctorEmail } = request.payload;
    
        console.log("selectedPatientId: ", selectedDoctorEmail);
        // const selectedUserId = 1;
        // request.payload.doctor_id = selectedUserId;

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


const adminJsOptions = {
  resources: [
    DoctorResource,
    AdminResource,
    PatientResource,
    NewsResource,
    NewsCategoryResource,
    EcgRecordsResource,
    PatientDoctorAssignmentResource,
    UserResource
  ],
  dashboard: {
    component: Components.Dashboard,
  },
  componentLoader,
  branding: {
    companyName: 'ECG',
    logo: false,
    withMadeWithLove: false
  }
};



const admin = new AdminJS(adminJsOptions);
admin.watch();




// const router = AdminJS.createRouter(admin);
const adminRouter = AdminJSExpress.buildRouter(admin);
module.exports = adminRouter;

