const { Model } = require("sequelize");
const HeartRecService = require("../services/HeartRecSevice");

class HeartRecController {
    async getAllData(req, res){
        await HeartRecService.getAllData()
        .then((heart_rec) => {
            if (heart_rec.length) return res.status(200).json(heart_rec);
            else return res.status(400).json("Invalid HeartRec");
        })
        .catch((error) => {
            return res.status(400).json(error);
        });
    }
}

module.exports = new HeartRecController();