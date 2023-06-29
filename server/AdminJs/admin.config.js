const AdminJS = require('adminjs');
const { News, NewsCategory } = require('../Models/newsModel.js');
const User = require('../Models/userModel.js');
const EcgRecords = require('../Models/ecgRecordModel.js');
const AdminJSExpress = require('@adminjs/express');
const AdminJSSequelize = require('@adminjs/sequelize');
const { ComponentLoader } = require('adminjs');
const componentLoader = new ComponentLoader();
const PatientDoctorAssignment = require('../Models/patientDoctorAssignmentModel.js');
const { ValidationError } = require('adminjs');
const bcrypt = require("bcryptjs");


const Components = {
  Dashboard: componentLoader.add('Dashboard', '../Views/pages/Dashboard.jsx'),
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
        isVisible: { list: true, edit: true, filter: false, show: true },
      },
      email: {
        position: 3,
        isVisible: { list: true, edit: false, filter: false, show: true },
      },
      phone_number: {
        position: 4,
        isVisible: { list: true, edit: true, filter: false, show: true },
      },
      doB: {
        position: 5,
        isVisible: { list: true, edit: true, filter: false, show: true },
      },
      role: {
        position: 6,
        isVisible: { list: true, edit: false, filter: true, show: true },
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
      // icon: 'newspaper',
    },
  },
};

const NewsCategoryResource = {
  resource: NewsCategory,
  options: {
    parent: {
      // icon: 'Category',
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
      // icon: 'User',
    },
    properties: {
      user_id: {
        position: 1,
        isVisible: { list: true, edit: false, filter: false, show: true },
      },
      name: {
        position: 2,
        isVisible: { list: true, edit: true, filter: false, show: true },
      },
      email: {
        position: 3,
        isVisible: { list: true, edit: true, filter: false, show: true },
      },
      phone_number: {
        position: 4,
        isVisible: { list: true, edit: true, filter: false, show: true },
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
        before: [customDoctorBefore],
      },
      new: {
        before: async (request, context) => {
          request.payload.role = 1;
          const email = request.payload.email;
          const existingDoctor = await User.findOne({ where: { email } });
          const errors = {}
          if (existingDoctor) {
            console.log(existingDoctor)
            errors.email = {
              message: 'Email existed',
            }
          }

          const phoneNumber = request.payload.phone_number;
          const phoneRegex = /^\d{10,15}$/;
          if (!phoneRegex.test(phoneNumber)) {
            errors.phone_number = {
              message: 'Phone number invalid',
            }
          }

          const password = request.payload.password;
          if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            request.payload.password = hashedPassword;
          }
          if (Object.keys(errors).length) {
            throw new ValidationError(errors)
          }
          return request;
        },
        isVisible: true
      },
      edit: {
        before: async (request, context) => {
          const errors = {};

          const phoneNumber = request.payload.phone_number;
          if (phoneNumber) {
            const phoneRegex = /^\d{10,15}$/;
            if (!phoneRegex.test(phoneNumber)) {
              errors.phone_number = {
                message: 'Phone number invalid',
              }
            }
          }

          const existingDoctor = await User.findByPk(request.params.recordId);
          const password = request.payload.password;
          if (password && password !== existingDoctor.password) {
            const hashedPassword = await bcrypt.hash(password.toString(), 10);
            request.payload.password = hashedPassword;
          }

          
          if (Object.keys(errors).length) {
            throw new ValidationError(errors)
          }
          return request;
        },
        
        isVisible: true
      },
      delete: { isVisible: true },
    },

  },


};

