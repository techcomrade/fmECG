const { response } = require("express");
const RecordService = require("../services/RecordService");
const fileUploader = require("../services/FileService");

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
    console.log(`[P]:::Create record: `, req.body);
    try {
      await RecordService.add(req.body);
      return res.status(200).json({
        message: "Create record successful!",
      });
    } catch (err) {
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

  async updateRecordById(req, res, next) {
    console.log(`[P]:::Update record by id: `, req.params.recordId, req.body);
    const id = req.body.id;
    if (Object.keys(req.body).length !== 0) {
      const checkRecord = await RecordService.getRecordById(id);
      if (!checkRecord) {
        return res.status(404).json({
          message: "Id not found!",
        });
      }
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
    } else {
      return res.status(400).json({
        message: "Please enter the information to update the record!",
      });
    }
  }

  async deleteRecordById(req, res, next) {
    console.log(`[P]:::Delete record by id: `, req.body.id);
    const id = req.body.id;
    const checkRecord = await RecordService.getRecordById(id);
    if (!checkRecord) {
      return res.status(400).json({
        message: "Id not found!",
      });
    }
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
  
  async UploadFileRecord(req, res, next) {
    try {
        await RecordService.uploadFileRecord(req, res, next);
      } catch (err) {
        console.log(err);
      }
  }
}

module.exports = new RecordController();
