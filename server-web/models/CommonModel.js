const knex = require('../config/knex.js');

class CommonModel {
    async executeQuery(sql){
        try {
            let data = await knex.raw(sql);
            if(data[0].length != 0) return data[0];
            return false;
        }
        catch(err) {
            console.error(err);
            return false;
        }
    }  
}
module.exports = CommonModel;