const knex = require('../config/knex.js');
class CommonModel {
    async queryDB(sql){
        try {
            let data = await knex.raw(sql);
            console.log(data);
            if(data[0].length != 0) return data[0];
            return false;
        }
        catch(err) {
            console.error(err);
            return false;
        }
    }

    async updateDatabyId(dataInsert, table, updateId) {
        console.log(dataInsert);
        try {
            if(dataInsert && table && updateId) {
                await knex(table).where({id: updateId}).update(dataInsert); 
                return true;
            }   
            else return false;
        }
        catch(err) { 
            console.error(err); 
            return false; 
        }
    }
}

module.exports = CommonModel;