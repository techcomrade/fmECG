const { response } = require("express");
const RecordService = require("../services/RecordService");
const fs = require("fs");
class RecordController {
  async getAll(req, res, next) {
    console.log(`[P]:::Get all records: `);
    const records = await RecordService.getAll();
    return res.status(200).json({
      message: "Get all records successful!",
      metadata: records,
    });
  }

  async createRecord(req, res, next) {
    try {
      req.body.file = req.file;
      await RecordService.add(req.body);
      return res.status(200).json({
        message: "Create record successful!",
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        message: "Create record failed!",
      });
    }
  }

  async getRecordById(req, res, next) {
    console.log(`[P]:::Get record by id: `, req.params.recordId);
    const record = await RecordService.getRecordById(req.params.recordId);
    return res.status(200).json({
      message: "Get records by id successful!",
      metadata: record,
    });
  }

  async getDataRecord(req, res, next) {
    console.log(`[P]:::Get data record: `, req.params.length);
    const data = await RecordService.getDataRecord(req.params.length);
    return res.status(200).json({
      message: "Get data record successful!",
      metadata: data,
    });
  }

  async getRecordByDeviceId(req, res, next) {
    console.log(`[P]:::Get record by device id: `, req.params.deviceId);
    const recordByDevice = await RecordService.getRecordByDeviceId(
      req.params.deviceId
    );
    return res.status(200).json({
      message: "Get records by device id successful!",
      metadata: recordByDevice,
    });
  }

  async getRecordByUserId(req, res, next) {
    console.log(`[P]:::Get record by user id: `, req.params.userId);
    const recordByUser = await RecordService.getRecordByUserId(
      req.params.userId
    );
    return res.status(200).json({
      message: "Get records by user id successful!",
      metadata: recordByUser,
    });
  }

  async getRecordByStartTime(req, res, next) {
    console.log(`[P]:::Get record by start time: `, req.params.time);
    const recordByStartTime = await RecordService.getRecordByStartTime(
      req.params.time
    );
    return res.status(200).json({
      message: "Get records by start time successful!",
      metadata: recordByStartTime,
    });
  }

  async getRecordByStartTimeInterval(req, res, next) {
    console.log(
      `[P]:::Get record by start time interval: `,
      req.params.startTime,
      req.params.endTime
    );
    const recordByStartTimeInterval =
      await RecordService.getRecordByStartTimeInterval(
        req.params.startTime,
        req.params.endTime
      );
    return res.status(200).json({
      message: "Get records by start time interval successful!",
      metadata: recordByStartTimeInterval,
    });
  }

  async getRecordByEndTime(req, res, next) {
    console.log(`[P]:::Get record by end time: `, req.params.time);
    const recordByEndTime = await RecordService.getRecordByEndTime(
      req.params.time
    );
    return res.status(200).json({
      message: "Get records by end time successful!",
      metadata: recordByEndTime,
    });
  }

  async getRecordByEndTimeInterval(req, res, next) {
    console.log(
      `[P]:::Get record by end time interval: `,
      req.params.startTime,
      req.params.endTime
    );
    const recordByEndTimeInterval =
      await RecordService.getRecordByEndTimeInterval(
        req.params.startTime,
        req.params.endTime
      );
    return res.status(200).json({
      message: "Get records by end time interval successful!",
      metadata: recordByEndTimeInterval,
    });
  }

  async updateRecordById(req, res, next) {
    console.log(`[P]:::Update record by id: `, req.body.id);
    const id = req.body.id;
    await RecordService.updateRecordById(req.body, id)
      .then(() => {
        return res.status(200).json({
          message: "Update record by id successful!",
          metadata: req.body,
        });
      })
      .catch((err) => {
        return res.status(400).json({
          message: "Error when update record!",
        });
      });
  }

  async deleteRecordById(req, res, next) {
    console.log(`[P]:::Delete record by id: `, req.params.recordId);
    const id = req.params.recordId;
    await RecordService.deleteRecordById(id)
      .then(() => {
        return res.status(200).json({
          message: "Delete record successful!",
        });
      })
      .catch((err) => {
        return res.status(500).json({
          message: "Error when delete record!",
        });
      });
  }

  async uploadFileRecord(req, res, next) {
    try {
      await RecordService.uploadFileRecord(req, res, next);
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        message: "Error when upload file",
      });
    }
  }

  async readFileRecord(req, res) {
    console.log(`[P]:::Read file record: `, req.params.id);
    let record = await RecordService.getRecordById(req.params.id);
    if (!record) {
      return res.status(500).json({
        message: "Record not found",
      });
    }
    let path = record[0].dataValues.data_rec_url;
    await RecordService.readFileRecord(path)
      .then((data) => {
        if (data) {
          return res.status(200).json({
            data: data,
            message: "Read file successfully",
          });
        }
        res.status(500).json({
          message: "no file found",
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).json({
          message: "Error when reading file",
        });
      });
  }
  async deleteFileRecord(req, res) {
    console.log(`[P]:::Delete file record: `, req.params.id);
    let record = await RecordService.getRecordById(req.params.id);
    if (!record) {
      return res.status(500).json({
        message: "No record found",
      });
    }
    let path = record[0].dataValues.data_rec_url;
    await RecordService.deleteFile(path)
      .then((check) => {
        if (check) {
          return res.status(200).json({
            message: "Delete file record succesfully",
          });
        }
        return res.status(500).json({
          message: "Error when deleting file record",
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).json({
          message: "File not found",
        });
      });
  }
  async downloadRecordFile(req, res) {
    console.log(`[P]:::Download file record: `, req.params.id);
    const filepath = await RecordService.getFilePathById(req.params.id);
    if (fs.existsSync(filepath)) {
      res.download(filepath);
    } else {
      res.status(404).json({
        message: "file not found",
      });
    }
  }
  async checkRecordFile(req, res) {
    console.log(`[P]:::Check file record: `, req.params.id);
    const filepath = await RecordService.getFilePathById(req.params.id);
    if (fs.existsSync(filepath)) {
      res.status(200).json({
        message: "record file ready to download",
      });
    } else {
      res.status(404).json({
        message: "file not found",
      });
    }
  }
  async getRecordByDoctorId(req,res){
    console.log(`[P]:::Get record by doctor id: `, req.params.id);
    const recordByUser = await RecordService.getRecordByDoctorId(req.params.id);
    console.log(recordByUser);
    return res.status(200).json({
      message: "Get records by doctor id successful!",
      metadata: recordByUser,
    });
  }
}

module.exports = new RecordController();
