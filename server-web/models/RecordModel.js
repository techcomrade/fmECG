const CommonModel = require("./CommonModel");

class RecordModel extends CommonModel{
    getAllData(){
        return `SELECT * FROM records`;
    }
    add(record) {
        return `INSERT INTO records(id, user_id, device_id, device_type, start_time, end_time, date_rec_url, created_at, updated_at)
        VALUES ('${record.id}','${record.user_id}', '${record.device_id}', '${record.device_type}', '${record.start_time}', '${record.end_time}', '${record.data_rec_url}','${record.created_at}', '${record.updated_at}');`
    }
    deleteById(id) {
        return `DELETE FROM records WHERE id = '${id};`
    }
    updateById(record){
        return `UPDATE records SET user_id= '${record.user_id}', device_id= '${record.device_id}', device_type= '${record.device_type}', start_time= '${record.start_time}', end_time= '${record.end_time}', data_rec_url= '${record.data_rec_url}', created_at= '${record.created_at}', updated_at= '${record.updated_at}'  WHERE id = '${record.id};`;
    }

}


module.exports = new RecordModel();