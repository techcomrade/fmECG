const RecordService = require("../services/RecordService");
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
        message: "Create records successful!",
        metadata: req.body,
      });
    } catch (err) {
      return res.status(400).json({
        message: "Create record failed!"
      });
    }
  }

  async getRecordById(req, res, next) {
    console.log(`[P]:::Get record by id: `, req.params.recordId);
    const record = await RecordService.getRecordById(req.params.recordId);
    if (record) {
      return res.status(200).json({
        message: "Get record by id successful!",
        metadata: record,
      });
    } else
      return res.status(404).json({
        message: "Record not existed!",
      });
  }

  async getRecordByDeviceId(req, res, next) {
    console.log(`[P]:::Get record by device id: `, req.params.deviceId);
    const recordByDevice = await RecordService.getRecordByDeviceId(
      req.params.deviceId
    );
    if (recordByDevice) {
      return res.status(200).json({
        message: "Get record by device id successful!",
        metadata: recordByDevice,
      });
    } else
      return res.status(404).json({
        message: "Record not existed!",
      });
  }

  async updateRecordById(req, res, next) {
    console.log(`[P]:::Update record by id: `, req.params.recordId, req.body);
    try {
      const id = req.params.recordId;
      const checkRecord = await RecordService.getRecordById(id);
      if (checkRecord) {
        await RecordService.updateRecordById(req.body, id)
          .then(() => {
            return res.status(200).json({
              message: "Update record successful!",
              metadata: req.body,
            });
          })
          .catch((err) => {
            console.log(err);
            return res.status(400).json({
              message: "Error when update record!",
            });
          });
      } else
        return res.status(404).json({
          message: "Id not found!",
        });
    } catch (err) {
      return res.status(500).json({
        message: "Error when update record!",
      });
    }
  }

  async deleteRecordById(req, res, next) {
    console.log(`[P]:::Delete record by id: `, req.body.id);
    try {
      const id = req.body.id;
      const checkRecord = await RecordService.getRecordById(id);
      if (checkRecord) {
        await RecordService.deleteRecordById(id)
          .then(() => {
            return res.status(200).json({
              message: "Delete record successful!",
            });
          })
          .catch((err) => {
            console.log(err);
            return res.status(400).json({
              message: "Error when delete record!",
            });
          });
      } else
        return res.status(400).json({
          message: "Id not found!",
        });
    } catch (err) {
      return res.status(500).json({
        message: "Error when delete record!",
      });
    }
  }
}

module.exports = new RecordController();
