const AdminJS = require('adminjs');
const AdminJSExpress = require('@adminjs/express');
const AdminJSSequelize = require('@adminjs/sequelize');
const {Components, componentLoader} = require('./Component/CustomComponent.js')
const EcgRecordsResource = require('./Resource/ecgResource.js');
const NewsCategoryResource = require('./Resource/newCategoryResource.js');
const NewsResource = require('./Resource/newsResource.js');

const PatientDoctorAssignmentResource = require('./Resource/patientDoctorAssignmentResource.js');
const UserResource = require('./Resource/userResource.js');
const PatientResource = require('./Resource/patientResource.js');
const DoctorResource = require('./Resource/doctorResource.js');
const AdminResource = require('./Resource/adminResource.js');



AdminJS.registerAdapter({
  Resource: AdminJSSequelize.Resource,
  Database: AdminJSSequelize.Database,
});


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

