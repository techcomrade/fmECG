const BloodPressureDTO = require('./BloodPressureDTO')
const CommonModel = require("./../CommonModel");

class BloodPressureModel extends CommonModel {
    async getAllData(){
        return await BloodPressureDTO.findAll();
    }
    async add(record) {
        return await BloodPressureDTO.create({
            id: record.id
        })
    }
    async deleteById(id) {
        return `DELETE FROM blood_pressure_rec WHERE id = '${id};`
    }
    async updateById(record){
        return `UPDATE blood_pressure_rec SET rec_id = '${record.rec_id}' WHERE id = '${record.id};`;
    }

}


module.exports = new BloodPressureModel();