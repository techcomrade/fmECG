const { Model } = require("sequelize");
const HeartRecService = require("../services/HeartRecSevice");

class HeartRecController {
  async getAllData(req, res) {
    console.log(`[P]:::Get all heart_rec: `);
    const heart_rec = await HeartRecService.getAllData();
    return res.status(200).json({
      message: "Get all heart_rec successful!",
      metadata: heart_rec,
    });
  }

  async getHeartRecByEmail(req, res) {
    console.log(`[P]:::Get all heart_rec by email: `, req.body.email);
    const foundHeartRec = await HeartRecService.getHeartRecByEmail(req.body.email);
    if(foundHeartRec) {
        return res.status(200).json({
          message: 'Get heart_rec by email successful!',
          metadata: foundHeartRec
        });
      }
      else {
        return res.status(404).json({
          message: 'Heart_rec not existed!'
        });
      }
  }

  async delebyId(req, res) {
    console.log(` [P]:::Delete heart_rec by id: `, req.body.id);
    const result = await HeartRecController.delebyId(req.body.id);
    if (result) {
        return res.status(200).json({
          message: "Delete heart_rec successful!",
        });
      } else {
        return res.status(404).json({
          message: "Error when delete heart_rec!",
        });
      }
  }
}

module.exports = new HeartRecController();
