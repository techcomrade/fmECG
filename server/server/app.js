import express from 'express';
import authRoute from './Routes/authRoute.js';
import usersRoute from './Routes/usersRoute.js';
import newsRoute from './Routes/newsRoute.js';
import ecgRecordsRoute from './Routes/ecgRecordRoute.js';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import sequelize from './util/db.js';
import adminRouter from'./AdminJs/admin.config.js';
const app = express(); 


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

// module.exports = app;
export default app;
