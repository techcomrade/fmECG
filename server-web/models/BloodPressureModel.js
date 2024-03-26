const CommonModel = require("./CommonModel");

class BloodPressureModel extends CommonModel{
    getAllData(){
        return `SELECT * FROM blood_pressure_rec;`;
    }
    add(record) {
        return `INSERT INTO blood_pressure_rec (id, rec_id)
        VALUES ('${record.id}', '${record.rec_id}');`
    }
    deleteById(id) {
        return `DELETE FROM blood_pressure_rec WHERE id = '${id};`
    }
    updateById(record){
        return `UPDATE blood_pressure_rec SET rec_id = '${record.rec_id}' WHERE id = '${record.id};`;
    }

}


module.exports = new BloodPressureModel();