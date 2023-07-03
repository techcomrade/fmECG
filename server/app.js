const express = require('express');
const app = express();
const path = require('path');
// const route = require('./Routes/route');
const authRoute = require('./Routes/authRoute');
const usersRoute = require('./Routes/usersRoute');
const newsRoute = require('./Routes/newsRoute');
const ecgRecordsRoute = require('./Routes/ecgRecordRoute');
const dasboardHelperRoute = require('./Routes/dasboardHelperRoute');

const cookieParser = require('cookie-parser');
// const bodyParser = require('body-parser');
// const mysql = require('mysql');
const dotenv = require('dotenv');
const sequelize = require('./util/db');
const adminRouter = require('./AdminJs/admin.config.js');
const expressLayouts = require('express-ejs-layouts');
const fs = require('fs')
const XLSX = require("xlsx");


//----------
const multer = require('multer');
const upload = multer({ dest: 'upload/news/image' }); // Định nghĩa nơi lưu trữ hình ảnh tải lên

app.post('/upload/news/image', upload.single('image'), (req, res) => {
  // Tạo URL của hình ảnh tải lên
  const fileExtension = path.extname(req.file.originalname);
  const newFileName = `${req.file.filename}${fileExtension}`;
  const newFilePath = path.join(req.file.destination, newFileName);

  fs.renameSync(req.file.path, newFilePath);

  const imageUrl = `/upload/news/image/${newFileName}`;

  console.log(imageUrl);
  res.json(imageUrl);
});

app.use('/upload/news/image', express.static(path.join(__dirname, 'upload/news/image')));
app.use('/upload/record-data', express.static(path.join(__dirname, 'upload/record-data')));

//-------------







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
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(bodyParser.json())
app.use('/', authRoute);
app.use('/users', usersRoute);
app.use('/news', newsRoute);
app.use('/ecg-records', ecgRecordsRoute);
app.use('/admin', adminRouter);
app.use('/', dasboardHelperRoute);

app.use(express.json());

app.use(express.urlencoded({ extended: false }));
// app.use(express.json())


//-----------------------
app.post("/convert-excel-to-json", (req, res) => {
    const { filePath } = req.body;
  
    if (!filePath) {
      return res.status(400).json({ error: "Missing filePath parameter" });
    }
  
    try {
      const workbook = XLSX.readFile(filePath);
      const sheetName = workbook.SheetNames[0]; // Assume data is in the first sheet
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  
      // Convert the data to the desired format for the chart
      const chartData = jsonData.slice(1).map((row) => ({
        time: row[0],
        data1: row[1],
        data2: row[2],
        data3: row[3],
      }));
      console.log(chartData);
      res.json({ data: chartData });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred while converting Excel to JSON" });
    }
  });

//-----------------------


module.exports = app;