const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const { v4: uuidv4 } = require('uuid');
const EcgRecord = require('../Models/ecgrecordModel');
const { isLogin } = require('./authcontroller');
const multer = require('multer');

// Create the upload directory if it doesn't exist
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Create a multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const originalExtension = path.extname(file.originalname);
    const filename = `${timestamp}${originalExtension}`;
    cb(null, filename);
  }
});
// Create a multer upload instance with the storage configuration
const upload = multer({ storage }).single('ecgdata');

exports.uploadEcgData = async (req, res) => {
  try {
    // TODO(TuanHA): Remove this comment 
    // Authenticate the user using the isLogin function from authcontroller
    // const isAuthenticated = await isLogin(req);
    // if (!isAuthenticated) {
    //   return res.status(401).json({ status: 'error', msg: 'Unauthorized' });
    // }

    // Use the multer upload instance to handle form-data
    upload(req, res, async (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ status: 'error', msg: 'An error occurred while uploading the file' });
      }

      // Extract the user_id, device_id, start_time, and stop_time from the request body
      const { user_id, device_id, start_time, stop_time } = req.body;

      // Get the uploaded file information
      const { filename, destination } = req.file;
      
      // Create the data_directory path
      const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).split('/').reverse().join('_');
      const deviceDirectory = path.join(destination, device_id);
      const dataDirectory = path.join(deviceDirectory, currentDate);
      
      // Create the device_id folder if it doesn't exist
      if (!fs.existsSync(deviceDirectory)) {
        fs.mkdirSync(deviceDirectory, { recursive: true });
      }
      
      // Create the yyyy_mm_dd folder if it doesn't exist
      if (!fs.existsSync(dataDirectory)) {
        fs.mkdirSync(dataDirectory, { recursive: true });
      }

      // Move the uploaded file to the data_directory
      const newFilePath = path.join(dataDirectory, filename);
      fs.renameSync(req.file.path, newFilePath);

      // Create a new ECG record
      const newEcgRecord = await EcgRecord.create({
        user_id,
        device_id,
        data_directory: newFilePath,
        start_time,
        stop_time
      });

      res.json({ status: 'success', data: newEcgRecord });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', msg: 'An error occurred while saving ECG records' });
  }
};

