const database = require('../config/database')
const commonModel = require('../Models/CommonModel');
const knex = require('../config/knex');
class Authen2 extends commonModel {
    getTableName() { return 'authen'; }
    getALLData() {
        return `SELECT * FROM authen`;
    }
    displaybyId(id) { 
        return `SELECT * FROM authen where id = ${id}`;
    }
    dropDatabyAccessToken(accessToken) {
        if(accessToken) {
            knex.raw('authen').where({accessToken:accessToken}).delete();
            return true;
        }
        else return false;
    }
    dropDatabyUserID(userID) {
        if(userID) {s
            console.log(userID);
            knex('authen').where('user_id', userID).delete();
            return true;
        }
        else return false;
    }
}

module.exports = new Authen2;