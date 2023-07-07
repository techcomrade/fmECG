const fs = require('fs');
const path = require('path');
const EcgRecord = require('../Models/ecgRecordModel');
const multer = require('multer');

// Create the upload directory if it doesn't exist
const uploadDir = path.join(__dirname, '../upload/record-data');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Create a multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

// Create a multer upload instance with the storage configuration
const upload = multer({ storage }).single('file');

exports.uploadEcgData = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      try {

        // Extract the user_id, device_id, start_time, stop_time, and type from the request body
        const { user_id, device_id, start_time, stop_time, sensor_type } = req.body;

        // Get the uploaded file information
        const { filename, destination } = req.file;

        // Create the device_id folder if it doesn't exist
        const deviceDirectory = path.join(uploadDir, device_id);
        if (!fs.existsSync(deviceDirectory)) {
          fs.mkdirSync(deviceDirectory, { recursive: true });
        }

        // Create the user_id-unix_timestamp folder
        const timestamp = Date.parse(start_time);
        const userDirectory = path.join(deviceDirectory, `${user_id}-${timestamp}`);
        if (!fs.existsSync(userDirectory)) {
          fs.mkdirSync(userDirectory, { recursive: true });
        }

        // Create the type folder
        // const typeDirectory = path.join(userDirectory, sensor_type);
        const typeDirectory = path.join(userDirectory, sensor_type.toUpperCase());
        if (!fs.existsSync(typeDirectory)) {
          fs.mkdirSync(typeDirectory, { recursive: true });
        }

        // Move the uploaded file to the type folder
        const newFilePath = path.join(typeDirectory, filename);
        fs.renameSync(req.file.path, newFilePath);

        const absoluteDataDirectory = path.resolve(uploadDir, newFilePath);
        const relativeDataDirectory = path.relative(uploadDir, newFilePath).replace(/\\/g, '/');
        // Create a new ECG record
        const newEcgRecord = await EcgRecord.create({
          user_id,
          device_id,
          data_directory: `upload/record-data/${relativeDataDirectory}`,
          start_time,
          stop_time,
          sensor_type: sensor_type.toUpperCase()
        });

        res.json({ status: 'success', data: newEcgRecord });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 'error', msg: 'An error occurred while uploading the file' });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', msg: 'An error occurred while saving ECG records' });
  }
};

