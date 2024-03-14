const CommonModel = require("./CommonModel");

class BloodPressureModel extends CommonModel{
    async getAllData(){
        return `SELECT * FROM blood_pressure_rec;`;
    }
    async add(record) {
        return `INSERT INTO blood_pressure_rec (id, rec_id)
        VALUES ('${record.id}', '${record.rec_id}');`
    }
    async deleteById(id) {
        return `DELETE FROM blood_pressure_rec WHERE id = '${id};`
    }
    async updateById(record){
        return `UPDATE blood_pressure_rec SET rec_id = '${record.rec_id}' WHERE id = '${record.id};`;
    }

}


module.exports = new BloodPressureModel();