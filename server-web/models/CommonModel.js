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
    
    async insertToDB(insertData, tableName){
        try {
            if(insertData && tableName){
                if(tableName == 'account'){
                    bcrypt.hash(insertData.pass, 10, async(err, hash) => {
                        if(err) throw err;
                        insertData.pass = hash;
                        await knex(tableName).insert(insertData);
                        return true;
                    })
                }
                else await knex(tableName).insert(insertData);
                return true;
            }
            else {return false;}
        }
        catch(err) {
            console.error(err);
            return false;
        }
    }
}
module.exports = CommonModel;