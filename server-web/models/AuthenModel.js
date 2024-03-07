const { insertDatatoDB } = require('../../server/models/Authen2Model');
const CommonModel = require('./CommonModel');

class AuthenModel extends CommonModel {
    async insertToken(token, id){
        await this.insertToDB({
            id: id,
            token: token
            // create_time: Date.now(),
            // delete_flag: 0
        }, 'token');
        return true;
    }
}

module.exports = new AuthenModel();