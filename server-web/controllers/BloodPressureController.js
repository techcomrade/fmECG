const BloodPressureService = require("../services/BloodPressureService");
const RecordService = require("../services/RecordService");

class BloodPressureController {
  async getAllData(req, res) {
    await BloodPressureService.getAllData()
      .then((rec) => {
        if (rec.length) return res.status(200).json(rec);
        return res.status(400).json("No record found");
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).json("get records failed");
      });
  }
  async add(req, res) {
    const record = req.body;
    const checkExistRecord = await RecordService.getRecordById(record.rec_id);
    if (!checkExistRecord.dataValues)
      return res.status(400).json("no record_id found");
    await BloodPressureService.add(record)
      .then((checked) => {
        if (checked) return res.status(200).json("add record successfully");
        return res.status(500).json("err server add failed");
      })
      .catch((err) => {
        return res.status(400).json("add record failed");
      });
  }
  async delete(req, res) {
    const record_id = req.params.id;
    if (record_id) {
      let checkExistRecord = await BloodPressureService.getRecordById(
        record_id
      );
      if (!checkExistRecord.dataValues)
        return res.status(400).json("no record_id found");
      await BloodPressureService.deleteById(record_id)
        .then(() => {
          return res.status(200).json("delete record successfully");
        })
        .catch((err) => {
          return res.status(500).json("no record found");
        });
    }
  }
  async update(req, res) {
    const id = req.params.id;
    const record = req.body;
    let checkExistBPRecord = await BloodPressureService.getRecordById(id);
    if (!checkExistBPRecord.dataValues)
      return res.status(400).json("no recordBP_id found");
    const checkExistRecord = await RecordService.getRecordById(record.rec_id);
    if (!checkExistRecord.dataValues)
      return res.status(400).json("no record_id found");
    await BloodPressureService.updateById(record, id)
      .then(() => {
        return res.status(200).json("update record successfully");
      })
      .catch((err) => {
        return res.status(500).json("error updating record");
      });
  }
}

module.exports = new BloodPressureController();
