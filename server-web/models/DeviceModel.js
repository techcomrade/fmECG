const CommonModel = require("./CommonModel");

class DeviceModel extends CommonModel{
    async getAllData(){
        return `SELECT * FROM devices;`;
    }
    async add(device) {
        return `INSERT INTO devices (id, user_id, device_name, information, device_type, start_date, end_date, created_at, updated_at)
        VALUES ('${device.id}', '${device.user_id}', '${device.device_name}', '${device.information}', '${device.device_type}', '${device.start_date}', '${device.end_date}', '${device.create_at}', '${device.update_at}');`
    }
    async deleteById(id) {
        return `DELETE FROM devices WHERE id = '${id};`
    }
    async updateById(device){
        return `UPDATE device SET user_id = '${device.user_id}', device_name = '${device.device_name}', information = '${device.information}',device_type = '${device.device_type}', start_date = '${device.start_date}',end_date = '${device.end_date}', create_at = '${device.create_at}',updated_at = '${device.updated_at}', WHERE id = '${device.id};`;
    }

}


module.exports = new DeviceModel();