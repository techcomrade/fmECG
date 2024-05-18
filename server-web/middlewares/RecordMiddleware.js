const RecordService = require("../services/RecordService");
class RecordMiddleware {
  validateRecord(req, res, next) {
    const validation = RecordService.validateRecord(req.body).error;
    if (validation === undefined) {
      console.log("Validate successful!");
      next();
    } else {
      return res.status(400).json({
        message: validation.details[0].message,
      });
    }
  }

  async checkId(req, res, next) {
    const recordById = await RecordService.getRecordById(req.params.recordId);
    if (!recordById)
      return res.status(404).json({
        message: "Record not existed!",
      });
    next();
  }

  async checkUserId(req, res, next) {
    const recordByUserId = await RecordService.getRecordByUserId(
      req.params.userId
    );
    if (recordByUserId.length === 0)
      return res.status(404).json({
        message: "Record not existed!",
      });
    next();
  }

  async checkDeviceId(req, res, next) {
    const recordByDeviceId = await RecordService.getRecordByDeviceId(
      req.params.userId
    );
    if (recordByDeviceId.length === 0)
      return res.status(404).json({
        message: "Record not existed!",
      });
    next();
  }

  async checkStartTime(req, res, next) {
    if (isNaN(Number(req.params.time)))
      return res.status(400).json({
        message: "Time is not a number!",
      });
    const recordByStartTime = await RecordService.getRecordByStartTime(
      req.params.time
    );
    if (recordByStartTime.length === 0)
      return res.status(404).json({
        message: "Record not existed!",
      });
    next();
  }

  async checkEndTime(req, res, next) {
    if (isNaN(Number(req.params.time)))
      return res.status(400).json({
        message: "Time is not a number!",
      });
    const recordByStartTime = await RecordService.getRecordByEndTime(
      req.params.time
    );
    if (recordByStartTime.length === 0)
      return res.status(404).json({
        message: "Record not existed!",
      });
    next();
  }

  async checkStartTimeInterval(req, res, next) {
    if (
      isNaN(Number(req.params.startTime)) ||
      isNaN(Number(req.params.endTime))
    )
      return res.status(400).json({
        message: "Time is not a number!",
      });
    const recordByStartTimeInterval =
      await RecordService.getRecordByStartTimeInterval(
        req.params.startTime,
        req.params.endTime
      );
    if (recordByStartTimeInterval.length === 0)
      return res.status(404).json({
        message: "Record not existed!",
      });
    next();
  }

  async checkEndTimeInterval(req, res, next) {
    if (
      isNaN(Number(req.params.startTime)) ||
      isNaN(Number(req.params.endTime))
    )
      return res.status(400).json({
        message: "Time is not a number!",
      });
    const recordByEndTimeInterval =
      await RecordService.getRecordByEndTimeInterval(
        req.params.startTime,
        req.params.endTime
      );
    if (recordByEndTimeInterval.length === 0)
      return res.status(404).json({
        message: "Record not existed!",
      });
    next();
  }

  async checkUpdate(req, res, next) {
    const id = req.body.id;
    if (id == undefined || id.length == 0)
      return res.status(400).json({
        message: "Please enter record id!",
      });
    const recordById = await RecordService.getRecordById(id);
    if (!recordById)
      return res.status(404).json({
        message: "Record not existed!",
      });
    if (Object.keys(req.body).length === 1) {
      return res.status(400).json({
        message: "Please enter the information to update the record!",
      });
    }
    next();
  }
}

module.exports = new RecordMiddleware();
