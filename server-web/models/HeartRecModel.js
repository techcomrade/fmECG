const CommonModel = require("./CommonModel");

class HeartRecModel extends CommonModel{
    getAllData(){
        return `SELECT * FROM heart_rec`;
    }
    add(record) {
        return `INSERT INTO heart_rec(id, rec_id)
        VALUES ('${record.id}','${record.rec_id}');`
    }
    deleteById(id) {
        return `DELETE FROM heart_rec WHERE id = '${id};`
    }
    updateById(record){
        return `UPDATE heart_rec SET rec_id = '${record.rec_id}' WHERE id = '${record.id};`;
    }

}


module.exports = new HeartRecModel();