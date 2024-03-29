const BloodPressureService = require('../services/BloodPressureService');
const RecordService = require('../services/RecordService');

class BloodPressureController {
    async getAllData(req, res) {
        await BloodPressureService.getAllData()
        .then((rec) => {
            if(rec.length) return res.status(200).json(rec);
            return res.status(400).json("No record found");
        })
        .catch((err) => {
            console.log(err);
            return res.status(400).json("get records failed");
        });
    }
    async add(req, res) {
        try {
            const record = req.body;
            const checkExistRecord = await RecordService.getRecordById(record.rec_id);
            if(!checkExistRecord.dataValues) return res.status(400).json("no record_id found");
            await BloodPressureService.add(record)
            .then((checked) => {
                if(checked) return res.status(200).json("add record successfully");
                return res.status(500).json("err server add failed");
            })
            .catch((err) => {
                console.log(err);
                return res.status(400).json("add record failed");
            })
        }
        catch(err) {
            console.log(err);
            return res.status(400).json("add records failed");
        }
    }
    async delete(req, res) {
        try {
            const record_id = req.params.id;
            if(record_id) {
                await BloodPressureService.getRecordById(record_id)
                .then(async (checked) => {
                    if(checked) {
                        await BloodPressureService.deleteById(record_id);
                        return res.status(200).json("delete record successfully");
                    }
                    return res.status(500).json("no record found")
                })
                .catch((err) => {
                    return res.status(400).json("delete record failed");
                });
            }
        }
        catch(err) {
            return res.status(400).json("delete record failed");
        }
    }
    async update(req, res) {
        try {
            const id = req.params.id;
            const record = req.body;
            await BloodPressureService.getRecordById(id)
            .then(async (checked) => {
                if(checked) {
                    const checkExistRecord = await RecordService.getRecordById(record.rec_id);
                    if(!checkExistRecord) return res.status(400).json("no record_id found");
                    await BloodPressureService.updateById(record, id);
                    return res.status(200).json("update record successfully");
                }
                return res.status(500).json("record not found");
            })
            .catch(err => {
                return res.status(400).json("update record error");
            })
        }
        catch(err) {
            return res.status(400).json("update record failed");
        }
    }
}

module.exports = new BloodPressureController();