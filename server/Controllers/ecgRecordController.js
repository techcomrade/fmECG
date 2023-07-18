const fs = require('fs');
const path = require('path');
const EcgRecord = require('../Models/ecgRecordModel');
const PatientDoctorAssignment = require('../Models/patientDoctorAssignmentModel');
const multer = require('multer');
const csv = require('fast-csv');


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

exports.getEcgRecordsByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 1000;

    const offset = (page - 1) * limit;

    const ecgRecords = await EcgRecord.findAndCountAll({
      where: { user_id: userId },
      offset,
      limit,
    });

    const totalCount = ecgRecords.count;
    const totalPages = Math.ceil(totalCount / limit);

    res.status(200).json({
      status: 'success',
      count: totalCount,
      totalPages: totalPages,
      currentPage: page,
      data: ecgRecords.rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', msg: 'An error occurred while retrieving ECG records' });
  }
};

exports.getEcgRecordsByDoctor = async (req, res) => {
  try {
    const doctorId = req.params.doctorId;

    const patientAssignments = await PatientDoctorAssignment.findAll({
      where: { doctor_id: doctorId },
      attributes: ['patient_id'],
      raw: true,
    });

    const patientIds = patientAssignments.map(({ patient_id }) => patient_id);

    const ecgRecords = await EcgRecord.findAll({
      where: { user_id: patientIds },
      attributes: ['user_id', 'record_id', 'device_id', 'data_directory', 'start_time', 'stop_time', 'sensor_type'],
      raw: true,
    });

    const recordsByUser = new Map();

    for (const record of ecgRecords) {
      const { user_id, ...rest } = record;
      if (recordsByUser.has(user_id)) {
        recordsByUser.get(user_id).records.push(rest);
        recordsByUser.get(user_id).count++;
      } else {
        recordsByUser.set(user_id, { records: [rest], count: 1 });
      }
    }

    const result = [];

    for (const [user_id, { records, count }] of recordsByUser.entries()) {
      const userEcgRecords = {
        user_id,
        count,
        data: records,
      };
      result.push(userEcgRecords);
    }

    res.status(200).json({ status: 'success', data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', msg: 'An error occurred while retrieving ECG records' });
  }
};


exports.convertExceltoJson = async (req, res) => {
  const { record_id} = req.params;

  const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 1000;
  if (!record_id) {
    return res.status(400).json({ error: "Missing record_id parameter" });
  }

  try {
    const ecgRecord = await EcgRecord.findOne({
      where: { record_id: record_id },
      attributes: ['data_directory']
    });

    if (!ecgRecord) {
      return res.status(404).json({ error: "EcgRecord not found" });
    }

    const filePath = ecgRecord.data_directory;
    let totalCount = 0;
    const chartData = [];
    let timeCounter = 0;

    fs.createReadStream(filePath)
      .pipe(csv.parse({ headers: false }))
      .on('error', error => {
        console.error(error);
        res.status(500).json({ error: "An error occurred while converting CSV to JSON" });
      })
      .on('data', row => {
        totalCount++;
        timeCounter++;

        if (totalCount > (page - 1) * limit && chartData.length < limit) {
          const entry = {
            timestamp: row.length === 3 ? timeCounter : parseFloat(row[0]),
            ch1: row[row.length === 3 ? 0 : 1],
            ch2: row[row.length === 3 ? 1 : 2],
            ch3: row[row.length === 3 ? 2 : 3]
          };

          chartData.push(entry);
        }
      })
      .on('end', () => {
        const totalPages = Math.ceil(totalCount / limit);
        res.status(200).json({
          status: 'success',
          count: totalCount,
          totalPages: totalPages,
          currentPage: page,
          data: chartData
        });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while converting CSV to JSON" });
  }
};