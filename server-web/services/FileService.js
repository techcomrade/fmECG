const multer = require("multer");
const maxSize = 2 * 1024 * 1024;
const fs = require("fs");

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
  if (file.mimetype.includes("csv")) {
    console.log("valid");
    cb(null, true);
  } else {
    console.log("invalid");
    req.uploadFileError = true;
    cb(null, false);
  }
};

class FileUploader {
  constructor() {
    this.upload = multer({
      storage: storage,
      limits: { fileSize: maxSize },
      fileFilter: fileFilter,
    });
  }

  uploadFile(req, res, next) {
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
}

module.exports = new FileUploader();
