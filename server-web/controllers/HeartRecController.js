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

  async getHeartRecByDeviceId(req, res) {
    console.log(`[P]:::Get all heart_rec by device_id: `, req.body.device_id);
    const foundHeartRec = await HeartRecService.getHeartRecByEmail(req.body.device_id);
    if(foundHeartRec) {
        return res.status(200).json({
          message: 'Get heart_rec by device_id successful!',
          metadata: foundHeartRec
        });
      }
      else {
        return res.status(404).json({
          message: 'Heart_rec not existed!'
        });
      }
  }

  async deleteById(req, res) {
    console.log(` [P]:::Delete heart_rec by id: `, req.body.id);
    const result = await HeartRecService.getHeartRecByDeviceId(req.body.id);
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

  async updateHeartRecByDeviceId(req, res) {
    console.log(`[P]:::Update HeartRec by device_id`,  req.body.device_id);
    const device_id = req.body.device_id;
    let checkExistHeartRec = await HeartRecService.getHeartRecByDeviceId(device_id);
    if (!checkExistHeartRec?.dataValues) {
      return res.status(400).json({
        message: 'no HeartRec found'
      })
    }
  }
}

module.exports = new HeartRecController();
