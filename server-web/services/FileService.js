const multer = require("multer");
const maxSize = 2 * 1024 * 1024;
const fs = require("fs");
const credentials = require("../credentials.json");
const { google } = require("googleapis");

class FileUploader {
  constructor() {
    this.upload = null;
  }
  setStorageToMemory() {
    const storage = multer.memoryStorage();
    const fileFilter = (req, file, cb) => {
      if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        console.log("valid");
        cb(null, true);
      } else {
        console.log("invalid");
        req.uploadFileError = true;
        cb(null, false);
      }
    };
    this.upload = multer({
      storage: storage,
      limits: { fileSize: maxSize },
      fileFilter: fileFilter,
    });
  }

  setStorageToDisk() {
    let storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, "./public/upload/");
      },
      filename: (req, file, cb) => {
        console.log(file.originalname);
        cb(null, file.originalname);
      },
    });

    const fileFilter = (req, file, cb) => {
      if (
        file.mimetype.includes("csv") ||
        file.mimetype === "text/plain" ||
        file.mimetype === "audio/wav"
      ) {
        console.log("valid");
        cb(null, true);
      } else {
        console.log("invalid");
        req.uploadFileError = true;
        cb(null, false);
      }
    };
    this.upload = multer({
      storage: storage,
      limits: { fileSize: maxSize },
      fileFilter: fileFilter,
    });
  }
  uploadFile(req, res, next) {
    if (!this.upload) {
      return res.status(500).json({ message: "Storage not set" });
    }
    this.upload.single("file")(req, res, (err) => {
      if (err) {
        return res.status(400).json({ message: "upload file error" });
      } else if (req.uploadFileError) {
        return res.status(500).json({
          message: "wrong file format",
        });
      } else next();
    });
  }
  async readFile(path) {
    let data = "";
    return new Promise((resolve, reject) => {
      const readStream = fs.createReadStream(path, { encoding: "utf8" });
      readStream
        .on("data", (chunk) => {
          data = data.concat(" ", chunk);
        })
        .on("end", () => {
          console.log("Finished reading");
          resolve(data);
        })
        .on("error", (err) => {
          console.log(err);
          reject(err);
        });
    });
  }
  async deleteFile(path) {
    return new Promise((resolve, reject) => {
      fs.unlink(path, (err) => {
        if (err) {
          console.log(err);
          reject(err);
        }
        resolve(true);
      });
    });
  }

  async uploadDrive(buffer, fileName) {
    const SCOPES = ["https://www.googleapis.com/auth/drive"];

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: SCOPES,
    });
    const drive = google.drive({ version: "v3", auth });
    const fileMetaData = {
      name: fileName,
    };
    try {
      const file = await drive.files.create({
        resource: fileMetaData,
        body: buffer,
        fields: "id",
      });
      await drive.permissions.create({
        fileId: file.data.id,
        requestBody: {
          role: "reader",
          type: "anyone",
        },
      });
      const result = await drive.files.get({
        fileId: file.data.id,
        fields: "webViewLink, webContentLink",
      });
    
      return result.data.webContentLink;
    } catch (err) {
      console.log(err);
      return;
    }
  }
}

module.exports = new FileUploader();
