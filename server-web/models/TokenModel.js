const CommonModel = require("./CommonModel");

class TokenModel extends CommonModel{
    getAllData(){
        return `SELECT * FROM tokens;`;
    }
    add(token) {
        return `INSERT INTO tokens (id, account_id, access_token, refresh_token, created_at, updated_at)
        VALUES ('${token.id}', '${token.account_id}', '${token.access_token}','${token.refresh_token}','${token.created_at}', '${token.updated_at}')`
    }
    deleteById(id) {
        return `DELETE FROM tokens WHERE id = '${id};`
    }
    updateById(token){
        return `UPDATE tokens SET account_id = '${token.account_id}',access_token = '${token.access_token}', refresh_token = '${token.refresh_token}', created_at = '${token.created_at}',updated_at = '${token.updated_at}', account_id = '${token.account_id}', account_id = '${token.account_id}'  WHERE id = '${token.id};`;
    }

}


module.exports = new TokenModel();