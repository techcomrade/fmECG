const User = require('../Models/userModel');
const { News } = require('../Models/newsModel');
const EcgRecord = require('../Models/ecgRecordModel');
const sequelize = require('../util/db');
const { Op } = require('sequelize');
const XLSX = require("xlsx");
const multer = require('multer');
const path = require('path');
const fs = require('fs')




exports.getDashboardData = async (req, res) => {
  try {
    const doctorCount = await User.count({ where: { role: 1 } });
    const patientCount = await User.count({ where: { role: 0 } });
    const newsCount = await News.count({});
    const ecgCount = await EcgRecord.count({});

    const dashboardData = {
      doctorCount,
      patientCount,
      newsCount,
      ecgCount,
    };

    res.json(dashboardData);
  } catch (error) {
    console.log("error");
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.getUserMileStatsDataByMonth = async (req, res) => {

  try {
    const today = new Date();
    const currentMonth = today.getMonth();
    const monthsInYear = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    const monthData = [];

    for (let i = 0; i <= currentMonth; i++) {
      const monthName = monthsInYear[i];
      const patientCount = await User.count({
        where: {
          role: {
            [Op.in]: [0] // role = 0 (patient) or role = 1 (doctor)
          },
          created_at: {
            [Op.gte]: new Date(today.getFullYear(), i, 1), // Start of the month
            [Op.lte]: new Date(today.getFullYear(), i + 1, 0) // End of the month
          }
        }
      });

      const doctorCount = await User.count({
        where: {
          role: {
            [Op.in]: [1] // role = 0 (patient) or role = 1 (doctor)
          },
          created_at: {
            [Op.gte]: new Date(today.getFullYear(), i, 1), // Start of the month
            [Op.lte]: new Date(today.getFullYear(), i + 1, 0) // End of the month
          }
        }
      });

      monthData.push({ name: `${monthName} ${today.getFullYear()}`, patient: patientCount, doctor: doctorCount });
    }

    res.json(monthData);
  } catch (error) {
    // Xử lý lỗi nếu cần
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.getUserMileStatsDataByWeek = async (req, res) => {

  try {
    const today = new Date();
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const weekData = [];

    for (let i = 0; i < 7; i++) {
      const previousDay = new Date(today);
      previousDay.setDate(today.getDate() - i);

      const dayName = daysOfWeek[previousDay.getDay()];
      const patientCount = await User.count({
        where: {
          role: {
            [Op.in]: [0] // role = 0 (patient) or role = 1 (doctor)
          },
          created_at: {
            [Op.gte]: new Date(previousDay.setHours(0, 0, 0, 0)), // Start of the day
            [Op.lte]: new Date(previousDay.setHours(23, 59, 59, 999)) // End of the day
          }
        }
      });

      const doctorCount = await User.count({
        where: {
          role: {
            [Op.in]: [1] // role = 0 (patient) or role = 1 (doctor)
          },
          created_at: {
            [Op.gte]: new Date(previousDay.setHours(0, 0, 0, 0)), // Start of the day
            [Op.lte]: new Date(previousDay.setHours(23, 59, 59, 999)) // End of the day
          }
        }
      });

      weekData.unshift({ name: dayName, patient: patientCount, doctor: doctorCount });
    }

    res.json(weekData);
  } catch (error) {
    // Xử lý lỗi nếu cần
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getListDoctorsProp = async (req, res) => {
  try {
    const doctors = await User.findAll({
      where: {
        role: 1
      },
      attributes: ['user_id', 'email', 'name']
    });
    res.json(doctors);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.getListPatientsProp = async (req, res) => {
  try {
    const patients = await User.findAll({
      where: {
        role: 0,
        user_id: {
          [Op.notIn]: sequelize.literal(
            `(SELECT patient_id FROM patient_doctor_assignment)`
          ),
        },
      },
      attributes: ['user_id', 'email', 'name'],
    });
    res.json(patients);
  } catch (error) {
    console.error('Error fetching patients:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.uploadNewsImage = async (req, res) => {
  try {
    const upload = multer({ dest: 'upload/news/image' }).single('image');

    upload(req, res, (err) => {
      try {

        // Tạo URL của hình ảnh tải lên
        const fileExtension = path.extname(req.file.originalname);
        const newFileName = `${req.file.filename}${fileExtension}`;
        const newFilePath = path.join(req.file.destination, newFileName);

        fs.renameSync(req.file.path, newFilePath);

        const imageUrl = `/upload/news/image/${newFileName}`;

        console.log(imageUrl);
        res.json(imageUrl);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 'error', msg: 'An error occurred while uploading the file' });
    }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', msg: 'An error occurred while handling the image upload' });
  }
};


exports.converExceltoJson = async (req, res) => {
  const { filePath } = req.body;
  if (!filePath) {
    return res.status(400).json({ error: "Missing filePath parameter" });
  }

  try {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0]; // Assume data is in the first sheet
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    const chartData = jsonData.map((row, index) => ({
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
}


