const knex = require('../config/knex.js');
const bcrypt = require("bcrypt");
class CommonModel {
    async queryDB(sql){
        try {
            let data = await knex.raw(sql);
           // console.log(data);
            if(data[0].length != 0) return data[0];
            return false;
        }
        catch(err) {
            console.error(err);
            return false;
    }
    
}
    async insertDatatoDB(dataInsert, table){
        try 
        {
            if(dataInsert && table) {
                if(table == 'user')
                {
                    bcrypt.hash(dataInsert.password, 10, async (err, hash) => {
                        if(err) throw err;
                        dataInsert.password = hash;
                        await knex(table).insert(dataInsert);
                        return true;
                    })
                }
                else await knex(table).insert(dataInsert);
                return true;
            }
            else { return false; }
        }
        catch(err) { console.error(err); return false; }
    }

    async updateDatabyId(dataInsert, table, updateId) {
        console.log(dataInsert);
        try {
            if(dataInsert && table && updateId) {
                await knex(table).where({id: updateId}).update(dataInsert); return true;
        }   else return false;
        }
        catch(err) { console.error(err); return false; }

    }
    async dropDatabyId(id, table) {
        try {
            if(id && table) {
                await knex(table).where({id: id}).delete();
                return true;
            }
            else return false;
        }
        catch(err) {console.log(err); return false; }
    }
}
module.exports = CommonModel;