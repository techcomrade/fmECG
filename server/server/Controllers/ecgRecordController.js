import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { v4 as uuidv4 } from 'uuid';
import EcgRecord from '../Models/ecgRecordModel.js';
import { isLogin } from './authController.js';
import multer from 'multer';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, '../uploads');


if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

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

const upload = multer({ storage }).single('ecgdata');

export const uploadEcgData = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ status: 'error', msg: 'An error occurred while uploading the file' });
      }

      const { user_id, device_id, start_time, stop_time } = req.body;
      const { filename, destination } = req.file;

      const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).split('/').reverse().join('_');
      const deviceDirectory = path.join(destination, device_id);
      const dataDirectory = path.join(deviceDirectory, currentDate);

      if (!fs.existsSync(deviceDirectory)) {
        fs.mkdirSync(deviceDirectory, { recursive: true });
      }

      if (!fs.existsSync(dataDirectory)) {
        fs.mkdirSync(dataDirectory, { recursive: true });
      }

      const newFilePath = path.join(dataDirectory, filename);
      fs.renameSync(req.file.path, newFilePath);

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