const AdminResource = {
  resource: User,
  options: {
    id: 'Admin',
    parent: {
      // icon: 'User',
    },
    properties: {
      user_id: {
        position: 1,
        isVisible: { list: true, edit: false, filter: false, show: true },
      },
      name: {
        position: 2,
        isVisible: { list: true, edit: true, filter: false, show: true },
      },
      email: {
        position: 3,
        isVisible: { list: true, edit: false, filter: false, show: true },
      },
      phone_number: {
        position: 4,
        isVisible: { list: true, edit: true, filter: false, show: true },
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
        before: [customAdminBefore],
      },
      new: {
        before: async (request, context) => {
          request.payload.role = 2;
          const email = request.payload.email;
          const existingDoctor = await User.findOne({ where: { email } });
          const errors = {}
          if (existingDoctor) {
            console.log(existingDoctor)
            errors.email = {
              message: 'Email existed',
            }
          }

          const phoneNumber = request.payload.phone_number;
          const phoneRegex = /^\d{10,15}$/;
          if (!phoneRegex.test(phoneNumber)) {
            errors.phone_number = {
              message: 'Phone number invalid',
            }
          }

          const password = request.payload.password;
          const hashedPassword = await bcrypt.hash(password, 10);
          request.payload.password = hashedPassword;
          if (Object.keys(errors).length) {
            throw new ValidationError(errors)
          }
          return request;
        },
        isVisible: true
      },
      delete: { isVisible: true },
      edit: {
        before: async (request, context) => {
          const errors = {};

          const phoneNumber = request.payload.phone_number;
          if (phoneNumber) {
            const phoneRegex = /^\d{10,15}$/;
            if (!phoneRegex.test(phoneNumber)) {
              errors.phone_number = {
                message: 'Phone number invalid',
              }
            }
          }

          const existingDoctor = await User.findByPk(request.params.recordId);
          const password = request.payload.password;
          if (password && password !== existingDoctor.password) {
            const hashedPassword = await bcrypt.hash(password.toString(), 10);
            request.payload.password = hashedPassword;
          }

          
          if (Object.keys(errors).length) {
            throw new ValidationError(errors)
          }
          return request;
        },
        
        isVisible: true
      },
    },
    filter: { role: 2 },
  },
};

const PatientResource = {
  resource: User,
  options: {
    id: 'Patient',
    parent: {
      // icon: 'User',
    },
    properties: {
      user_id: {
        position: 1,
        isVisible: { list: true, edit: false, filter: false, show: true },
      },
      name: {
        position: 2,
        isVisible: { list: true, edit: true, filter: false, show: true },
      },
      email: {
        position: 3,
        isVisible: { list: true, edit: true, filter: false, show: true },
      },
      phone_number: {
        position: 4,
        isVisible: { list: true, edit: true, filter: false, show: true },
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
        before: [customPatientBefore],
      },
      new: {
        before: async (request, context) => {
          request.payload.role = 0;
          const email = request.payload.email;
          const existingDoctor = await User.findOne({ where: { email } });
          const errors = {}
          if (existingDoctor) {
            console.log(existingDoctor)
            errors.email = {
              message: 'Email existed',
            }
          }

          const phoneNumber = request.payload.phone_number;
          const phoneRegex = /^\d{10,15}$/;
          if (!phoneRegex.test(phoneNumber)) {
            errors.phone_number = {
              message: 'Phone number invalid',
            }
          }

          const password = request.payload.password;
          const hashedPassword = await bcrypt.hash(password, 10);
          request.payload.password = hashedPassword;
          if (Object.keys(errors).length) {
            throw new ValidationError(errors)
          }
          return request;
        },
        isVisible: true
      },
      delete: { isVisible: true },
      edit: {
        before: async (request, context) => {
          const errors = {};

          const phoneNumber = request.payload.phone_number;
          if (phoneNumber) {
            const phoneRegex = /^\d{10,15}$/;
            if (!phoneRegex.test(phoneNumber)) {
              errors.phone_number = {
                message: 'Phone number invalid',
              }
            }
          }

          const existingDoctor = await User.findByPk(request.params.recordId);
          const password = request.payload.password;
          if (password && password !== existingDoctor.password) {
            const hashedPassword = await bcrypt.hash(password.toString(), 10);
            request.payload.password = hashedPassword;
          }

          
          if (Object.keys(errors).length) {
            throw new ValidationError(errors)
          }
          return request;
        },
        
        isVisible: true
      },
    },
    filter: { role: 0 },
  },
};


const EcgRecordsResource = {
  resource: EcgRecords,
  options: {
    parent: {
      // icon: 'List',
    },
  },
};

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


const locale = {
  translations: {
    labels: {
      // change Heading for Login
      loginWelcome: 'Welcome',
    },
    messages: {
      loginWelcome: 'to ECG dashoard for Admin',
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
  locale,
  componentLoader,
  branding: {
    companyName: 'ECG',
    logo: false,
    withMadeWithLove: false,
    loginWelcome: "false"
  },
  loginPath: '/admin/login'
};



const admin = new AdminJS(adminJsOptions);
admin.watch();




// const adminRouter = AdminJSExpress.buildRouter(admin);

const DEFAULT_ADMIN = {
  email: 'admin@example.com',
  password: 'password',
}


const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
  admin,
  {
    authenticate: async (email, password) => {
      if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
        return { email: DEFAULT_ADMIN.email };
      }
      return null;
    },
    cookiePassword: 'password-used-to-encrypt-cookies',
  }, 
  null,
  {
    resave: false, 
    saveUninitialized: true,
  }
);

module.exports = adminRouter;

