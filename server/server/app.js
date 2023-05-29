const express = require('express');
const app = express();
const path = require('path');
const route = require('./Routes/route');
const authRoute = require('./Routes/authRoute');
const usersRoute = require('./Routes/usersRoute');
const newsRoute = require('./Routes/newsRoute');
const ecgRecordsRoute = require('./Routes/ecgRecordRoute');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const dotenv = require('dotenv');
const sequelize = require('./util/db');

dotenv.config({
    path:'./config.env',
});


sequelize.sync().then(result => {
    console.log('Connect to DB success');
    // console.log(result);
}).catch(err => {
    console.log('err');
    // console.log(err);
});

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', authRoute);
app.use('/users', usersRoute);
app.use('/news', newsRoute);
app.use('/ecg-records', ecgRecordsRoute);

module.exports = app;