import { default as AdminJS } from 'adminjs';
import sequelize from '../util/db.js';
import { News, NewsCategory } from '../Models/newsModel.js';
import User from '../Models/userModel.js';
import EcgRecords from '../Models/ecgRecordModel.js';
import AdminJSExpress from '@adminjs/express'
// import AdminJS from 'adminjs'
import AdminJSSequelize from '@adminjs/sequelize';


AdminJS.registerAdapter({
  Resource: AdminJSSequelize.Resource,
  Database: AdminJSSequelize.Database,
});

const admin = new AdminJS({
  // Configure your options here
  // ...
  resources: [User, News, NewsCategory, EcgRecords],
  branding: {
    companyName: 'ECG',
    logo: false,
  }
});

// const router = AdminJS.createRouter(admin);
const adminRouter = AdminJSExpress.buildRouter(admin)
export default adminRouter;
