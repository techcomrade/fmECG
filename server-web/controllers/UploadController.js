const FileService = require("../services/FileService");

class UploadController {
    async setUploadToDrive(req, res, next) {
        await FileService.setStorageToMemory();
        next();
    }
    async setUploadToDisk(req, res, next) {
        await FileService.setStorageToDisk();
        next();
    }

    async uploadImage(req, res) {
        const buffer = req.file.buffer;
        const fileName = req.file.originalName;
        await FileService.uploadDrive(buffer, fileName)
        .then((link) => {
            if(link) {
                return res.status(200).json({
                    message: 'Transparent picture added successfully',
                    metadata: link,
                })
            }
            else return res.status(400).json({
                message: 'error server response'
            })
        })
        .catch(err => {
            console.log(err) ;
            return res.status(500).json({
                message: 'Transparent picture added failed'
            });
        })
    }

}

module.exports = new UploadController();