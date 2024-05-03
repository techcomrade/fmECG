const multer = require('multer');
const maxSize = 2 * 1024 * 1024;


let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/upload/')
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, file.originalname);
  },
});

const fileFilter = (req = req, file, cb) => {
  if (file.mimetype === "text/plain") {
    console.log("valid");
    cb(null, true);
  } else {
    console.log("invalid");
    cb(null, false);
  }
};

class FileUploader {
  constructor() {
    this.upload = multer({
      storage: storage,
      limits: { fileSize: maxSize },
      fileFilter: fileFilter
    }); 
  }

  uploadFile(req, res, next) {
    this.upload.single('file')(req, res, err => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      if(req.file) {
        console.log(req.file);
        return true;
      }
      return false;
    });
  }
}

module.exports = new FileUploader();