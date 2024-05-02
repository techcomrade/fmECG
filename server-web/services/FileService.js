const CommonService = require("./CommonService");
const multer = require("multer");
const util = require("util");

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "text/plain") {
    console.log("valid");
    cb(null, true);
  } else {
    console.log("invalid");
    cb(null, false);
  }
};

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/upload/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+file.originalname)
  }
})

class FileService{
  async UploadFileTxt(req, res) {
    var upload = multer({
      storage: storage,
      limits: {
        fileSize: 1024 * 1024 * 5,
      },
      fileFilter: fileFilter,
    }).single("file");
    
    let uploadFileMiddleware = util.promisify(upload);
    return uploadFileMiddleware;
  }
}
// var upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 1024 * 1024 * 5,
//   },
//   fileFilter: fileFilter,
// }).single("file");

// let uploadFileMiddleware = util.promisify(upload);
 module.exports = FileService.prototype.UploadFileTxt;
//module.exports = uploadFileMiddleware;