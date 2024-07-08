const RegisterService = require("../services/RegisterService");
const FileService = require("../services/FileService");
const AuthenService = require("../services/AuthenService");

class RegisterController {
  async getAllData(req, res) {
    console.log(`[P]:::Get all register data`);
    try {
      let registers = await RegisterService.getAllData();
      if (!registers.length) {
        return res.status(404).json({
          message: "No register data found",
        });
      }
      return res.status(200).json({
        message: "Get all register data",
        metadata: registers,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: "Error getting all register data",
      });
    }
  }
  
  async createRegister(req, res, next) {
    console.log(`[P]:::Create user: `, req.body);
    return res.status(200).json({
      message: "Create user successful!",
      metadata: await RegisterService.createRegister(req.body),
    });
  }

  async uploadImage(req, res, next) {
    console.log(`[U]:::Uplaod image register`, req.file);
    const buffer = req.file.buffer;
    const fileName = req.file.originalName;
    const link = await FileService.uploadDrive(buffer, fileName);
    if (!link) {
      return res.status(500).json({
        message: "Upload image failed",
      });
    } else req.body.image = link;
    next();
  }

  async updateRegister(req, res, next) {
    console.log(`[U]:::Uplaod image update`, req.body);
    const result = await RegisterService.updateById(req.body);
    if (result) {
      return res.status(200).json({
        message: "Update register successful!",
      });
    } else {
      return res.status(404).json({
        message: "Error when update user!",
      });
    }
  }

  async accepted(req, res, next) {
    console.log(`[P]:::Accepted register data`, req.body.id);
    const account = await RegisterService.getById(req.body.id);
    if (!account) {
      return res.status(404).json({
        message: "No register found!",
      });
    }
    try {
      await AuthenService.register(account[0].dataValues, true);
      return res.status(200).json({
        message: "Set accepted successfully",
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Error server when set accepted",
      });
    }
  }

  async rejected(req, res, next) {
    console.log(`[P]:::Rejected register data`, req.body.id);
    const account = await RegisterService.getById(req.body.id);
    if (!account) {
      return res.status(404).json({
        message: "No register found!",
      });
    }
    try {
      account[0].dataValues.status = 2;
      const checked = await RegisterService.updateById(account[0].dataValues);
      if (checked)
        return res.status(200).json({
          message: "Set rejected successfully",
        });
      return res.status(500).json({
        message: "Set rejected failed",
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Error when set rejected",
      });
    }
  }
}

module.exports = new RegisterController();
