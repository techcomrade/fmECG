const express = require('express');
const app = express();
const path = require('path');
const route = require('./Routes/route');
const authRoute = require('./Routes/authRoute');
const usersRoute = require('./Routes/usersRoute');
const newsRoute = require('./Routes/newsRoute');
const ecgRecordsRoute = require('./Routes/ecgRecordRoute');
const dasboardHelperRoute = require('./Routes/dasboardHelperRoute');

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const dotenv = require('dotenv');
const sequelize = require('./util/db');
const adminRouter = require('./AdminJs/admin.config.js');
const expressLayouts = require('express-ejs-layouts');


app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'Views'));
// app.set('layout', 'layout/layout');
app.use(express.static(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'dist')));

// app.use(express.static('public'));



dotenv.config({
    path:'./config.env',
});


sequelize.sync().then(result => {
    console.log('Connect to DB success');
    // console.log(result);
}).catch(err => {
    // console.log('err');
    console.log(err);
});

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', authRoute);
app.use('/users', usersRoute);
app.use('/news', newsRoute);
app.use('/ecg-records', ecgRecordsRoute);
app.use('/admin', adminRouter);
app.use('/', dasboardHelperRoute);


// app.get('/dashboard-data', async (req, res) => {
//     try {
//       const doctorCount = await User.countDocuments({ role: 1 });
//       const patientCount = await User.countDocuments({ role: 0 });
//       const newsCount = await News.countDocuments({});
//       const ecgCount = await EcgRecord.countDocuments({});
  
//       const dashboardData = {
//         doctorCount,
//         patientCount,
//         newsCount,
//         ecgCount,
//       };
  
//       res.json(dashboardData);
//     } catch (error) {
//       // Xử lý lỗi nếu cần
//       console.log("error");
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   });



module.exports = app;