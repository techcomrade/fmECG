const express = require('express');
const app = express();
const path = require('path');
const route = require('./Routes/route');
const authroute = require('./Routes/authroute');
const usersroute = require('./Routes/usersroute');
const cookieParser = require('cookie-parser');
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
app.use('/', authroute);
app.use('/users', usersroute);

module.exports = app;