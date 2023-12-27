const express = require('express');
const app = express();
const path = require('path');
const authRoute = require('./Routes/authRoute');
const usersRoute = require('./Routes/usersRoute');
const newsRoute = require('./Routes/newsRoute');
const ecgRecordsRoute = require('./Routes/ecgRecordRoute');
const dasboardHelperRoute = require('./Routes/dasboardHelperRoute');
const PatientDoctorAssignmentRoute = require('./Routes/patientDoctorAssignmentRoute');


const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const sequelize = require('./util/db');
const adminRouter = require('./AdminJs/admin.config.js');

app.set('views', path.join(__dirname, 'Views'));
app.use(express.static(__dirname + '/public'));

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

app.use(bodyParser.json())
app.use('/', authRoute);
app.use('/users', usersRoute);
app.use('/', newsRoute);
app.use('/ecg-records', ecgRecordsRoute);
app.use('/admin', adminRouter);
app.use('/', dasboardHelperRoute);
app.use('/', PatientDoctorAssignmentRoute);


app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use('/upload/news/image', express.static(path.join('', 'upload/news/image')));
app.use('/upload/record-data', express.static(path.join(__dirname, 'upload/record-data')));


module.exports = app;