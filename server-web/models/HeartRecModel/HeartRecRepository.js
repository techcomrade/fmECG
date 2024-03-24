const CommonModel = require("../../models/CommonModel");

class HeartRecModel extends CommonModel{
    async getAllData(){
        return `SELECT * FROM heart_rec`;
    }
    async add(record) {
        return `INSERT INTO heart_rec(id, rec_id)
        VALUES ('${record.id}','${record.rec_id}');`
    }
    async deleteById(id) {
        return `DELETE FROM heart_rec WHERE id = '${id};`
    }
    async updateById(record){
        return `UPDATE heart_rec SET rec_id = '${record.rec_id}' WHERE id = '${record.id};`;
    }

}


module.exports = new HeartRecModel();